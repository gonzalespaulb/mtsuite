import mongoose, { Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import ErrorMessages from '@src/constants/ErrorMessages';
import { ICustomShift, TPosition, TRoleType } from '@src/types/misc';
import * as regex from '@src/util/regex';

const SALT_WORK_FACTOR = 10;

// **** Types ****//
interface IUser {
  availableDays: string[];
  customShifts: ICustomShift[];
  email: string;
  employeeId: string;
  employeePosition: TPosition;
  deletedAt: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  mailingAddress: string;
  password: string;
  passwordChangedAt: number;
  passwordResetToken?: string;
  passwordResetExpires?: string;
  performance: {
    absences: number;
    lates: number;
    ncns: number;
    totalHours: number;
  };
  phoneNumber: number;
  employeePicture: string;
  preferredName?: string;
  terrainLimit: number;
  uniqueCode?: string;
}

interface IUserVirtuals {
  roleType: TRoleType;
}

interface IUserMethods {
  correctPassword(givenPassword: string | Buffer, userPassword: string): Promise<boolean>;
  createPasswordResetToken(expMin: number): string;
}

type TUserModel = Model<IUser, {}, IUserMethods, IUserVirtuals>;

// **** Schema ****//
const schema = new mongoose.Schema<IUser, TUserModel, IUserMethods, {}, IUserVirtuals>(
  {
    isActive: {
      type: Boolean,
      default: true,
    },

    availableDays: {
      type: [
        {
          type: String,
          enum: {
            values: regex.availability,
            message: ErrorMessages.userErrors.availableDays.valid,
          },
        },
      ],
      default: [],
      validate: {
        validator: (arr) => {
          if (!arr) {
            return true;
          }

          return arr.length <= 7;
        },
        message: ErrorMessages.userErrors.availableDays.maxLength,
      },
    },

    customShifts: {
      type: [
        {
          date: {
            type: String,
            required: [true, ErrorMessages.userErrors.customShifts.date.required],
          },

          isActive: {
            type: Boolean,
            required: [true, ErrorMessages.userErrors.customShifts.isActive.required],
          },

          note: String,
        },
      ],
      default: [],
    },

    deletedAt: Date,

    email: {
      type: String,
      required: [true, ErrorMessages.userErrors.email.required],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, ErrorMessages.userErrors.email.valid],
    },

    employeeId: {
      type: String,
      unique: true,
      default: null,
    },

    employeePosition: {
      type: String,
      default: 'Attendant',
      required: [true, ErrorMessages.userErrors.employeePosition.required],
      enum: {
        // NOTE: DO NOT OUTPUT ABOUT 'superuser' OPTION IN THE ERROR MESSAGE!
        values: regex.position,
        message: ErrorMessages.userErrors.employeePosition.valid,
      },
    },

    firstName: {
      type: String,
      required: [true, ErrorMessages.userErrors.firstName.required],
      minlength: [2, ErrorMessages.userErrors.firstName.minLength],
      maxlength: [70, ErrorMessages.userErrors.firstName.maxLength],
    },

    lastName: {
      type: String,
      required: [true, ErrorMessages.userErrors.lastName.required],
      minlength: [2, ErrorMessages.userErrors.lastName.minLength],
      maxlength: [70, ErrorMessages.userErrors.lastName.maxLength],
    },

    mailingAddress: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      default: null,
      minlength: [8, ErrorMessages.userErrors.password.minLength],
      maxlength: [60, ErrorMessages.userErrors.password.maxLength],
      select: false,
    },

    passwordChangedAt: Date,

    passwordResetToken: String,

    passwordResetExpires: Date,
    performance: {
      _id: false,
      type: {
        absences: {
          type: Number,
          default: 0,
          min: 0,
        },

        lates: {
          type: Number,
          default: 0,
          min: 0,
        },

        ncns: {
          type: Number,
          default: 0,
          min: 0,
        },

        totalHours: {
          type: Number,
          default: 0,
          min: 0,
        },
      },

      default: {
        absences: 0,
        lates: 0,
        ncns: 0,
        totalHours: 0,
      },
    },

    phoneNumber: {
      type: Number,
      default: null,
      validate: {
        validator: (val) => regex.phoneNumber.test(val),
        message: ErrorMessages.userErrors.phoneNumber.valid,
      },
    },

    preferredName: {
      type: String,
      default: null,
      minlength: [2, ErrorMessages.userErrors.preferredName.minLength],
      maxlength: [70, ErrorMessages.userErrors.preferredName.maxLength],
    },

    employeePicture: {
      type: String,
    },

    terrainLimit: {
      type: Number,
      default: 0,
      min: 0,
      max: 6,
    },

    uniqueCode: {
      type: String,
      default: undefined,
      required: false,
      select: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Index any fields that might need it (i.e. search a user on the front-end). Better performance. Think of it as a book
schema.index({
  email: 'text',
});

// DOCUMENT MIDDLEWARES
// --- salt password
// Using non-arrow function since it has access to the `User` model with `this`
schema.pre('save', async function (next) {
  // Only hash the password if it has been modified or new
  if (!this.isModified('password')) {
    return next();
  }

  // If it is undefined for whatever reason
  if (!this.password) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  return next();
});

// --- update the date if the password changed
schema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// INSTANCE METHODS
// --- check for correct password
schema.methods.correctPassword = async function (givenPassword, userPassword) {
  return await bcrypt.compare(givenPassword, userPassword);
};

// --- create password reset
schema.methods.createPasswordResetToken = function (expMin) {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpires = Date.now() + expMin * 60 * 1000;

  return resetToken;
};

// VIRTUALS
// --- add role of type 'internal' or 'external'
schema.virtual('roleType').get(function (): TRoleType {
  const internal = regex.position.filter(
    (pos) => pos === 'Administrator' || pos === 'Manager' || pos === 'Superuser' || pos === 'Supervisor'
  );
  const external = regex.position.filter(
    (pos) => pos === 'Attendant' || pos === 'Foreman' || pos === 'Operator' || pos === 'Relief'
  );

  return internal.includes(this.employeePosition)
    ? 'internal'
    : external.includes(this.employeePosition)
    ? 'external'
    : 'any';
});

export default mongoose.model('User', schema);
