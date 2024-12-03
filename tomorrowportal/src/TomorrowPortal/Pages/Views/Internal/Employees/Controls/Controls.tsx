import { ContentValues } from "../../../../../utils/enums";
import Analytics from "./Analytics/Analytics";
import Download from "./Download/Download";
import Filter from "./Filter/Filter";
import {
  MainContainer,
  FilterBtnsContainer,
  NewEmployeeBtn,
} from "./styles";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search/Search";

interface ICustomShift {
  date: string;
  isActive: boolean;
  note: string;
  id: string;
}

interface IUser {
  firstName: any;
  lastName: any;
  preferredName: any;
  employeePosition: any;
  employeeId: any;
  email: any;
  mailingAddress: any;
  phoneNumber: any;
  terrainLimit: any;
  availableDays: any[];
  employeePicture: any;
  isActive?: boolean;
  customShifts: ICustomShift[];
}


interface IControls {
  activeCount: number;
  inactiveCount: number;
  setFilterType: Function;
  setSortOption: Function;
  setSortType: Function;
  filterType: null | boolean;
  sortType: string;
  sortOption: string;
  employeesToRender: IUser[];
}

const Controls: FC<IControls> = ({
  activeCount,
  inactiveCount,
  setFilterType,
  filterType,
  setSortOption,
  setSortType,
  sortType,
  sortOption,
  employeesToRender,
}) => {
  let navigate = useNavigate();

  return (
    <MainContainer>
      <FilterBtnsContainer>
        <Analytics
          activeCount={activeCount}
          inactiveCount={inactiveCount}
          setFilterType={setFilterType}
          filterType={filterType}
        />
        <Filter setSortOption={setSortOption} setSortType={setSortType} sortType={sortType} sortOption={sortOption}/>
        <Download employeesToRender={employeesToRender}/>
        <Search />
      </FilterBtnsContainer>
      <NewEmployeeBtn onClick={() => navigate(ContentValues.NewEmployee)} />
    </MainContainer>
  );
};

export default Controls;
