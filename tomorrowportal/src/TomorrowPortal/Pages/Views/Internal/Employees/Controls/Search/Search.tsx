import { useState } from "react";
import {
  Category,
  DownChevron,
  IconContainer,
  Input,
  MainContainer,
} from "./styles";

const Search = () => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <MainContainer openSearch={openSearch}>
      <IconContainer
        onClick={(e) => {
          e.stopPropagation();
          setOpenSearch(!openSearch);
        }}
        openSearch={openSearch}
      />
      <Input openSearch={openSearch} />
      <Category openSearch={openSearch}>
        <span>FIRST NAME</span>
        <DownChevron />
      </Category>
    </MainContainer>
  );
};

export default Search;
