import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { sendNewEmployeePayload } from '../../PayloadSlice';
import { useOnboardingMutation } from '../../api/authApi';
import { addToast } from '../../NotificationSlice';
import { FAIL, SUCCESS } from "../../../utils/status";
import { useNavigate } from 'react-router-dom';
import { ContentValues } from '../../../utils/enums';
import { IOnboardingRequest, IOnboardingResponse } from './types';

// NOTE --------------------------------------------------------------------------------------- INTERFACE

// interface IOnboardingResponse {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: string;
// }

// interface IUser {
//   firstName: any;
//   lastName: any;
//   preferredName: any;
//   employeePosition: any;
//   employeeId: any;
//   email: any;
//   mailingAddress: any;
//   phoneNumber: any;
//   terrainLimit: any;
//   availableDays: any[];
//   employeePicture: any;
//   isActive?: boolean;
// }

// NOTE --------------------------------------------------------------------------------------- INTERFACE

export type TUseOnboardingHook = () => {
  onboarding: (data: IOnboardingRequest['data']) => Promise<void>,
  isLoading: boolean;
  data: IOnboardingResponse | undefined;
}


export const useOnboarding: TUseOnboardingHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // BROKEN ------------------------------------------------------------- IS LOADING IS NOT WORKING

  const [onboarding, {isLoading, data}] = useOnboardingMutation();

  const onboardUser = useCallback(
    async (newEmployeeData: IOnboardingRequest['data']) => {
      try {
        const onboardingData = await onboarding({data: newEmployeeData}).unwrap();
        console.log('ONBOARDING DATA: ', onboardingData);

        const successMessage = {
          status: SUCCESS,
          message: onboardingData?.data ?? '',
        }

        dispatch(sendNewEmployeePayload(newEmployeeData));
        dispatch(addToast(successMessage))
        navigate(ContentValues.Employees);
        
        // NOTE: Store in localStorage later
      } catch (err) {
        console.log(err);
        const e = err as {
          data: IOnboardingResponse;
        }
        const failMessage = {
          status: FAIL,
          message: e?.data?.error ?? '' ,
        }

        dispatch(addToast(failMessage))
      }
    }, [onboarding, dispatch, isLoading, data]
  );

  return {onboarding: onboardUser, isLoading, data}
}
