import { FC } from "react";
import {
    Cancel,
  ConfirmBtn,
  Input,
  MainContainer,
  WarningContainer,
  WarningMessage,
} from "./styles";

interface IDeleteConfirm {
  warningMessage: string;
  placeholder: string;
  toastMessage: string;
  valueToConfirm: string;
}

const DeleteConfirm: FC<IDeleteConfirm> = ({
  warningMessage,
  placeholder,
  toastMessage,
  valueToConfirm,
}) => {
  return (
    <MainContainer>
      <WarningContainer>
        <span>WARNING!</span>
        <WarningMessage>
          {warningMessage}
        </WarningMessage>
      </WarningContainer>
      <Input placeholder={placeholder} />
      <Cancel>
        <span>CANCEL</span>
      </Cancel>
      <ConfirmBtn>
        <span>DELETE {valueToConfirm.toUpperCase()}</span>
      </ConfirmBtn>
    </MainContainer>
  );
};

export default DeleteConfirm;
