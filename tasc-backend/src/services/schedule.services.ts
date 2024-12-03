import { NextFunction } from 'express';
import sanitize from 'sanitize-html';
import uap from 'ua-parser-js';

import EmailServices from './email.services';
import S3Services from './s3.services';
import SmsServices from './sms.services';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import ScheduleSchemas from './schemas/schedule.schemas';
import Schedule from '@src/models/schedule.model';
import User from '@src/models/user.model';
import { AppError } from '@src/other/classes';
import { IReq } from '@src/types/misc';
import * as ScheduleTypes from '@src/types/schedule.types';
import SessionUtil from '@src/util/session.util';
import ValidatorHandlerUtil from '@src/util/validator-handler.util';

// **** Functions **** //
const getAllSchedules = async () => {
  const schedules = await Schedule.find().select('-__v');

  for (let i = 0; i < schedules.length; i++) {
    const s3Url = await S3Services.s3Retrieve(schedules[i].createdBy.employeePicture);

    schedules[i].createdBy.employeePicture = s3Url;
  }

  return schedules;
};

const newSchedule = async (
  req: IReq<ScheduleTypes.INewScheduleReqData>,
  next: NextFunction
): Promise<Pick<ScheduleTypes.IScheduleResData, 'title'>> => {
  const newScheduleValidation = ValidatorHandlerUtil(ScheduleSchemas.createScheduleSchema);

  const clientToken = SessionUtil.headerToken(req);

  if (!clientToken) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'You are not logged in. Please login to get access.'));
  }

  const clientData = await SessionUtil.decodeToken(clientToken);

  if (!clientData) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Please add a token for verification.'));
  }

  const scheduleCreatedBy = await User.findById(clientData.id);

  if (!scheduleCreatedBy) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'The user belonging to this token does not exit.'));
  }

  const incomingData: ScheduleTypes.INewScheduleReqData = {
    assignedEmployees: req.body.assignedEmployees,
    createdBy: {
      employeeId: scheduleCreatedBy.employeeId,
      employeePicture: scheduleCreatedBy.employeePicture,
      preferredName: scheduleCreatedBy.preferredName ?? 'N/A',
    },
    date: req.body.date,
    designations: req.body.designations.map((val) => ({
      designation: val.designation,
      locations: val.locations,
      startTimes: val.startTimes,
      isActive: val.isActive,
    })),
    isDraft: req.body.isDraft,
    title: req.body.title,
  };

  const validatedData: ScheduleTypes.INewScheduleReqData = newScheduleValidation.verify(incomingData, next);

  const sanitizedData: ScheduleTypes.INewScheduleReqData = {
    assignedEmployees: validatedData.assignedEmployees,
    createdBy: validatedData.createdBy,
    date: sanitize(validatedData.date),
    designations: validatedData.designations.map((val) => ({
      designation: val.designation,
      locations: val.locations,
      startTimes: val.startTimes,
      isActive: val.isActive,
    })),
    isDraft: validatedData.isDraft,
    title: sanitize(validatedData.title),
  };

  const scheduleDraft: ScheduleTypes.ISchedule['draft'] = sanitizedData.isDraft
    ? {
        reassigned: [],
        removed: [],
        new: sanitizedData.assignedEmployees,
      }
    : null;

  const newSchedule = await Schedule.create({
    ...sanitizedData,
    draft: scheduleDraft,
  });

  if (!newSchedule.isDraft) {
    const sentEmailResults: Promise<{ employeeId: string; message: string; success: boolean }[]> = Promise.all(
      newSchedule.assignedEmployees.map(async (employee) => {
        const foundEmployee = await User.findOne({ employeeId: employee.employeeId });

        if (!foundEmployee) {
          return {
            employeeId: employee.employeeId,
            message: `Could not find employee of ${employee.employeeId} in the system.`,
            success: false,
          };
        }

        const emailResult = await EmailServices.newSchedule(
          newSchedule.date,
          employee.designation,
          foundEmployee.email,
          employee.location,
          employee.startTime,
          `New Schedule for ${newSchedule.date}`,
          'https://mtsuite.io/'
        );

        if (!emailResult) {
          return {
            employeeId: employee.employeeId,
            message: `Could not send an email to employee of ${employee.employeeId}.`,
            success: false,
          };
        }

        return {
          employeeId: employee.employeeId,
          message: `Successfully sent an email to employee of ${employee.employeeId}.`,
          success: true,
        };
      })
    );
  }

  return { title: newSchedule.title };
};

