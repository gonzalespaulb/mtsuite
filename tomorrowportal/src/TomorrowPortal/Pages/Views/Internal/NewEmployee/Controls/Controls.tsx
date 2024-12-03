import {
  Cancel,
  CancelText,
  ControlsContainer,
  CreateEmployee,
  CreateEmployeeText,
  MainContainer,
  Percentage,
  Progress,
  ProgressBar,
  ProgressContainer,
} from "./styles";
import { ContentValues } from "../../../../../utils/enums";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IControls {
  formPercentage: number;
  setValidateForm: Function;
}

const Controls: FC<IControls> = ({ formPercentage, setValidateForm }) => {
  let navigate = useNavigate();

  const createAction = () => {
    setValidateForm(true);
  };

  return (
    <MainContainer>
      <ProgressContainer>
        <ProgressBar>
          <Progress formPercent={formPercentage} />
        </ProgressBar>
        <Percentage>{formPercentage}%</Percentage>
      </ProgressContainer>
      <ControlsContainer>
        <Cancel
          onClick={() => navigate(ContentValues.Employees)}
        >
          <CancelText>Cancel</CancelText>
        </Cancel>
        <CreateEmployee onClick={createAction}>
          <CreateEmployeeText>Create Employee</CreateEmployeeText>
        </CreateEmployee>
      </ControlsContainer>
    </MainContainer>
  );
};

export default Controls;
