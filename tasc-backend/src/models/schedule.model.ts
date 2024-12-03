import mongoose, { Model } from 'mongoose';

import ErrorMessages from '@src/constants/ErrorMessages';
import * as regex from '@src/util/regex';
import * as ScheduleTypes from '@src/types/schedule.types';

// **** Types ****//
type TScheduleModel = Model<Omit<ScheduleTypes.ISchedule, 'id' | 'createdAt' | 'updatedAt'>, {}>;

// **** Schema ****//
const schema = new mongoose.Schema<Omit<ScheduleTypes.ISchedule, 'id' | 'createdAt' | 'updatedAt'>, TScheduleModel>(
  {
    title: {
      type: String,
      required: [true, ErrorMessages.scheduleErrors.title.required],
    },

    date: {
      type: String,
      required: [true, ErrorMessages.scheduleErrors.date.required],
    },

    createdBy: {
      type: {
        employeeId: {
          type: String,
          required: [true, ErrorMessages.scheduleErrors.createdBy.employeeId.required],
        },

        employeePicture: {
          type: String,
          required: [true, ErrorMessages.scheduleErrors.createdBy.employeePicture.required],
        },

        preferredName: {
          type: String,
          required: [true, ErrorMessages.scheduleErrors.createdBy.preferredName.required],
        },
      },

      required: [true, ErrorMessages.scheduleErrors.createdBy.required],
    },

    designations: {
      type: [
        {
          designation: {
            type: String,
            required: [true, ErrorMessages.scheduleErrors.designations.designation.required],
          },

          isActive: {
            type: Boolean,
            required: [true, ErrorMessages.scheduleErrors.designations.isActive.required],
          },

          startTimes: {
            type: [String],
            required: [true, ErrorMessages.scheduleErrors.designations.startTimes.required],
          },

          locations: {
            type: [
              {
                designation: {
                  type: String,
                  required: [true, ErrorMessages.scheduleErrors.designations.locations.designation.required],
                },

                positions: {
                  type: [
                    {
                      position: {
                        type: [
                          {
                            type: String,
                            enum: {
                              values: regex.position,
                              message: ErrorMessages.scheduleErrors.designations.locations.positions.position.valid,
                            },
                          },
                        ],
                        required: [
                          true,
                          ErrorMessages.scheduleErrors.designations.locations.positions.position.required,
                        ],
                      },

                      startTime: {
                        type: String,
                        required: [
                          true,
                          ErrorMessages.scheduleErrors.designations.locations.positions.startTime.required,
                        ],
                      },
                    },
                  ],

                  required: [true, ErrorMessages.scheduleErrors.designations.locations.positions.required],
                },

                terrain: {
                  type: String,
                  required: [true, ErrorMessages.scheduleErrors.designations.locations.terrain.required],
                },
              },
            ],

            required: [true, ErrorMessages.scheduleErrors.designations.locations.required],
          },

          createdAt: {
            type: Date,
            required: false,
            default: new Date(),
          },

          updatedAt: {
            type: Date,
            required: false,
            default: new Date(),
          },
        },
      ],

      required: [true, ErrorMessages.scheduleErrors.designations.required],
    },

    assignedEmployees: {
      type: [
        {
          _id: false,

          employeeId: {
            type: String,
            required: [true, ErrorMessages.scheduleErrors.assignedEmployees.employeeId.required],
          },

          preferredName: {
            type: String,
            required: [true, ErrorMessages.scheduleErrors.assignedEmployees.preferredName.required],
          },

          position: {
            type: [
              {
                _id: false,
                type: String,
                enum: {
                  values: regex.position,
                  message: ErrorMessages.scheduleErrors.assignedEmployees.position.valid,
                },
              },
            ],
            required: [true, ErrorMessages.scheduleErrors.assignedEmployees.position.required],
          },

          designation: {
            type: String,
            required: [true, ErrorMessages.scheduleErrors.assignedEmployees.designation.required],
          },

          location: {
            type: String,
            required: [true, ErrorMessages.scheduleErrors.assignedEmployees.location.required],
          },

          startTime: {
            type: String,
            required: [true, ErrorMessages.scheduleErrors.assignedEmployees.startTime.required],
          },

          punchTimes: {
            type: [
              {
                start: {
                  type: Date,
                  required: [true, ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.start.required],
                },

                end: {
                  type: Date,
                  required: [true, ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.end.required],
                },

                total: {
                  type: Number,
                  required: [true, ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.total.required],
                },
              },
            ],

            required: false,
            default: [],
          },

          totalHours: {
            type: Number,
            required: false,
            default: 0,
          },
        },
      ],

      required: [true, ErrorMessages.scheduleErrors.assignedEmployees.required],
    },

    isDraft: {
      type: Boolean,
      default: false,
    },

    draft: {
      type: {
        new: {
          type: [
            {
              _id: false,

              employeeId: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.employeeId.required],
              },

              preferredName: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.preferredName.required],
              },

              position: {
                type: [
                  {
                    _id: false,
                    type: String,
                    enum: {
                      values: regex.position,
                      message: ErrorMessages.scheduleErrors.assignedEmployees.position.valid,
                    },
                  },
                ],
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.position.required],
              },

              designation: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.designation.required],
              },

              location: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.location.required],
              },

              startTime: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.startTime.required],
              },

              punchTimes: {
                type: [
                  {
                    start: {
                      type: Date,
                      required: [true, ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.start.required],
                    },

                    end: {
                      type: Date,
                      required: [true, ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.end.required],
                    },

                    total: {
                      type: Number,
                      required: [true, ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.total.required],
                    },
                  },
                ],

                required: false,
                default: [],
              },

              totalHours: {
                type: Number,
                required: false,
                default: 0,
              },
            },
          ],

          required: [true, ErrorMessages.scheduleErrors.assignedEmployees.required],
        },

        reassigned: {
          type: [
            {
              _id: false,

              employeeId: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.employeeId.required],
              },

              preferredName: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.preferredName.required],
              },

              position: {
                type: [
                  {
                    _id: false,
                    type: String,
                    enum: {
                      values: regex.position,
                      message: ErrorMessages.scheduleErrors.assignedEmployees.position.valid,
                    },
                  },
                ],
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.position.required],
              },

              designation: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.designation.required],
              },

              location: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.location.required],
              },

              startTime: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.startTime.required],
              },

              punchTimes: {
                type: [
                  {
                    start: {
                      type: Date,
                      required: [true, ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.start.required],
                    },

                    end: {
                      type: Date,
                      required: [true, ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.end.required],
                    },

                    total: {
                      type: Number,
                      required: [true, ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.total.required],
                    },
                  },
                ],

                required: false,
                default: [],
              },

              totalHours: {
                type: Number,
                required: false,
                default: 0,
              },
            },
          ],

          required: [true, ErrorMessages.scheduleErrors.assignedEmployees.required],
        },

        removed: {
          type: [
            {
              _id: false,

              employeeId: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.employeeId.required],
              },

              preferredName: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.preferredName.required],
              },

              position: {
                type: [
                  {
                    _id: false,
                    type: String,
                    enum: {
                      values: regex.position,
                      message: ErrorMessages.scheduleErrors.assignedEmployees.position.valid,
                    },
                  },
                ],
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.position.required],
              },

              designation: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.designation.required],
              },

              location: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.location.required],
              },

              startTime: {
                type: String,
                required: [true, ErrorMessages.scheduleErrors.assignedEmployees.startTime.required],
              },

              punchTimes: {
                type: [
                  {
                    start: {
                      type: Date,
                      required: [true, ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.start.required],
                    },

                    end: {
                      type: Date,
                      required: [true, ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.end.required],
                    },

                    total: {
                      type: Number,
                      required: [true, ErrorMessages.scheduleErrors.assignedEmployees.punchTimes.total.required],
                    },
                  },
                ],

                required: false,
                default: [],
              },

              totalHours: {
                type: Number,
                required: false,
                default: 0,
              },
            },
          ],

          required: [true, ErrorMessages.scheduleErrors.assignedEmployees.required],
        },
      },

      default: null,
    },
  },
  { timestamps: true }
);

schema.index({
  title: 'text',
});

export default mongoose.model('Schedule', schema);
