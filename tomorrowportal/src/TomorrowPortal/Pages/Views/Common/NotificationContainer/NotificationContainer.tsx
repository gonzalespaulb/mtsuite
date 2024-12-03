import Toast from "./Toast/Toast";
import { MainContainer } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const NotificationContainer = () => {
  const { toastList } = useSelector(
    (state: RootState) => state?.notificationControls
  );

  const renderToastList = () => {
    return toastList.map((notification, i) => {

        const { status, message } = notification;

      return <Toast status={status} message={message} key={i} toastId={i}/>;
    });
  };

  return <MainContainer>{renderToastList()}</MainContainer>;
};

export default NotificationContainer;
