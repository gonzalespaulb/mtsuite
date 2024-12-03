const ErrorMessages = {
  userErrors: {
    availableDays: {
      maxLength: 'Availability should be no more seven days or less',
      type: 'Not a valid availability',
      valid: "Availability should contain five or less of 'SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI' and/or 'SAT'",
    },

    customShifts: {
      required: 'Missing custom shifts requirement',
      type: 'Custom shifts should be an array of objects or object',

      id: {
        required: 'Missing custom shift ID requirement in route parameters',
        type: 'Not a valid type for custom shift ID in route parameters',
        valid: 'Not a valid hex-encoded representation of a MongoDB ObjectID for custom shift ID in route parameters',
      },

      date: {
        required: 'Missing date requirement in custom shifts',
        type: 'Date should be a string in custom shifts',
      },

      isActive: {
        required: 'Missing status requirement in custom shifts',
        type: 'Status should be a boolean in custom shifts',
      },

      note: {
        required: 'Missing note requirement in custom shifts',
        type: 'Note should be a string in custom shifts',
      },
    },

    email: {
      required: 'Missing email requirement',
      type: 'Not a valid email',
      valid: 'Not a valid email',
    },

    employeeId: {
      required: 'Missing employee ID requirement',
      type: 'Not a valid employee ID',
      valid: 'Not a valid employee ID',
    },

    employeePosition: {
      required: 'Missing employee position requirement',
      type: 'Not a valid employee position',
      valid:
        "Employee position should either be 'Administrator', 'Attendant', 'Foreman', 'Manager', 'Operator', 'Relief', or 'Supervisor'",
      validAdmin: "Employee position should either be 'Administrator', 'Manager', or 'Superuser'",
      validOnboarding:
        "Employee position should either be 'Attendant', 'Foreman', 'Operator', 'Relief', or 'Supervisor'",
    },

    firstName: {
      maxLength: 'First name must be 70 characters or less',
      minLength: 'First name must be 2 characters or more',
      required: 'Missing first name requirement',
      type: 'Not a valid first name',
      valid: 'First name must be between 2 to 70 characters',
    },

    isActive: {
      type: 'Not a valid active (only booleans)',
    },

    lastName: {
      maxLength: 'Last name must be 70 characters or less',
      minLength: 'Last name must be 2 characters or more',
      required: 'Missing last name requirement',
      type: 'Not a valid last name',
      valid: 'Last name must be between 2 to 70 characters',
    },

    mailingAddress: {
      required: 'Missing mailing address requirement',
      type: 'Not a valid mailing address',
      valid: 'Not a valid mailing address',
    },

    password: {
      maxLength: 'Password must be 60 characters or less',
      minLength: 'Password must be 8 characters or more',
      required: 'Missing password requirement',
      type: 'Not a valid password',
      valid:
        'Password must be between 8 to 60 characters long with at least one lowercase, one uppercase, one number, and one symbol',
    },

    passwordConfirmation: {
      match: 'Passwords do not match',
      required: 'Missing password confirmation requirement',
      type: 'Not a valid password confirmation',
    },

    performance: {
      required: 'Missing performance requirement',
      type: 'Performance should have any of the following: absences, lates, ncns, and/or totalHours',

      absences: {
        required: 'Missing absences requirement',
        type: 'Not a valid absences',
        valid: 'Absences should be a number',
      },

      lates: {
        required: 'Missing lates are requirement',
        type: 'Not a valid lates',
        valid: 'Lates should be a number',
      },

      ncns: {
        required: 'Missing ncns is requirement',
        type: 'Not a valid ncns',
        valid: 'Ncns should be a number',
      },

      totalHours: {
        required: 'Missing total hours requirement',
        type: 'Not a valid total hours',
        valid: 'Total hours should be a number',
      },
    },

    phoneNumber: {
      maxLength: 'Phone number should only be 10 digits long',
      required: 'Missing phone number is requirement',
      type: 'Not a valid phone number',
      valid: 'Phone number should contain only 10 digits',
    },

    preferredName: {
      maxLength: 'Preferred name must be 70 characters or less',
      minLength: 'Preferred name must be 2 characters or more',
      type: 'Not a valid preferred name',
      valid: 'Preferred name must be between 2 to 70 characters',
    },

    employeePicture: {
      maxLength: 'Picture should be 10MB or less',
      type: 'Not a valid file',
      valid: 'Picture should be JPG, JPEG, or PNG',
    },

    terrainLimit: {
      minLength: 'Terrain limit should be zero or more',
      maxLength: 'Terrain limit should be six or less',
      type: 'Not a valid terrain limit',
      valid: 'Terrain limit should contain a number between 0 to 6',
    },

    uniqueCode: {
      required: 'Missing unique code requirement',
      type: 'Not a valid type for unique code',
      valid: 'Unique code should contain alphanumeric and special symbols that are 10 characters long',
    },
  },

  designationErrors: {
    idRouteParams: {
      required: 'Missing designation ID requirement in route parameters',
      type: 'Not a valid type for designation ID in route parameters',
      valid: 'Not a valid hex-encoded representation of a MongoDB ObjectID for designation ID in route parameters',
    },

    designation: {
      required: 'Missing designation requirement',
      exist: 'This designation already exists',
      type: 'Not a valid type for designation',
    },

    isActive: {
      required: 'Missing is active requirement',
      type: 'Not a valid type for is active',
    },

    startTimes: {
      required: 'Missing start times requirement',
      type: 'Not a valid type for start times',
    },

    locations: {
      required: 'Missing locations requirement',
      type: 'Not a valid type for locations',

      location: {
        required: 'All locations must have at least one location',
        type: 'Not a valid type for location',
        valid: 'Location should be a string',
      },

      name: {
        required: 'All locations must have at least one name',
        type: 'Not a valid type for name',
      },

      positions: {
        required: 'All locations must have at least one position',
        type: 'Not a valid type for positions',

        position: {
          required: 'All locations must have at least one position',
          type: 'Not a valid type for position',
          valid:
            "Position should contain 'Administrator', 'Attendant', 'Foreman', 'Manager', 'Operator', 'Relief', and/or 'Supervisor'",
        },

        startTime: {
          required: 'All locations must have at least one start time',
          type: 'Not a valid type for start time',
        },
      },

      terrain: {
        required: 'Missing terrain requirement',
        type: 'Not a valid type for terrain',
      },
    },
  },

  scheduleErrors: {
    id: {
      required: 'Missing schedule ID requirement in route parameters',
      type: 'Not a valid type for schedule ID in route parameters',
      valid: 'Not a valid hex-encoded representation of a MongoDB ObjectID for schedule ID in route parameters',
    },

    title: {
      required: 'Missing title requirement',
      type: 'Not a valid type for title',
    },

    date: {
      required: 'Missing date requirement',
      type: 'Not a valid type for date',
    },

    createdBy: {
      required: 'Missing created by requirement',
      type: 'Not a valid type for created by',

      employeeId: {
        required: 'Missing employee ID requirement for created by',
        type: 'Not a valid type for employee ID in created by',
      },

      employeePicture: {
        required: 'Missing employee picture requirement for created by',
        type: 'Not a valid type for employee picture in created by',
      },

      preferredName: {
        required: 'Missing preffered name requirement for created by',
        type: 'Not a valid type for preferred name in created by',
      },
    },

    designations: {
      required: 'Missing designations requirement',
      type: 'Not a valid type for designations',

      designation: {
        required: 'All designations must have at least one designation',
        exist: 'This designation already exists',
        type: 'Not a valid type for designation',
      },

      isActive: {
        required: 'Missing is active requirement',
        type: 'Not a valid type for is active',
      },

      startTimes: {
        required: 'All designations must have at least one start time',
        type: 'Not a valid type for start times',
      },

      locations: {
        required: 'All designations must have at least one location',
        type: 'Not a valid type for locations',

        designation: {
          required: 'All locations must have at least one designation',
          type: 'Not a valid type for designation',
          valid: 'Designation should be a string',
        },

        positions: {
          required: 'All locations must have at least one position',
          type: 'Not a valid type for positions',

          position: {
            required: 'All locations must have at least one position',
            type: 'Not a valid type for position',
            valid:
              "Position should contain 'Administrator', 'Attendant', 'Foreman', 'Manager', 'Operator', 'Relief', and/or 'Supervisor'",
          },

          startTime: {
            required: 'All locations must have at least one start time',
            type: 'Not a valid type for start time',
          },
        },

        terrain: {
          required: 'Missing terrain requirement',
          type: 'Not a valid type for terrain',
        },
      },
    },

    assignedEmployees: {
      required: 'Missing assigned employees requirement',
      type: 'Not a valid type for assigned employees',

      employeeId: {
        required: 'Missing employee ID requirement',
        type: 'Not a valid employee ID',
        valid: 'Not a valid employee ID',
      },

      preferredName: {
        required: 'Missing preferred name requirement',
        maxLength: 'Preferred name must be 70 characters or less',
        minLength: 'Preferred name must be 2 characters or more',
        type: 'Not a valid preferred name',
        valid: 'Preferred name must be between 2 to 70 characters',
      },

      position: {
        required: 'Missing position requirement',
        type: 'Not a valid type for position',
        valid:
          "Position should contain 'Administrator', 'Attendant', 'Foreman', 'Manager', 'Operator', 'Relief', and/or 'Supervisor'",
      },

      designation: {
        required: 'Missing designation requirement',
        type: 'Not a valid type for designation',
      },

      location: {
        required: 'Missing location requirement',
        type: 'Not a valid type for location',
      },

      startTime: {
        required: 'Missing start time requirement',
        type: 'Not a valid type start time',
      },

      punchTimes: {
        required: 'Missing punch times requirement',
        type: 'Not a valid type for punch times',

        start: {
          required: 'Missing start requirement',
          type: 'Not a valid type for start',
        },

        end: {
          required: 'Missing end requirement',
          type: 'Not a valid type for end',
        },

        total: {
          required: 'Missing total requirement',
          type: 'Not a valid type for total',
        },
      },

      totalHours: {
        required: 'Missing total hours requirement',
        type: 'Not a valid type for total hours',
      },
    },

    isDraft: {
      required: 'Missing is draft requirement',
      type: 'Is draft should be a boolean',
    },
  },
};

export default Object.freeze(ErrorMessages);
