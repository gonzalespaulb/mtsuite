import { FC, useEffect } from "react";
import {
  MainContainer,
  ConfirmationContainer,
  HeadingContainer,
  Heading,
  CloseBtn,
  ContentContainer,
  WarningContainer,
  ConfirmBtn,
  ConfirmText,
  Warning,
} from "./styles";
import { useState } from "react";
import { useDelete } from "../../../../../redux/hooks/user/useDelete";
import { deleteWarning, editDiscardWarning } from "../../../../../utils/messages";

interface IWarningType {
  warning: string;
  btnText: string;
}

interface IConfirmation {
  setTriggerConfirmation: Function;
  warningType: IWarningType;
  deleteEmployeeId?: string | undefined;
  cancelEdit?: Function;
}

const Confirmation: FC<IConfirmation> = ({
  setTriggerConfirmation,
  warningType,
  deleteEmployeeId,
  cancelEdit,
}) => {
  useEffect(() => {
    setRunAnimation(true);
  }, []);
  const { deleteUser } = useDelete();

  const [runAnimation, setRunAnimation] = useState<boolean>(false);

  const closeConfirmation = () => {
    setRunAnimation(false);
    setTimeout(() => {
      setTriggerConfirmation(false);
    }, 700);
  };

  // NOTE --------------------------------------- CONFIRMATION ACTIONS

  const deleteEmployee = () => {
    deleteUser(deleteEmployeeId ?? "0");
  };

  const discardEdit = () => {
    closeConfirmation();
    if(cancelEdit) cancelEdit();
  }

  const confirmationAction = () => {
    switch(warningType) {
      case warningType = deleteWarning: 
      deleteEmployee();
      break;
      case warningType = editDiscardWarning: 
      discardEdit();
      break;
    }
  }

  return (
    <MainContainer runAnimation={runAnimation}>
      <ConfirmationContainer runAnimation={runAnimation}>
        <HeadingContainer>
          <Heading>Are you sure?</Heading>
          <CloseBtn onClick={closeConfirmation} />
        </HeadingContainer>
        <ContentContainer>
          <WarningContainer>
            <Warning>{warningType.warning}</Warning>
          </WarningContainer>
          <ConfirmBtn onClick={confirmationAction}>
            <ConfirmText>{warningType.btnText}</ConfirmText>
          </ConfirmBtn>
        </ContentContainer>
      </ConfirmationContainer>
    </MainContainer>
  );
};

export default Confirmation;
