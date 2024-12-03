import { JSONSchemaType } from 'ajv';

import ErrorMessages from '@src/constants/ErrorMessages';
import * as ScheduleTypes from '@src/types/schedule.types';

// **** Types **** //
type TCreateScheduleSchema = JSONSchemaType<ScheduleTypes.INewScheduleReqData> & {
  errorMessage: {
    additionalProperties: string;
    required: {
      title: string;
      date: string;
      designations: string;
      assignedEmployees: string;
      createdBy: string;
      isDraft: string;
    };
  };
};

type TEditScheduleSchema = JSONSchemaType<ScheduleTypes.IEditScheduleReq> & {
  errorMessage: {
    additionalProperties: string;
    required: {
      id: string;
    };
  };
};

type TDeleteScheduleSchema = JSONSchemaType<ScheduleTypes.IDeleteScheduleReq> & {
  errorMessage: {
    additionalProperties: string;
    required: {
      id: string;
    };
  };
};

// **** Schemas **** //
const createScheduleSchema: TCreateScheduleSchema = {
  type: 'object',
  properties: {
    assignedEmployees: {
      type: 'array',

      items: {
        type: 'object',

        properties: {
          designation: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.designation.type,
              minLength: ErrorMessages.scheduleErrors.assignedEmployees.designation.required,
            },
          },

          location: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.location.type,
              minLength: ErrorMessages.scheduleErrors.assignedEmployees.location.required,
            },
          },

          employeeId: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.employeeId.type,
              minLength: ErrorMessages.scheduleErrors.assignedEmployees.employeeId.required,
            },
          },

          preferredName: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.preferredName.type,
              minLength: ErrorMessages.scheduleErrors.assignedEmployees.preferredName.required,
            },
          },

          position: {
            type: 'array',
            items: { type: 'string' },
            minItems: 1,
            validateMultiPositions: true,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.position.type,
              minItems: ErrorMessages.scheduleErrors.assignedEmployees.position.required,
              validateMultiPositions: ErrorMessages.scheduleErrors.assignedEmployees.position.valid,
            },
          },

          punchTimes: {
            type: 'array',
            nullable: true,

            items: {
              type: 'object',

              properties: {
                end: {
                  type: 'object',
                  required: ['toUTCString'],
                  errorMessage: {
                    type: ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.end.type,
                  },
                },

                start: {
                  type: 'object',
                  required: ['toUTCString'],
                  errorMessage: {
                    type: ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.start.type,
                  },
                },

                total: {
                  type: 'number',
                  errorMessage: {
                    total: ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.total.type,
                  },
                },
              },

              required: ['end', 'start', 'total'],
              additionalProperties: false,
              errorMessage: {
                additionalProperties: 'Only end, start, and total are needed',
                required: {
                  end: ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.end.required,
                  start: ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.start.required,
                  total: ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.total.required,
                },
              },
            },

            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.type,
            },
          },

          startTime: {
            type: 'string',
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.startTime.type,
            },
          },

          totalHours: {
            type: 'number',
            nullable: true,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.totalHours.type,
            },
          },
        },

        required: ['designation', 'location', 'employeeId', 'position', 'preferredName', 'startTime'],
        additionalProperties: false,
        errorMessage: {
          additionalProperties:
            'Only designation, location, employee ID, position, preferred name, start time, and total hours are needed',
          required: {
            designation: ErrorMessages.scheduleErrors.assignedEmployees.designation.required,
            location: ErrorMessages.scheduleErrors.assignedEmployees.location.required,
            employeeId: ErrorMessages.scheduleErrors.assignedEmployees.employeeId.required,
            position: ErrorMessages.scheduleErrors.assignedEmployees.position.required,
            preferredName: ErrorMessages.scheduleErrors.assignedEmployees.preferredName.required,
            startTime: ErrorMessages.scheduleErrors.assignedEmployees.startTime.required,
            totalHours: ErrorMessages.scheduleErrors.assignedEmployees.totalHours.required,
          },
        },
      },

      minItems: 1,
      errorMessage: {
        type: ErrorMessages.scheduleErrors.assignedEmployees.type,
        minItems: ErrorMessages.scheduleErrors.assignedEmployees.required,
      },
    },

    createdBy: {
      type: 'object',

      properties: {
        employeeId: {
          type: 'string',
          errorMessage: {
            type: ErrorMessages.scheduleErrors.createdBy.employeeId.type,
          },
        },

        employeePicture: {
          type: 'string',
          errorMessage: {
            type: ErrorMessages.scheduleErrors.createdBy.employeePicture.type,
          },
        },

        preferredName: {
          type: 'string',
          errorMessage: {
            type: ErrorMessages.scheduleErrors.createdBy.preferredName.type,
          },
        },
      },

      additionalProperties: false,
      required: ['employeeId', 'employeePicture', 'preferredName'],
      errorMessage: {
        employeeId: ErrorMessages.scheduleErrors.createdBy.employeeId.required,
        employeePicture: ErrorMessages.scheduleErrors.createdBy.employeePicture.required,
        preferredName: ErrorMessages.scheduleErrors.createdBy.preferredName.required,
      },
    },

    date: {
      type: 'string',
      errorMessage: {
        type: ErrorMessages.scheduleErrors.date.required,
      },
    },

    designations: {
      type: 'array',

      items: {
        type: 'object',

        properties: {
          designation: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.designations.designation.type,
              minLength: ErrorMessages.scheduleErrors.designations.designation.required,
            },
          },

          isActive: {
            type: 'boolean',
            errorMessage: {
              type: ErrorMessages.scheduleErrors.designations.isActive.type,
            },
          },

          locations: {
            type: 'array',

            items: {
              type: 'object',

              properties: {
                designation: {
                  type: 'string',
                  minLength: 1,
                  errorMessage: {
                    type: ErrorMessages.scheduleErrors.designations.locations.designation.type,
                    minLength: ErrorMessages.scheduleErrors.designations.locations.designation.required,
                  },
                },

                positions: {
                  type: 'array',

                  items: {
                    type: 'object',

                    properties: {
                      position: {
                        type: 'array',
                        items: { type: 'string' },
                        minItems: 1,
                        validateMultiPositions: true,
                        errorMessage: {
                          type: ErrorMessages.scheduleErrors.designations.locations.positions.position.type,
                          minItems: ErrorMessages.scheduleErrors.designations.locations.positions.position.required,
                          validateMultiPositions:
                            ErrorMessages.scheduleErrors.designations.locations.positions.position.valid,
                        },
                      },

                      startTime: {
                        type: 'string',
                        minLength: 1,
                        errorMessage: {
                          type: ErrorMessages.scheduleErrors.designations.locations.positions.startTime.type,
                          minLength: ErrorMessages.scheduleErrors.designations.locations.positions.startTime.required,
                        },
                      },
                    },

                    required: ['position', 'startTime'],
                    additionalProperties: false,
                    errorMessage: {
                      additionalProperties: 'Only position and start time are needed',
                      required: {
                        position: ErrorMessages.scheduleErrors.designations.locations.positions.position.required,
                        startTime: ErrorMessages.scheduleErrors.designations.locations.positions.startTime.required,
                      },
                    },
                  },

                  minItems: 1,
                  errorMessage: {
                    type: ErrorMessages.scheduleErrors.designations.locations.positions.type,
                    minItems: ErrorMessages.scheduleErrors.designations.locations.positions.required,
                  },
                },

                terrain: {
                  type: 'string',
                  minLength: 1,
                  errorMessage: {
                    type: ErrorMessages.scheduleErrors.designations.locations.terrain.type,
                    minLength: ErrorMessages.scheduleErrors.designations.locations.terrain.required,
                  },
                },
              },

              required: ['designation', 'positions', 'terrain'],
              additionalProperties: false,
              errorMessage: {
                additionalProperties: 'Only designation, positions, and terrain are needed',
                required: {
                  designation: ErrorMessages.scheduleErrors.designations.locations.designation.required,
                  positions: ErrorMessages.scheduleErrors.designations.locations.positions.required,
                  terrain: ErrorMessages.scheduleErrors.designations.locations.terrain.required,
                },
              },
            },

            minItems: 1,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.designations.locations.type,
              minItems: ErrorMessages.scheduleErrors.designations.locations.required,
            },
          },

          startTimes: {
            type: 'array',
            items: { type: 'string' },
            minItems: 1,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.designations.startTimes.type,
              minItems: ErrorMessages.scheduleErrors.designations.startTimes.required,
            },
          },
        },

        required: ['designation', 'locations', 'startTimes', 'isActive'],
        additionalProperties: false,
        errorMessage: {
          additionalProperties: 'Only designation, locations, start times, and is active are needed',
          required: {
            designation: ErrorMessages.scheduleErrors.designations.designation.required,
            locations: ErrorMessages.scheduleErrors.designations.locations.required,
            startTimes: ErrorMessages.scheduleErrors.designations.startTimes.required,
            isActive: ErrorMessages.scheduleErrors.designations.startTimes.required,
          },
        },
      },

      minItems: 1,
      errorMessage: {
        type: ErrorMessages.scheduleErrors.designations.type,
        minItems: ErrorMessages.scheduleErrors.designations.required,
      },
    },

    isDraft: {
      type: 'boolean',
      errorMessage: {
        type: ErrorMessages.scheduleErrors.isDraft.type,
      },
    },

    title: {
      type: 'string',
      minLength: 1,
      errorMessage: {
        type: ErrorMessages.scheduleErrors.title.type,
        minLength: ErrorMessages.scheduleErrors.title.required,
      },
    },
  },

  required: ['assignedEmployees', 'createdBy', 'date', 'designations', 'isDraft', 'title'],
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'Only assigned employees, date, designations, and title are needed',
    required: {
      assignedEmployees: ErrorMessages.scheduleErrors.assignedEmployees.required,
      createdBy: ErrorMessages.scheduleErrors.createdBy.required,
      date: ErrorMessages.scheduleErrors.date.required,
      designations: ErrorMessages.scheduleErrors.designations.required,
      isDraft: ErrorMessages.scheduleErrors.isDraft.required,
      title: ErrorMessages.scheduleErrors.title.required,
    },
  },
};

