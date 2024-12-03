import { FC, useState } from "react";
import {
  DropDownBtn,
  DropDownContainer,
  Item,
  ItemIndicator,
  ItemSelectionContainer,
  ItemText,
  Label,
  MainContainer,
  SelectedItem,
  SelectedItemContainer,
} from "./styles";

interface IStateProfile {
  inputName: string;
  state: any;
  setFunc: Function;
}

interface IDropDown {
  itemArr: any[];
  stateProfile: IStateProfile;
}

const DropDown: FC<IDropDown> = ({ itemArr, stateProfile }) => {
  const { inputName, setFunc, state } = stateProfile;

  const [openDropdown, setOpenDropDown] = useState(false);

  const renderSelectionItems = () => {
    return itemArr.map((item, i) => {
      const selectItem = () => {
        setFunc(item);
        setOpenDropDown(false);
      };
      return (
        <Item key={i} onClick={selectItem}>
          <ItemText>{item}</ItemText>
          <ItemIndicator itemName={item} selectedItem={SelectedItem} />
        </Item>
      );
    });
  };

  return (
    <MainContainer>
      <Label>{inputName}</Label>
      <DropDownContainer openDropdown={openDropdown}>
        <DropDownBtn onClick={() => setOpenDropDown(!openDropdown)} />
        <SelectedItemContainer>
          <SelectedItem>{state}</SelectedItem>
        </SelectedItemContainer>
        <ItemSelectionContainer>
          {renderSelectionItems()}
        </ItemSelectionContainer>
      </DropDownContainer>
    </MainContainer>
  );
};

export default DropDown;