const editScheduleById = async (
  req: IReq<Omit<ScheduleTypes.IEditScheduleReq, 'id'>>,
  next: NextFunction
): Promise<ScheduleTypes.IEditScheduleRes> => {
  const editValidation = ValidatorHandlerUtil(ScheduleSchemas.editScheduleSchema);

  const clientToken = SessionUtil.headerToken(req);

  if (!clientToken) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'You are not logged in. Please login to get access.'));
  }

  const clientData = await SessionUtil.decodeToken(clientToken);

  if (!clientData) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Please add a token for verification.'));
  }

  const clonedBody: Omit<ScheduleTypes.IEditScheduleReq, 'id'> = {};

  if (req.body.assignedEmployees) {
    clonedBody.assignedEmployees = req.body.assignedEmployees.map((employee) => {
      const updateEmployee: typeof employee = {};

      if (employee.designation) {
        updateEmployee.designation = employee.designation;
      }

      if (employee.employeeId) {
        updateEmployee.employeeId = employee.employeeId;
      }

      if (employee.location) {
        updateEmployee.location = employee.location;
      }

      if (employee.position) {
        updateEmployee.position = employee.position;
      }

      if (employee.preferredName) {
        updateEmployee.preferredName = employee.preferredName;
      }

      if (employee.punchTimes) {
        updateEmployee.punchTimes = employee.punchTimes.map((punch) => {
          const updatePunch: typeof punch = {};

          if (punch.end) {
            updatePunch.end = punch.end;
          }

          if (punch.start) {
            updatePunch.start = punch.end;
          }

          if (punch.total) {
            updatePunch.total = punch.total;
          }

          return updatePunch;
        });
      }

      if (employee.startTime) {
        updateEmployee.startTime = employee.startTime;
      }

      if (employee.totalHours) {
        updateEmployee.totalHours = employee.totalHours;
      }

      return updateEmployee;
    });
  }

  if (req.body.date) {
    clonedBody.date = req.body.date;
  }

  if (req.body.designations) {
    clonedBody.designations = req.body.designations.map((designation) => {
      const updateDesignation: typeof designation = {};

      if (designation.designation) {
        updateDesignation.designation = designation.designation;
      }

      if (typeof designation.isActive === 'boolean') {
        updateDesignation.isActive = designation.isActive;
      }

      if (designation.locations) {
        updateDesignation.locations = designation.locations.map((location) => {
          const updateLocation: typeof location = {};

          if (location.designation) {
            updateLocation.designation = location.designation;
          }

          if (location.positions) {
            updateLocation.positions = location.positions.map((pos) => {
              const updatePosition: typeof pos = {};

              if (pos.position) {
                updatePosition.position = pos.position;
              }

              if (pos.startTime) {
                updatePosition.startTime = pos.startTime;
              }

              return updatePosition;
            });
          }

          if (location.terrain) {
            updateLocation.terrain = location.terrain;
          }

          return updateLocation;
        });
      }

      if (designation.startTimes) {
        updateDesignation.startTimes = designation.startTimes;
      }

      return updateDesignation;
    });
  }

  if (typeof req.body.isDraft === 'boolean') {
    clonedBody.isDraft = req.body.isDraft;
  }

  if (req.body.title) {
    clonedBody.title = req.body.title;
  }

  const reqData: ScheduleTypes.IEditScheduleReq = {
    ...clonedBody,
    id: req.params?.id,
  };

  const validatedData: ScheduleTypes.IEditScheduleReq = editValidation.verify(reqData, next);

  const prevSchedule = await Schedule.findById(validatedData.id);

  if (!prevSchedule) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Cannot find schedule.'));
  }

  const toUpdate: Omit<ScheduleTypes.IEditScheduleReq, 'id'> = {};

  if (validatedData.assignedEmployees) {
    toUpdate.assignedEmployees = validatedData.assignedEmployees.map((employee) => {
      const updateEmployee: typeof employee = {};

      if (employee.designation) {
        updateEmployee.designation = employee.designation;
      }

      if (employee.employeeId) {
        updateEmployee.employeeId = employee.employeeId;
      }

      if (employee.location) {
        updateEmployee.location = employee.location;
      }

      if (employee.position) {
        updateEmployee.position = employee.position;
      }

      if (employee.preferredName) {
        updateEmployee.preferredName = employee.preferredName;
      }

      if (employee.punchTimes) {
        updateEmployee.punchTimes = employee.punchTimes.map((punch) => {
          const updatePunch: typeof punch = {};

          if (punch.end) {
            updatePunch.end = punch.end;
          }

          if (punch.start) {
            updatePunch.start = punch.end;
          }

          if (punch.total) {
            updatePunch.total = punch.total;
          }

          return updatePunch;
        });
      }

      if (employee.startTime) {
        updateEmployee.startTime = employee.startTime;
      }

      if (employee.totalHours) {
        updateEmployee.totalHours = employee.totalHours;
      }

      return updateEmployee;
    });
  }

  if (validatedData.date) {
    toUpdate.date = validatedData.date;
  }

  if (validatedData.designations) {
    toUpdate.designations = validatedData.designations.map((designation) => {
      const updateDesignation: typeof designation = {};

      if (designation.designation) {
        updateDesignation.designation = designation.designation;
      }

      if (typeof designation.isActive === 'boolean') {
        updateDesignation.isActive = designation.isActive;
      }

      if (designation.locations) {
        updateDesignation.locations = designation.locations.map((location) => {
          const updateLocation: typeof location = {};

          if (location.designation) {
            updateLocation.designation = location.designation;
          }

          if (location.positions) {
            updateLocation.positions = location.positions.map((pos) => {
              const updatePosition: typeof pos = {};

              if (pos.position) {
                updatePosition.position = pos.position;
              }

              if (pos.startTime) {
                updatePosition.startTime = pos.startTime;
              }

              return updatePosition;
            });
          }

          if (location.terrain) {
            updateLocation.terrain = location.terrain;
          }

          return updateLocation;
        });
      }

      if (designation.startTimes) {
        updateDesignation.startTimes = designation.startTimes;
      }

      return updateDesignation;
    });
  }

  if (typeof validatedData.isDraft === 'boolean') {
    toUpdate.isDraft = validatedData.isDraft;
  }

  if (validatedData.title) {
    toUpdate.title = validatedData.title;
  }

  const updatedSchedule = await Schedule.findByIdAndUpdate(validatedData.id, toUpdate, { new: true });

  if (!updatedSchedule) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Cannot find designation to update, or failed to update.'));
  }

  const prevEmployees = prevSchedule.assignedEmployees;
  const updatedEmployees = updatedSchedule.assignedEmployees;

  const check: {
    reassigned: {
      designationCheck: object;
      locationCheck: object;
      startTimeCheck: object;
      totalCheck: object;
      found: typeof updatedEmployees;
    };

    new: {
      totalCheck: object;
      found: typeof updatedEmployees;
    };

    removed: {
      totalCheck: object;
      found: typeof prevEmployees;
    };
  } = {
    reassigned: {
      designationCheck: {},
      locationCheck: {},
      startTimeCheck: {},
      totalCheck: [],

      found: [],
    },
    new: {
      totalCheck: {},
      found: [],
    },
    removed: {
      totalCheck: {},
      found: [],
    },
  };

  const scheduleDraft: ScheduleTypes.ISchedule['draft'] = prevSchedule.draft ?? {
    new: [],
    reassigned: [],
    removed: [],
  };

  // Check for employees with new reassignments
  updatedEmployees.forEach((employee) => {
    const { employeeId, designation, location, startTime } = employee;

    check.reassigned.designationCheck[employeeId] = designation;
    check.reassigned.locationCheck[employeeId] = location;
    check.reassigned.startTimeCheck[employeeId] = startTime;

    check.reassigned.totalCheck[employeeId] = 0;
  });

  prevEmployees.forEach((employee) => {
    const { employeeId } = employee;

    if (check.reassigned.designationCheck.hasOwnProperty(employeeId)) {
      if (check.reassigned.designationCheck[employeeId] === employee.designation) {
        check.reassigned.totalCheck[employeeId] += 1;
      }

      if (check.reassigned.locationCheck[employeeId] === employee.location) {
        check.reassigned.totalCheck[employeeId] += 1;
      }

      if (check.reassigned.startTimeCheck[employeeId] === employee.startTime) {
        check.reassigned.totalCheck[employeeId] += 1;
      }
    }
  });

  updatedEmployees.forEach((employee) => {
    const { employeeId } = employee;

    if (check.reassigned.totalCheck[employeeId] !== 3) {
      check.reassigned.found.push(employee);

      scheduleDraft.reassigned.push(employee);

      if (scheduleDraft.new.some((e) => e.employeeId === employeeId)) {
        scheduleDraft.new = scheduleDraft.new.filter((e) => e.employeeId !== employeeId);
      }

      if (scheduleDraft.removed.some((e) => e.employeeId === employeeId)) {
        scheduleDraft.removed = scheduleDraft.removed.filter((e) => e.employeeId !== employeeId);
      }
    }
  });

  // Check for new employees in schedule
  updatedEmployees.forEach((employee) => {
    const { employeeId } = employee;
    check.new.totalCheck[employeeId] = 0;
  });

  prevEmployees.forEach((employee) => {
    const { employeeId } = employee;

    if (check.new.totalCheck.hasOwnProperty(employeeId)) {
      check.new.totalCheck[employeeId] += 1;
    }
  });

  updatedEmployees.forEach((employee) => {
    const { employeeId } = employee;

    if (!check.new.totalCheck[employeeId]) {
      check.new.found.push(employee);

      scheduleDraft.new.push(employee);

      if (scheduleDraft.reassigned.some((e) => e.employeeId === employeeId)) {
        scheduleDraft.reassigned = scheduleDraft.reassigned.filter((e) => e.employeeId !== employeeId);
      }

      if (scheduleDraft.removed.some((e) => e.employeeId === employeeId)) {
        scheduleDraft.removed = scheduleDraft.removed.filter((e) => e.employeeId !== employeeId);
      }
    }
  });

  // Check for removed employees in schedule
  prevEmployees.forEach((employee) => {
    const { employeeId } = employee;
    check.removed.totalCheck[employeeId] = 0;
  });

  updatedEmployees.forEach((employee) => {
    const { employeeId } = employee;

    if (check.removed.totalCheck.hasOwnProperty(employeeId)) {
      check.removed.totalCheck[employeeId] += 1;
    }
  });

  prevEmployees.forEach((employee) => {
    const { employeeId } = employee;

    if (!check.removed.totalCheck[employeeId]) {
      check.removed.found.push(employee);

      scheduleDraft.removed.push(employee);

      if (scheduleDraft.reassigned.some((e) => e.employeeId === employeeId)) {
        scheduleDraft.reassigned = scheduleDraft.reassigned.filter((e) => e.employeeId !== employeeId);
      }

      if (scheduleDraft.new.some((e) => e.employeeId === employeeId)) {
        scheduleDraft.new = scheduleDraft.new.filter((e) => e.employeeId !== employeeId);
      }
    }
  });

  // Check if there are both of the same new and reassigned schedule for same employee
  if (check.new.found.length && check.reassigned.found.length) {
    const found: object = {};

    check.reassigned.found.forEach((employee) => {
      const { employeeId } = employee;
      found[employeeId] = 0;
    });

    check.new.found.forEach((employee) => {
      const { employeeId } = employee;

      if (found.hasOwnProperty(employeeId)) {
        found[employeeId] = employeeId;
      }
    });

    check.reassigned.found = check.reassigned.found.filter(({ employeeId }) => employeeId !== found[employeeId]);

    scheduleDraft.reassigned = check.reassigned.found.filter(({ employeeId }) => employeeId !== found[employeeId]);
  }

  if (!updatedSchedule.isDraft) {
    // Send emails to employees with new reassignment
    // if (check.reassigned.found.length) {
    if (scheduleDraft.reassigned.length) {
      const sentReassignEmployeeEmailResults: Promise<{ employeeId: string; message: string; success: boolean }[]> =
        Promise.all(
          // check.reassigned.found.map(async (employee) => {
          scheduleDraft.reassigned.map(async (employee) => {
            const foundEmployee = await User.findOne({ employeeId: employee.employeeId });

            if (!foundEmployee) {
              return {
                employeeId: employee.employeeId,
                message: `Could not find employee of ${employee.employeeId} in the system.`,
                success: false,
              };
            }

            const emailResult = await EmailServices.newSchedule(
              updatedSchedule.date,
              employee.designation,
              foundEmployee.email,
              employee.location,
              employee.startTime,
              `REASSIGNED - ${updatedSchedule.date}`,
              'https://mtsuite.io/'
            );

            if (!emailResult) {
              return {
                employeeId: employee.employeeId,
                message: `Could not send an email to employee of ${employee.employeeId}.`,
                success: false,
              };
            }

            return {
              employeeId: employee.employeeId,
              message: `Successfully sent an email to employee of ${employee.employeeId}.`,
              success: true,
            };
          })
        );
    }

    // Send emails to new employees in schedule
    // if (check.new.found.length) {
    if (scheduleDraft.new.length) {
      const sentAddEmployeeEmailResults: Promise<{ employeeId: string; message: string; success: boolean }[]> =
        Promise.all(
          // check.new.found.map(async (employee) => {
          scheduleDraft.new.map(async (employee) => {
            const foundEmployee = await User.findOne({ employeeId: employee.employeeId });

            if (!foundEmployee) {
              return {
                employeeId: employee.employeeId,
                message: `Could not find employee of ${employee.employeeId} in the system.`,
                success: false,
              };
            }

            const emailResult = await EmailServices.newSchedule(
              updatedSchedule.date,
              employee.designation,
              foundEmployee.email,
              employee.location,
              employee.startTime,
              `New Schedule for ${updatedSchedule.date}`,
              'https://mtsuite.io/'
            );

            if (!emailResult) {
              return {
                employeeId: employee.employeeId,
                message: `Could not send an email to employee of ${employee.employeeId}.`,
                success: false,
              };
            }

            return {
              employeeId: employee.employeeId,
              message: `Successfully sent an email to employee of ${employee.employeeId}.`,
              success: true,
            };
          })
        );
    }

    // Send emails to employees removed in schedule
    // if (check.removed.found.length) {
    if (scheduleDraft.removed.length) {
      const sentRemovedEmployeeEmailResults: Promise<{ employeeId: string; message: string; success: boolean }[]> =
        Promise.all(
          // check.removed.found.map(async (employee) => {
          scheduleDraft.removed.map(async (employee) => {
            const foundEmployee = await User.findOne({ employeeId: employee.employeeId });

            if (!foundEmployee) {
              return {
                employeeId: employee.employeeId,
                message: `Could not find employee of ${employee.employeeId} in the system.`,
                success: false,
              };
            }

            const emailResult = await EmailServices.deleteSchedule(
              prevSchedule.date,
              employee.designation,
              foundEmployee.email,
              employee.location,
              employee.startTime
            );

            if (!emailResult) {
              return {
                employeeId: employee.employeeId,
                message: `Could not send an email to employee of ${employee.employeeId}.`,
                success: false,
              };
            }

            return {
              employeeId: employee.employeeId,
              message: `Successfully sent an email to employee of ${employee.employeeId}.`,
              success: true,
            };
          })
        );
    }

    // }
  }
  updatedSchedule.draft = updatedSchedule.isDraft ? scheduleDraft : null;
  await updatedSchedule.save({ validateBeforeSave: false });

  const s3Url = await S3Services.s3Retrieve(updatedSchedule.createdBy.employeePicture);

  updatedSchedule.createdBy.employeePicture = s3Url;

  return {
    _id: updatedSchedule.id,
    assignedEmployees: updatedSchedule.assignedEmployees,
    createdBy: updatedSchedule.createdBy,
    date: updatedSchedule.date,
    designations: updatedSchedule.designations,
    title: updatedSchedule.title,
  };
};

