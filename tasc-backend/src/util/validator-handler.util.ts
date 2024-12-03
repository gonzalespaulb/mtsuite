import { NextFunction } from 'express';
import Ajv, { JSONSchemaType, Schema } from 'ajv';
import ajvErrors from 'ajv-errors';
import validator from 'validator';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AppError } from '@src/other/classes';
import * as regex from '@src/util/regex';

// **** Types **** //
interface IValidatorReturn {
  verify: (data: any, next: NextFunction) => any;
}

// **** Validations **** //
const ajv = new Ajv({ allErrors: true, $data: true });

ajv.addKeyword({
  keyword: 'validateAddress',
  validate: (_, data) => regex.mailingAddress.test(data),
});
ajv.addKeyword({
  keyword: 'validateAvailability',
  validate: (_, data) => {
    if (!data || !data.length) {
      return true;
    }

    const validChecker = {};

    regex.availability.forEach((available) => {
      validChecker[available] = true;
    });

    for (let i = 0; i < data.length; i++) {
      if (!validChecker[data[i]]) {
        return false;
      }
    }

    return true;
  },
});
ajv.addKeyword({
  keyword: 'validateUniqueCode',
  validate: (_, data) => regex.uniqueCode.test(data),
});
ajv.addKeyword({
  keyword: 'validateEmail',
  validate: (_, data) => validator.isEmail(data ?? ''),
});
ajv.addKeyword({
  keyword: 'validatePassword',
  validate: (_, data) => validator.isStrongPassword(data ?? ''),
});
ajv.addKeyword({
  keyword: 'validatePhone',
  validate: (_, data) => regex.phoneNumber.test(data),
});
ajv.addKeyword({
  keyword: 'validatePosition',
  validate: (_, data) => regex.position.includes(data),
});
ajv.addKeyword({
  keyword: 'validateMultiPositions',
  validate: (_, data) => {
    if (!data || !data.length) {
      return true;
    }

    const validChecker = {};

    regex.position.forEach((position) => {
      validChecker[position] = true;
    });

    for (let i = 0; i < data.length; i++) {
      if (!validChecker[data[i]]) {
        return false;
      }
    }

    return true;
  },
});
ajv.addKeyword({
  keyword: 'validateId',
  validate: (_, data) => validator.isMongoId(data),
});

ajvErrors(ajv);

export default <T = unknown>(schema: Schema | JSONSchemaType<T>): IValidatorReturn => {
  const validate = ajv.compile(schema);

  const verify = (data: any, next: NextFunction): any => {
    const isValid = validate(data);

    if (!isValid) {
      const errMessages = validate.errors?.map((err) => err.message ?? '') ?? [];
      const instancePaths = validate.errors?.map((err) => err.instancePath) ?? [];

      const nonDuplicateErrMessages = [...new Set(errMessages)];

      if (data?.locations && data?.locations?.length) {
        const designations: string[] = [];

        data.locations.forEach((loc, locIndex) => {
          if (loc?.designation && loc?.designation.length) {
            if (instancePaths.length) {
              instancePaths.forEach((inst) => {
                if (inst.includes(`${locIndex}/terrain`)) {
                  designations.push(loc.designation);
                }
              });
            }
          }
        });

        let terrainWithDesignationsErrorMessage = '';

        if (designations.length) {
          terrainWithDesignationsErrorMessage = 'for ';

          designations.forEach((designation, index) => {
            if (index === designations.length - 1 && index !== 0) {
              if (designations.length === 2) {
                terrainWithDesignationsErrorMessage += ' ';
              }

              terrainWithDesignationsErrorMessage += 'and ';
            }

            terrainWithDesignationsErrorMessage += designation;

            if (index !== designations.length - 1 && designations.length !== 2) {
              terrainWithDesignationsErrorMessage += ', ';
            }
          });
        }

        if (nonDuplicateErrMessages.length && terrainWithDesignationsErrorMessage.length) {
          nonDuplicateErrMessages.forEach((message, index) => {
            if (message.includes('terrain')) {
              nonDuplicateErrMessages[index] = `${message} ${terrainWithDesignationsErrorMessage}`;
            }
          });
        }
      }

      throw next(new AppError(HttpStatusCodes.BAD_REQUEST, nonDuplicateErrMessages.join('. ')));
    }

    return data;
  };

  return { verify };
};
