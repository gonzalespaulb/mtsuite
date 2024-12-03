// NOTE ---------------------------------------------------- MISSING FIELDS

export const missingFields =
  "Please make sure all fields are filled before submitting.";

// NOTE ---------------------------------------------------- CREATE EMPLOYEE SUCCESS

export const createEmployeeSuccess = (firstName: string, lastName: string) =>
  `Employee profile for ${firstName} ${lastName} has been created.`;

// NOTE ---------------------------------------------------- DELETE WARNING

export const deleteWarning = {
  warning: `Warning! Deleting this employee's profile will remove all related
    data and cannot be undone.`,
  btnText: `Yes, delete employee profile.`,
};

// NOTE ---------------------------------------------------- EDIT DISCARD WARNING

export const editDiscardWarning = {
  warning: `Warning! All unsaved changes will be discarded.`,
  btnText: `Yes, discard changes.`,
};