const hardDeleteScheduleById = async (req: IReq, next: NextFunction): Promise<string> => {
  const deleteValidation = ValidatorHandlerUtil(ScheduleSchemas.deleteScheduleSchema);

  const clientToken = SessionUtil.headerToken(req);

  if (!clientToken) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'You are not logged in. Please login to get access.'));
  }

  const clientData = await SessionUtil.decodeToken(clientToken);

  if (!clientData) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Please add a token for verification.'));
  }

  const foundUser = await User.findById(clientData.id);

  if (!foundUser) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'The user belonging to this token does not exist.'));
  }

  const reqData: ScheduleTypes.IDeleteScheduleReq = { id: req.params?.id ? sanitize(req.params.id) : '-1' };

  const { id }: ScheduleTypes.IDeleteScheduleReq = deleteValidation.verify(reqData, next);

  const found = await Schedule.findById(id);

  if (!found) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Cannot find schedule.'));
  }

  const deletedData = await Schedule.findByIdAndDelete(id);

  if (!deletedData) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Cannot delete schedule.'));
  }

  if (deletedData.assignedEmployees.length && deletedData.draft?.removed.length) {
    const combined = [...deletedData.assignedEmployees, ...deletedData.draft.removed];
    let uniqueArray: ScheduleTypes.ISchedule['assignedEmployees'] = [];
    let uniqueObject: object = {};

    for (let i in combined) {
      uniqueObject[combined[i].employeeId] = combined[i];
    }

    for (let i in uniqueObject) {
      uniqueArray.push(uniqueObject[i]);
    }

    const sentUniqueEmailResults: Promise<{ employeeId: string; message: string; success: boolean }[]> = Promise.all(
      uniqueArray.map(async (employee) => {
        const foundEmployee = await User.findOne({ employeeId: employee.employeeId });

        if (!foundEmployee) {
          return {
            employeeId: employee.employeeId,
            message: `Could not find employee of ${employee.employeeId} in the system.`,
            success: false,
          };
        }

        const emailResult = await EmailServices.deleteSchedule(
          deletedData.date,
          employee.designation,
          foundEmployee.email,
          employee.location,
          employee.startTime
        );

        if (!emailResult) {
          return {
            employeeId: employee.employeeId,
            message: `Could not send an email to employee of ${employee.employeeId}.`,
            success: false,
          };
        }

        return {
          employeeId: employee.employeeId,
          message: `Successfull sent an email to employee of ${employee.employeeId}.`,
          success: true,
        };
      })
    );
  } else if (!deletedData.assignedEmployees.length && deletedData.draft?.removed.length) {
    const sentDeletedDraftEmailResults: Promise<{ employeeId: string; message: string; success: boolean }[]> =
      Promise.all(
        deletedData.draft.removed.map(async (employee) => {
          const foundEmployee = await User.findOne({ employeeId: employee.employeeId });

          if (!foundEmployee) {
            return {
              employeeId: employee.employeeId,
              message: `Could not find employee of ${employee.employeeId} in the system.`,
              success: false,
            };
          }

          const emailResult = await EmailServices.deleteSchedule(
            deletedData.date,
            employee.designation,
            foundEmployee.email,
            employee.location,
            employee.startTime
          );

          if (!emailResult) {
            return {
              employeeId: employee.employeeId,
              message: `Could not send an email to employee of ${employee.employeeId}.`,
              success: false,
            };
          }

          return {
            employeeId: employee.employeeId,
            message: `Successfull sent an email to employee of ${employee.employeeId}.`,
            success: true,
          };
        })
      );
  } else {
    const sentEmailResults: Promise<{ employeeId: string; message: string; success: boolean }[]> = Promise.all(
      deletedData.assignedEmployees.map(async (employee) => {
        const foundEmployee = await User.findOne({ employeeId: employee.employeeId });

        if (!foundEmployee) {
          return {
            employeeId: employee.employeeId,
            message: `Could not find employee of ${employee.employeeId} in the system.`,
            success: false,
          };
        }

        const emailResult = await EmailServices.deleteSchedule(
          deletedData.date,
          employee.designation,
          foundEmployee.email,
          employee.location,
          employee.startTime
        );

        if (!emailResult) {
          return {
            employeeId: employee.employeeId,
            message: `Could not send an email to employee of ${employee.employeeId}.`,
            success: false,
          };
        }

        return {
          employeeId: employee.employeeId,
          message: `Successfull sent an email to employee of ${employee.employeeId}.`,
          success: true,
        };
      })
    );
  }

  return `Successfully deleted ${deletedData.title} schedule.`;
};

export default { getAllSchedules, newSchedule, editScheduleById, hardDeleteScheduleById } as const;
