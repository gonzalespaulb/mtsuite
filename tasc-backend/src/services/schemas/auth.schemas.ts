import { JSONSchemaType } from 'ajv';

import ErrorMessages from '@src/constants/ErrorMessages';
import * as AuthTypes from '@src/types/auth.types';
import * as regex from '@src/util/regex';

// **** Types **** //
type TLoginSchema = JSONSchemaType<AuthTypes.ILogin> & {
  errorMessage: {
    additionalProperties: string;
    required: AuthTypes.ILogin;
  };
};

type TAdminSchema = JSONSchemaType<Omit<AuthTypes.IAdmin, 'photo'>> & {
  errorMessage: {
    additionalProperties: string;
    required: Omit<AuthTypes.IAdmin, 'photo' | 'preferredName'>;
  };
};

type TOnboardingSchema = JSONSchemaType<Omit<AuthTypes.IOnboarding, 'photo'>> & {
  errorMessage: {
    additionalProperties: string;
    required: Omit<
      AuthTypes.IOnboarding,
      'availableDays' | 'photo' | 'employeePosition' | 'preferredName' | 'terrainLimit'
    >;
  };
};

type TResetPasswordSchema = JSONSchemaType<AuthTypes.IResetPassword> & {
  errorMessage: {
    additionalProperties: string;
    required: {
      password: string;
      uniqueCode: string;
    };
  };
};

type TForgotPasswordSchema = JSONSchemaType<AuthTypes.IForgotPassword> & {
  errorMessage: {
    additionalProperties: string;
    required: {
      email: string;
    };
  };
};

// **** Schemas **** //
const loginSchema: TLoginSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      validateEmail: true,
      errorMessage: {
        type: ErrorMessages.userErrors.email.type,
        validateEmail: ErrorMessages.userErrors.email.valid,
      },
    },
    password: {
      type: 'string',
      // Empty string
      not: { maxLength: 0 },
      errorMessage: {
        type: ErrorMessages.userErrors.password.type,
        not: ErrorMessages.userErrors.password.required,
      },
    },
  },
  required: ['email', 'password'],
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'Only email and password are needed!',
    required: {
      email: ErrorMessages.userErrors.email.required,
      password: ErrorMessages.userErrors.password.required,
    },
  },
};

const adminSchema: TAdminSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      validateEmail: true,
      errorMessage: {
        type: ErrorMessages.userErrors.email.type,
        validateEmail: ErrorMessages.userErrors.email.valid,
      },
    },
    firstName: {
      type: 'string',
      minLength: 2,
      maxLength: 70,
      errorMessage: {
        type: ErrorMessages.userErrors.firstName.type,
        minLength: ErrorMessages.userErrors.firstName.minLength,
        maxLength: ErrorMessages.userErrors.firstName.maxLength,
      },
    },
    lastName: {
      type: 'string',
      minLength: 2,
      maxLength: 70,
      errorMessage: {
        type: ErrorMessages.userErrors.lastName.type,
        minLength: ErrorMessages.userErrors.lastName.minLength,
        maxLength: ErrorMessages.userErrors.lastName.maxLength,
      },
    },
    password: {
      type: 'string',
      maxLength: 60,
      validatePassword: true,
      errorMessage: {
        type: ErrorMessages.userErrors.password.type,
        maxLength: ErrorMessages.userErrors.password.maxLength,
        validatePassword: ErrorMessages.userErrors.password.valid,
      },
    },
    passwordConfirmation: {
      type: 'string',
      const: { $data: '1/password' } as unknown as string,
      errorMessage: {
        type: ErrorMessages.userErrors.passwordConfirmation.type,
        const: ErrorMessages.userErrors.passwordConfirmation.match,
      },
    },
    employeePosition: {
      type: 'string',
      enum: regex.position.filter((pos) => pos === 'Administrator' || pos === 'Manager' || pos === 'Superuser'),
      errorMessage: {
        type: ErrorMessages.userErrors.employeePosition.type,
        enum: ErrorMessages.userErrors.employeePosition.validAdmin,
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
  },
  required: ['email', 'employeePosition', 'firstName', 'lastName', 'password', 'passwordConfirmation'],
  additionalProperties: false,
  errorMessage: {
    additionalProperties:
      'Only email, employee position, first name, last name, password, and password confirmation are needed!',
    required: {
      email: ErrorMessages.userErrors.email.required,
      employeePosition: ErrorMessages.userErrors.employeePosition.required,
      firstName: ErrorMessages.userErrors.firstName.required,
      lastName: ErrorMessages.userErrors.lastName.required,
      password: ErrorMessages.userErrors.password.required,
      passwordConfirmation: ErrorMessages.userErrors.passwordConfirmation.required,
    },
  },
};

const onboardingSchema: TOnboardingSchema = {
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
      validateEmail: true,
      errorMessage: {
        type: ErrorMessages.userErrors.email.type,
        validateEmail: ErrorMessages.userErrors.email.valid,
      },
    },
    employeeId: {
      type: 'string',
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
      minLength: 2,
      maxLength: 70,
      errorMessage: {
        type: ErrorMessages.userErrors.firstName.type,
        minLength: ErrorMessages.userErrors.firstName.minLength,
        maxLength: ErrorMessages.userErrors.firstName.maxLength,
      },
    },
    lastName: {
      type: 'string',
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
  required: ['email', 'employeeId', 'firstName', 'lastName', 'mailingAddress', 'phoneNumber'],
  additionalProperties: false,
  errorMessage: {
    additionalProperties:
      'Only available days, email, employee ID, employee position, first name, last name, mailing address, phone number, preferred name, and terrain limit are needed!',
    required: {
      email: ErrorMessages.userErrors.email.required,
      employeeId: ErrorMessages.userErrors.employeeId.required,
      firstName: ErrorMessages.userErrors.firstName.required,
      lastName: ErrorMessages.userErrors.lastName.required,
      mailingAddress: ErrorMessages.userErrors.mailingAddress.required,
      phoneNumber: ErrorMessages.userErrors.phoneNumber.required,
    },
  },
};

const resetPasswordSchema: TResetPasswordSchema = {
  type: 'object',

  properties: {
    password: {
      type: 'string',
      maxLength: 60,
      validatePassword: true,
      errorMessage: {
        type: ErrorMessages.userErrors.password.type,
        maxLength: ErrorMessages.userErrors.password.maxLength,
        validatePassword: ErrorMessages.userErrors.password.valid,
      },
    },

    uniqueCode: {
      type: 'string',
      // validateUniqueCode: true,
      errorMessage: {
        type: ErrorMessages.userErrors.uniqueCode.type,
        // validateUniqueCode: ErrorMessages.userErrors.uniqueCode.valid,
      },
    },
  },

  required: ['password', 'uniqueCode'],
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'Only password and unique code are needed',
    required: {
      password: ErrorMessages.userErrors.password.required,
      uniqueCode: ErrorMessages.userErrors.uniqueCode.required,
    },
  },
};

const forgotPasswordSchema: TForgotPasswordSchema = {
  type: 'object',

  properties: {
    email: {
      type: 'string',
      validateEmail: true,
      errorMessage: {
        type: ErrorMessages.userErrors.email.valid,
        validateEmail: ErrorMessages.userErrors.email.valid,
      },
    },
  },

  required: ['email'],

  additionalProperties: false,

  errorMessage: {
    additionalProperties: 'Only email is needed',
    required: {
      email: ErrorMessages.userErrors.email.required,
    },
  },
};

export default { adminSchema, loginSchema, onboardingSchema, resetPasswordSchema, forgotPasswordSchema } as const;
