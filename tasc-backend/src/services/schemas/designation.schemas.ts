import { JSONSchemaType } from 'ajv';

import ErrorMessages from '@src/constants/ErrorMessages';
import * as DesignationTypes from '@src/types/designation.types';

// **** Types **** //
type TCreateDesignationSchema = JSONSchemaType<DesignationTypes.INewDesignationReqData> & {
  errorMessage: {
    additionalProperties: string;
    required: {
      designation: string;
      startTimes: string;
      locations: string;
    };
  };
};

type TEditDesignationSchema = JSONSchemaType<DesignationTypes.IEditDesignation> & {
  errorMessage: {
    additionalProperties: string;
    required: {
      idRouteParams: string;
    };
  };
};

// **** Schemas **** //
const createDesignationSchema: TCreateDesignationSchema = {
  type: 'object',
  properties: {
    designation: {
      type: 'string',
      minLength: 1,
      errorMessage: {
        type: ErrorMessages.designationErrors.designation.type,
        minLength: ErrorMessages.designationErrors.designation.required,
      },
    },
    startTimes: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      errorMessage: {
        type: ErrorMessages.designationErrors.startTimes.type,
        minItems: ErrorMessages.designationErrors.startTimes.required,
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
              type: ErrorMessages.designationErrors.locations.location.type,
              minLength: ErrorMessages.designationErrors.locations.location.required,
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
                    type: ErrorMessages.designationErrors.locations.positions.position.type,
                    minItems: ErrorMessages.designationErrors.locations.positions.position.required,
                    validateMultiPositions: ErrorMessages.designationErrors.locations.positions.position.valid,
                  },
                },
                startTime: {
                  type: 'string',
                  minLength: 1,
                  errorMessage: {
                    type: ErrorMessages.designationErrors.locations.positions.startTime.type,
                    minLength: ErrorMessages.designationErrors.locations.positions.startTime.required,
                  },
                },
              },
              required: ['position', 'startTime'],
              additionalProperties: false,
              errorMessage: {
                additionalProperties: 'Only position and start time are required!',
                required: {
                  position: ErrorMessages.designationErrors.locations.positions.position.required,
                  startTime: ErrorMessages.designationErrors.locations.positions.startTime.required,
                },
              },
            },
            minItems: 1,
            errorMessage: {
              type: ErrorMessages.designationErrors.locations.positions.type,
              minItems: ErrorMessages.designationErrors.locations.positions.required,
            },
          },
          terrain: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              type: ErrorMessages.designationErrors.locations.terrain.type,
              minLength: ErrorMessages.designationErrors.locations.terrain.required,
            },
          },
        },
        required: ['designation', 'positions', 'terrain'],
        additionalProperties: false,
        errorMessage: {
          additionalProperties: 'Only designation, positions, and terrain in stations are needed!',
          required: {
            designation: ErrorMessages.designationErrors.locations.location.required,
            positions: ErrorMessages.designationErrors.locations.positions.required,
            terrain: ErrorMessages.designationErrors.locations.terrain.required,
          },
        },
      },
      minItems: 1,
      errorMessage: {
        type: ErrorMessages.designationErrors.locations.type,
        minItems: ErrorMessages.designationErrors.locations.required,
      },
    },
  },
  required: ['designation', 'locations', 'startTimes'],
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'Only designation, locations, and start times are needed!',
    required: {
      designation: ErrorMessages.designationErrors.designation.required,
      locations: ErrorMessages.designationErrors.locations.required,
      startTimes: ErrorMessages.designationErrors.startTimes.required,
    },
  },
};

const editDesignationSchema: TEditDesignationSchema = {
  type: 'object',

  properties: {
    idRouteParams: {
      type: 'string',
      validateId: true,
      errorMessage: {
        type: ErrorMessages.designationErrors.idRouteParams.type,
        validateId: ErrorMessages.designationErrors.idRouteParams.valid,
      },
    },

    designation: {
      type: 'string',
      nullable: true,
      errorMessage: {
        type: ErrorMessages.designationErrors.designation.type,
      },
    },

    startTimes: {
      type: 'array',
      nullable: true,
      items: { type: 'string' },
      errorMessage: {
        type: ErrorMessages.designationErrors.startTimes.type,
      },
    },

    isActive: {
      type: 'boolean',
      nullable: true,
      errorMessage: {
        type: ErrorMessages.designationErrors.isActive.type,
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
              type: ErrorMessages.designationErrors.locations.location.type,
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
                    type: ErrorMessages.designationErrors.locations.positions.position.type,
                    validateMultiPositions: ErrorMessages.designationErrors.locations.positions.position.valid,
                  },
                },

                startTime: {
                  type: 'string',
                  nullable: true,
                  errorMessage: {
                    type: ErrorMessages.designationErrors.locations.positions.startTime.type,
                  },
                },
              },

              additionalProperties: false,
              errorMessage: {
                additionalProperties: 'Only position and start time are required.',
              },
            },

            errorMessage: {
              type: ErrorMessages.designationErrors.locations.positions.type,
            },
          },

          terrain: {
            type: 'string',
            nullable: true,
            errorMessage: {
              type: ErrorMessages.designationErrors.locations.terrain.type,
            },
          },
        },

        additionalProperties: false,
        errorMessage: {
          additionalProperties: 'Only designation, positions, and terrain in stations are needed.',
        },
      },

      errorMessage: {
        type: ErrorMessages.designationErrors.locations.type,
      },
    },
  },

  required: ['idRouteParams'],
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'Only designation, locations, start times, and is active are needed.',
    required: {
      idRouteParams: ErrorMessages.designationErrors.idRouteParams.required,
    },
  },
};

export default { createDesignationSchema, editDesignationSchema } as const;
