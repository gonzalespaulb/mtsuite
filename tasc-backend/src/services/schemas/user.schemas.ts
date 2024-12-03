import { JSONSchemaType } from 'ajv';

import ErrorMessages from '@src/constants/ErrorMessages';
import * as UserTypes from '@src/types/user.types';
import * as regex from '@src/util/regex';

// **** Types **** //
type TEditUserSchema = JSONSchemaType<Omit<UserTypes.IUserOptions, 'photo'>> & {
  errorMessage: {
    additionalProperties: string;
  };
};

type TCreateCustomShiftSchema = JSONSchemaType<UserTypes.ICreateCustomShiftRequest> & {
  errorMessage: {
    additionalProperties: string;
    required: {
      customShift: string;
      employeeId: string;
    };
  };
};

type TDeleteCustomShiftSchema = JSONSchemaType<UserTypes.IDeleteCustomShiftsRequest> & {
  errorMessage: {
    additionalProperties: string;
    required: {
      customShiftId: string;
      employeeId: string;
    };
  };
};

// **** Schemas **** //
const editUserSchema: TEditUserSchema = {
  type: 'object',
  properties: {
    availableDays: {
      type: 'array',
      nullable: true,
      items: { type: 'string' },
      maxItems: 7,
      validateAvailability: true,
      errorMessage: {
        type: ErrorMessages.userErrors.availableDays.type,
        maxItems: ErrorMessages.userErrors.availableDays.maxLength,
        validateAvailability: ErrorMessages.userErrors.availableDays.valid,
      },
    },
    email: {
      type: 'string',
      nullable: true,
      validateEmail: true,
      errorMessage: {
        type: ErrorMessages.userErrors.email.type,
        validateEmail: ErrorMessages.userErrors.email.valid,
      },
    },
    employeeId: {
      type: 'string',
      nullable: true,
      errorMessage: {
        type: ErrorMessages.userErrors.employeeId.type,
      },
    },
    employeePosition: {
      type: 'string',
      nullable: true,
      enum: regex.position,
      errorMessage: {
        type: ErrorMessages.userErrors.employeePosition.type,
        enum: ErrorMessages.userErrors.employeePosition.validOnboarding,
      },
    },
    firstName: {
      type: 'string',
      nullable: true,
      minLength: 2,
      maxLength: 70,
      errorMessage: {
        type: ErrorMessages.userErrors.firstName.type,
        minLength: ErrorMessages.userErrors.firstName.minLength,
        maxLength: ErrorMessages.userErrors.firstName.maxLength,
      },
    },
    isActive: {
      type: 'boolean',
      nullable: true,
      errorMessage: {
        type: ErrorMessages.userErrors.isActive.type,
      },
    },
    lastName: {
      type: 'string',
      nullable: true,
      minLength: 2,
      maxLength: 70,
      errorMessage: {
        type: ErrorMessages.userErrors.lastName.type,
        minLength: ErrorMessages.userErrors.lastName.minLength,
        maxLength: ErrorMessages.userErrors.lastName.maxLength,
      },
    },
    mailingAddress: {
      type: 'string',
      nullable: true,
      errorMessage: { type: ErrorMessages.userErrors.mailingAddress.type },
    },
    performance: {
      type: 'object',
      nullable: true,
      properties: {
        absences: {
          type: 'number',
          nullable: true,
          errorMessage: {
            type: ErrorMessages.userErrors.performance.absences.type,
          },
        },
        lates: {
          type: 'number',
          nullable: true,
          errorMessage: {
            type: ErrorMessages.userErrors.performance.absences.type,
          },
        },
        ncns: {
          type: 'number',
          nullable: true,
          errorMessage: {
            type: ErrorMessages.userErrors.performance.absences.type,
          },
        },
        totalHours: {
          type: 'number',
          nullable: true,
          errorMessage: {
            type: ErrorMessages.userErrors.performance.absences.type,
          },
        },
      },
      additionalProperties: false,
      errorMessage: {
        type: ErrorMessages.userErrors.performance.type,
        additionalProperties: 'Only absences, lates, ncns, and totalHours are needed in performance!',
      },
    },
    phoneNumber: {
      type: 'string',
      nullable: true,
      validatePhone: true,
      errorMessage: {
        type: ErrorMessages.userErrors.phoneNumber.type,
        validatePhone: ErrorMessages.userErrors.phoneNumber.valid,
      },
    },
    preferredName: {
      type: 'string',
      nullable: true,
      minLength: 2,
      maxLength: 70,
      errorMessage: {
        type: ErrorMessages.userErrors.preferredName.type,
        minLength: ErrorMessages.userErrors.preferredName.minLength,
        maxLength: ErrorMessages.userErrors.preferredName.maxLength,
      },
    },
    terrainLimit: {
      type: 'number',
      nullable: true,
      minimum: 0,
      maximum: 6,
      errorMessage: {
        type: ErrorMessages.userErrors.terrainLimit.type,
        minimum: ErrorMessages.userErrors.terrainLimit.minLength,
        maximum: ErrorMessages.userErrors.terrainLimit.maxLength,
        validateTerrainLimit: ErrorMessages.userErrors.terrainLimit.valid,
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    additionalProperties:
      'Only is active, availability, email, employee ID, employee position, first name, last name, mailing address, phone number, preferred name, and terrain limit are needed!',
  },
};

const createCustomShiftSchema: TCreateCustomShiftSchema = {
  type: 'object',
  properties: {
    customShift: {
      type: 'object',

      properties: {
        date: {
          type: 'string',

          errorMessage: {
            type: ErrorMessages.userErrors.customShifts.date.type,
          },
        },

        isActive: {
          type: 'boolean',

          errorMessage: {
            type: ErrorMessages.userErrors.customShifts.isActive.type,
          },
        },

        note: {
          type: 'string',
          nullable: true,

          errorMessage: {
            type: ErrorMessages.userErrors.customShifts.note.type,
          },
        },
      },

      required: ['date', 'isActive'],
      additionalProperties: false,
      errorMessage: {
        type: ErrorMessages.userErrors.customShifts.type,
        additionalProperties: 'Only date, is active, and note are needed in custom shifts',
        required: {
          date: ErrorMessages.userErrors.customShifts.date.required,
          isActive: ErrorMessages.userErrors.customShifts.isActive.required,
        },
      },
    },

    employeeId: {
      type: 'string',

      errorMessage: {
        type: ErrorMessages.userErrors.employeeId.type,
      },
    },
  },

  required: ['customShift', 'employeeId'],
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'Only custom shifts and employee ID are needed',
    required: {
      customShift: ErrorMessages.userErrors.customShifts.required,
      employeeId: ErrorMessages.userErrors.employeeId.required,
    },
  },
};

const deleteCustomShiftsSchema: TDeleteCustomShiftSchema = {
  type: 'object',
  properties: {
    customShiftId: {
      type: 'string',
      validateId: true,
      errorMessage: {
        type: ErrorMessages.userErrors.customShifts.id.type,
        validateId: ErrorMessages.userErrors.customShifts.id.valid,
      },
    },

    employeeId: {
      type: 'string',

      errorMessage: {
        type: ErrorMessages.userErrors.employeeId.type,
      },
    },
  },

  required: ['customShiftId'],
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'Only the custom shift ID and employee ID are needed',
    required: {
      customShiftId: ErrorMessages.userErrors.customShifts.id.required,
      employeeId: ErrorMessages.userErrors.employeeId.required,
    },
  },
};

export default { createCustomShiftSchema, deleteCustomShiftsSchema, editUserSchema } as const;
