import { FC, useState } from "react";
import {
  CheckBox,
  MainContainer,
  PopOut,
  SortBy,
  SortContainer,
  SortOptionContainer,
} from "./styles";

interface IFilter {
  setSortOption: Function;
  setSortType: Function;
  sortType: string;
  sortOption: string;
}

const Filter: FC<IFilter> = ({
  setSortOption,
  setSortType,
  sortType,
  sortOption,
}) => {
  const [openPopout, setOpenPopout] = useState(false);

  return (
    <MainContainer onClick={() => setOpenPopout(!openPopout)}>
      <PopOut openPopOut={openPopout} onClick={(e) => e.stopPropagation()}>
        <SortOptionContainer>
          <SortBy>
            <CheckBox
              onClick={() => setSortOption("firstName")}
              sortOption={sortOption}
              option={"firstName"}
            />
            <span>First Name</span>
          </SortBy>
          <SortBy>
            <CheckBox
              onClick={() => setSortOption("lastName")}
              sortOption={sortOption}
              option={"lastName"}
            />
            <span>Last Name</span>
          </SortBy>
        </SortOptionContainer>
        <SortContainer
          onClick={() => setSortType("A-Z")}
          sortType={sortType}
          type={"A-Z"}
        >
          <span>A - Z</span>
        </SortContainer>
        <SortContainer
          onClick={() => setSortType("Z-A")}
          sortType={sortType}
          type={"Z-A"}
        >
          <span>Z - A</span>
        </SortContainer>
      </PopOut>
    </MainContainer>
  );
};

export default Filter;
