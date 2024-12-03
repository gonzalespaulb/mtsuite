import { ControlBtn } from "../../common/Btns";
import {
  ControlBtnsContainer,
  MainContainer,
  Percentage,
  Progress,
  ProgressBar,
  ProgressContainer,
} from "./styles";
import { FC } from "react";
import { useNewDesignation } from "../../../../../redux/hooks/designation";
import { useDispatch } from "react-redux";
import { addToast } from "../../../../../redux/NotificationSlice";
import { FAIL } from "../../../../../utils/status";
import { missingFields } from "../../../../../utils/messages";

interface IControls {
  payload: any;
  formPercentage: number;
}

const Controls: FC<IControls> = ({ payload, formPercentage }) => {
  const { onNewDesignation } = useNewDesignation();
  const dispatch = useDispatch();

  const sendAction = () => {
    const readyToSend = formPercentage === 100;

    if (readyToSend) {
      onNewDesignation(payload);
    } else {
      const failMessage = {
        status: FAIL,
        message: missingFields,
      };

      dispatch(addToast(failMessage));
    }
  };

  return (
    <MainContainer>
      <ProgressContainer>
        <ProgressBar>
          <Progress formPercent={formPercentage} />
        </ProgressBar>
        <Percentage>{formPercentage}%</Percentage>
      </ProgressContainer>
      <ControlBtnsContainer>
        <ControlBtn
          type={"SOLID"}
          text={"Create Designation +"}
          clickAction={sendAction}
        />
      </ControlBtnsContainer>
    </MainContainer>
  );
};

export default Controls;
