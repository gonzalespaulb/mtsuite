import { FC } from "react";
import { BORDERED, SOLID } from "./styles";

interface ControlBtnProps {
  type: string;
  marginLeft?: number | undefined;
  marginBottom?: number | undefined;
  marginTop?: number | undefined;
  marginRight?: number | undefined;
  text: string;
  clickAction?: any;
}

const ControlBtn: FC<ControlBtnProps> = ({
  type,
  text,
  clickAction,
  marginLeft,
  marginRight,
  marginBottom,
  marginTop,
}) => {
  const marginConfig = {
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
  };

  const renderBtns = (btnText: string) => {
    switch (type) {
      case "SOLID":
        return (
          <SOLID marginConfig={marginConfig} onClick={() => clickAction()}>
            <span>{btnText}</span>
          </SOLID>
        );
      case "BORDERED":
        return (
          <BORDERED marginConfig={marginConfig} onClick={() => clickAction()}>
            <span>{btnText}</span>
          </BORDERED>
        );
    }
  };
  return <>{renderBtns(text)}</>;
};

export default ControlBtn;
