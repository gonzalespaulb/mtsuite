import { FC, useState } from "react";
import {
  AddBtn,
  AddIcon,
  BtnGroup,
  ConfirmBtn,
  ConfirmIcon,
  Label,
  MainContainer,
  RemoveBtn,
  SelectionBtn,
  TypeInBtn,
  TypeInput,
} from "./styles";
import closeSecondary from "../../../../assets/closeSecondary.png";
import checkSecondary from "../../../../assets/checkSecondary.png";

interface IStateProfile {
  inputName: string | undefined;
  setFunc: any;
  state: any;
}

interface ITypeToSelectionInput {
  stateProfile: IStateProfile;
}

const TypeToSelectionInput: FC<ITypeToSelectionInput> = ({ stateProfile }) => {
  const { inputName, setFunc, state } = stateProfile;

  const [runAnimation, setRunanimation] = useState(false);
  const [time, setTime] = useState<string>("");
  const [btnToRemove, setBtnToRemove] = useState<number | null>();

  // NOTE ------------------------------------------------------------------------------ REMOVE SELECTION BTN

  const removeBtn = (index: number) => {
    const newList = state.slice();
    newList.splice(index, 1);
    setFunc(newList);
  };

  // NOTE ------------------------------------------------------------------------------ RENDER SELECTION BTN

  const renderSelectionBtns = () => {
    return state?.map((time: any, i: number) => {
      return (
        <SelectionBtn
          key={i}
          onMouseEnter={() => setBtnToRemove(i)}
          onMouseLeave={() => setBtnToRemove(null)}
        >
          <RemoveBtn
            isRemoving={btnToRemove === i}
            onClick={() => removeBtn(i)}
          />
          <span>{time}</span>
        </SelectionBtn>
      );
    });
  };

  // NOTE ------------------------------------------------------------------------------ CONFIRM BTN CREATION

  const confirm = () => {
    setRunanimation(false);

    if (!time || time === "") return;

    setFunc([...state, time]);
    setTime("");
  };

  return (
    <MainContainer>
      <Label>{inputName}</Label>

      <BtnGroup>
        <TypeInBtn>
          <AddBtn
            runAnimation={runAnimation}
            onClick={() => setRunanimation(!runAnimation)}
          >
            <AddIcon iconUrl={closeSecondary} runAnimation={runAnimation} />
          </AddBtn>
          <TypeInput
            placeholder="00:00 XX"
            runAnimation={runAnimation}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <ConfirmBtn runAnimation={runAnimation} onClick={confirm}>
            <ConfirmIcon iconUrl={checkSecondary} />
          </ConfirmBtn>
        </TypeInBtn>
        {renderSelectionBtns()}
      </BtnGroup>
    </MainContainer>
  );
};

export default TypeToSelectionInput;
