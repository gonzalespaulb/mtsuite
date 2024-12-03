import { IFile } from './misc';

interface ILogin {
  email: string;
  password: string;
}

interface IAdmin {
  email: string;
  employeePosition: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
  photo?: IFile | null;
  preferredName?: string | null;
}

interface IOnboarding {
  availableDays?: string[] | null;
  email: string;
  employeeId: string;
  employeePosition?: string | null;
  firstName: string;
  lastName: string;
  mailingAddress: string;
  performance?: {
    absences?: number;
    lates?: number;
    ncns?: number;
    totalHours?: number;
  };
  phoneNumber: string;
  photo?: IFile | null;
  preferredName?: string | null;
  terrainLimit?: number;
}

interface IResetPassword {
  password: string;
  uniqueCode: string;
}

interface IForgotPassword {
  email: string;
}

export { IAdmin, ILogin, IOnboarding, IResetPassword, IForgotPassword };
