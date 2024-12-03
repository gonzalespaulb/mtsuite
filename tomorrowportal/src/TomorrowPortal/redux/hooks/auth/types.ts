type TPosition =
  | "Administrator"
  | "Attendant"
  | "Foreman"
  | "Manager"
  | "Operator"
  | "Relief"
  | "Supervisor"
  | "Superuser";

interface IResponse {
  status: string;
  success: boolean;
  error?: string;
}

// LOGIN
interface ILogin {
  email: string;
  password: string;
}
export interface ILoginRequest {
  data: ILogin;
}

export interface ILoginResponse extends IResponse {
  data?: string;
  token: string;
}

// LOGOUT
export interface ILogoutResponse extends IResponse {
  data?: string;
}

// ONBOARDING
export interface IOnboarding {
  firstName: string;
  lastName: string;
  preferredName: string;
  employeePosition: TPosition | string;
  employeeId: string;
  email: string;
  mailingAddress: string;
  phoneNumber: string;
  terrainLimit: number;
  availableDays: string[];
  employeePicture: any;
}

export interface IOnboardingRequest {
  data: IOnboarding;
}

export interface IOnboardingResponse extends IResponse {
  data?: string;
}

// RESET PASSWORD
export interface IResetPassword {
  password: string;
  uniqueCode: string;
  token: string;
}

export interface IResetPasswordRequest {
  data: IResetPassword;
}

export interface IResetPasswordResponse extends IResponse {
  data?: string;
}

// FORGOT PASSWORD
export interface IForgotPassword {
  email: string;
}

export interface IForgotPasswordRequest {
  data: IForgotPassword;
}

export interface IForgotPasswordResponse extends IResponse {
  data?: string;
}
