import mongoose, { Model } from 'mongoose';

import ErrorMessages from '@src/constants/ErrorMessages';
import * as regex from '@src/util/regex';
import * as DesginationTypes from '@src/types/designation.types';

// **** Types ****//
type TDesignationModel = Model<Omit<DesginationTypes.IDesignation, 'id' | 'createdAt' | 'updatedAt'>, {}>;

// **** Schema ****//
const schema = new mongoose.Schema<
  Omit<DesginationTypes.IDesignation, 'id' | 'createdAt' | 'updatedAt'>,
  TDesignationModel
>(
  {
    designation: {
      type: String,
      required: [true, ErrorMessages.designationErrors.designation.required],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    startTimes: {
      type: [String],
      required: [true, ErrorMessages.designationErrors.startTimes.required],
    },

    locations: {
      type: [
        {
          _id: false,
          designation: {
            type: String,
            required: [true, ErrorMessages.designationErrors.locations.location.required],
          },
          positions: {
            type: [
              {
                _id: false,
                position: {
                  type: [
                    {
                      _id: false,
                      type: String,
                      enum: {
                        values: regex.position,
                        message: ErrorMessages.designationErrors.locations.positions.position.valid,
                      },
                    },
                  ],
                  required: [true, ErrorMessages.designationErrors.locations.positions.position.required],
                  default: [],
                },
                startTime: {
                  type: String,
                  required: [true, ErrorMessages.designationErrors.locations.positions.startTime.required],
                },
              },
            ],
            required: [true, ErrorMessages.designationErrors.locations.positions.required],
          },
          terrain: {
            type: String,
            required: [true, ErrorMessages.designationErrors.locations.terrain.required],
          },
        },
      ],
      required: [true, ErrorMessages.designationErrors.locations.required],
    },
  },
  { timestamps: true }
);

schema.index({
  name: 'text',
});

export default mongoose.model('Designation', schema);
