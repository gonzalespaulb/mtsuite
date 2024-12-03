import { FC } from "react";
import { Label, MainContainer, Input } from "./styles";

interface IStateProfile {
    inputName: string | undefined;
  setFunc: Function | undefined;
  state: any;
}

interface ITypeInput {
  stateProfile: IStateProfile;
  placeholder?: string;
}

const TypeInput: FC<ITypeInput> = ({ stateProfile, placeholder }) => {
  
  const { inputName, setFunc, state } = stateProfile;

  return (
    <MainContainer>
      <Label>{inputName}</Label>
      <Input onChange={(e) => setFunc?.(e.target.value)} value={state} placeholder={placeholder}/>
    </MainContainer>
  );
};

export default TypeInput;