const editScheduleSchema: TEditScheduleSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      validateId: true,
      errorMessage: {
        type: ErrorMessages.scheduleErrors.id.type,
        validateId: ErrorMessages.scheduleErrors.id.valid,
      },
    },

    assignedEmployees: {
      type: 'array',
      nullable: true,

      items: {
        type: 'object',

        properties: {
          designation: {
            type: 'string',
            nullable: true,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.designation.type,
            },
          },

          location: {
            type: 'string',
            nullable: true,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.location.type,
            },
          },

          employeeId: {
            type: 'string',
            nullable: true,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.employeeId.type,
            },
          },

          preferredName: {
            type: 'string',
            nullable: true,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.preferredName.type,
            },
          },

          position: {
            type: 'array',
            nullable: true,
            items: { type: 'string' },
            validateMultiPositions: true,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.position.type,
              validateMultiPositions: ErrorMessages.scheduleErrors.assignedEmployees.position.valid,
            },
          },

          punchTimes: {
            type: 'array',
            nullable: true,

            items: {
              type: 'object',

              properties: {
                end: {
                  type: 'object',
                  nullable: true,
                  required: ['toUTCString'],
                  errorMessage: {
                    type: ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.end.type,
                  },
                },

                start: {
                  type: 'object',
                  nullable: true,
                  required: ['toUTCString'],
                  errorMessage: {
                    type: ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.start.type,
                  },
                },

                total: {
                  type: 'number',
                  nullable: true,
                  errorMessage: {
                    total: ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.total.type,
                  },
                },
              },

              additionalProperties: false,
              errorMessage: {
                additionalProperties: 'Only end, start, and total are needed',
              },
            },

            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.type,
            },
          },

          startTime: {
            type: 'string',
            nullable: true,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.startTime.type,
            },
          },

          totalHours: {
            type: 'number',
            nullable: true,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.assignedEmployees.totalHours.type,
            },
          },
        },

        additionalProperties: false,
        errorMessage: {
          additionalProperties:
            'Only designation, location, employee ID, position, preferred name, start time, and total hours are needed',
        },
      },

      errorMessage: {
        type: ErrorMessages.scheduleErrors.assignedEmployees.type,
      },
    },

    date: {
      type: 'string',
      nullable: true,
      errorMessage: {
        type: ErrorMessages.scheduleErrors.date.required,
      },
    },

    designations: {
      type: 'array',
      nullable: true,

      items: {
        type: 'object',

        properties: {
          designation: {
            type: 'string',
            nullable: true,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.designations.designation.type,
            },
          },

          locations: {
            type: 'array',
            nullable: true,

            items: {
              type: 'object',

              properties: {
                designation: {
                  type: 'string',
                  nullable: true,
                  errorMessage: {
                    type: ErrorMessages.scheduleErrors.designations.locations.designation.type,
                  },
                },

                positions: {
                  type: 'array',
                  nullable: true,

                  items: {
                    type: 'object',

                    properties: {
                      position: {
                        type: 'array',
                        nullable: true,
                        items: { type: 'string' },
                        validateMultiPositions: true,
                        errorMessage: {
                          type: ErrorMessages.scheduleErrors.designations.locations.positions.position.type,
                          validateMultiPositions:
                            ErrorMessages.scheduleErrors.designations.locations.positions.position.valid,
                        },
                      },

                      startTime: {
                        type: 'string',
                        nullable: true,
                        errorMessage: {
                          type: ErrorMessages.scheduleErrors.designations.locations.positions.startTime.type,
                        },
                      },
                    },

                    additionalProperties: false,
                    errorMessage: {
                      additionalProperties: 'Only position and start time are needed',
                    },
                  },

                  errorMessage: {
                    type: ErrorMessages.scheduleErrors.designations.locations.positions.type,
                  },
                },

                terrain: {
                  type: 'string',
                  nullable: true,
                  errorMessage: {
                    type: ErrorMessages.scheduleErrors.designations.locations.terrain.type,
                  },
                },
              },

              additionalProperties: false,
              errorMessage: {
                additionalProperties: 'Only designation, positions, and terrain are needed',
              },
            },

            errorMessage: {
              type: ErrorMessages.scheduleErrors.designations.locations.type,
            },
          },

          startTimes: {
            type: 'array',
            nullable: true,
            items: { type: 'string' },
            errorMessage: {
              type: ErrorMessages.scheduleErrors.designations.startTimes.type,
            },
          },

          isActive: {
            type: 'boolean',
            nullable: true,
            errorMessage: {
              type: ErrorMessages.scheduleErrors.designations.isActive.type,
            },
          },
        },

        additionalProperties: false,
        errorMessage: {
          additionalProperties: 'Only designation, locations, start times, and is active are needed',
        },
      },

      errorMessage: {
        type: ErrorMessages.scheduleErrors.designations.type,
      },
    },

    isDraft: {
      type: 'boolean',
      nullable: true,
      errorMessage: {
        type: ErrorMessages.scheduleErrors.isDraft.type,
      },
    },

    title: {
      type: 'string',
      nullable: true,
      errorMessage: {
        type: ErrorMessages.scheduleErrors.title.type,
      },
    },
  },

  required: ['id'],
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'Only assigned employees, date, designations, and title are needed',
    required: {
      id: ErrorMessages.scheduleErrors.id.required,
    },
  },
};

const deleteScheduleSchema: TDeleteScheduleSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      validateId: true,
      errorMessage: {
        type: ErrorMessages.scheduleErrors.id.type,
        validateId: ErrorMessages.scheduleErrors.id.valid,
      },
    },
  },

  required: ['id'],
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'Only the schedule ID is needed',
    required: {
      id: ErrorMessages.scheduleErrors.id.required,
    },
  },
};

export default { createScheduleSchema, editScheduleSchema, deleteScheduleSchema } as const;
