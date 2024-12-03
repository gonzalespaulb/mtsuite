import { FC } from "react";
import {
  FilledIndicator,
  Item,
  ItemName,
  Label,
  MainContainer,
} from "./styles";

interface ICheckList {
  stateList: any[];
  stopIndex: number;
  checkListName: string;
}

const CheckList: FC<ICheckList> = ({ checkListName, stateList, stopIndex }) => {
  const listToRender = stateList.slice().splice(stopIndex);

  const renderList = () => {
    return listToRender.map((listItem, i) => {
      return (
        <Item key={i}>
          <FilledIndicator isFilled={listItem.isFilled} />
          <ItemName>{listItem.inputName}</ItemName>
        </Item>
      );
    });
  };

  return (
    <MainContainer>
      <Label>{checkListName}</Label>
      {renderList()}
    </MainContainer>
  );
};

export default CheckList;
