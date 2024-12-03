import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import {
  Icon,
  IconMessageContainer,
  Message,
  Timeout,
  TimeoutBar,
  ToastContainer,
} from "./styles";
import { useDispatch } from "react-redux";
import { clearToastList } from "../../../../../redux/NotificationSlice";

interface IToast {
  status: string;
  message: string;
  toastId: number;
}

const Toast: FC<IToast> = ({ status, message, toastId }) => {
  const dispatch = useDispatch();

  const { toastList } = useSelector(
    (state: RootState) => state?.notificationControls
  );

  useEffect(() => {
    if (!runAnimation) {
      setRunAnimation(true);

      setTimeout(() => {
        setRunAnimation(false);
        if (toastId === toastList.length + 1) {
          dispatch(clearToastList());
        }
        setTimeout(() => {
          setDisplayToast(false);
        }, 300);
      }, 4800);
    }
  }, [toastList]);

  const [runAnimation, setRunAnimation] = useState(false);
  const [displayToast, setDisplayToast] = useState(true);

  return (
    <ToastContainer runAnimation={runAnimation} displayToast={displayToast}>
      <IconMessageContainer>
        <Icon status={status} />
        <Message>{message}</Message>
      </IconMessageContainer>
      <TimeoutBar>
        <Timeout runAnimation={runAnimation} />
      </TimeoutBar>
    </ToastContainer>
  );
};

export default Toast;
