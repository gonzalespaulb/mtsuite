import { MainContainer } from "./styles";
import Controls from "./Controls/Controls";
import Content from "./Content/Content";
import { useEffect, useState } from "react";
import { NavBar } from "../common";
import { useEmployees } from "../../../../redux/hooks/user";
import { useGetAllEmployeesQuery } from "../../../../redux/api/userApi";
import { useDispatch } from "react-redux";
import SideNav from "../common/SideNav/SideNav";
import Loader from "../../Common/Loader/Loader";

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

const Employees = () => {
  const dispatch = useDispatch();

  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [allEmployees, setAllEmployees] = useState<IUser[]>([]);
  const [employeesToRender, setEmployeesToRender] = useState<IUser[]>([]);
  const [filterType, setFilterType] = useState(null);
  const [sortType, setSortType] = useState("A-Z");
  const [sortOption, setSortOption] = useState("lastName");

  const {data, isFetching } = useEmployees();
  const fetchedEmployees = data?.data || [];

  const { refetch } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (fetchedEmployees) {
      countEmployees();
      setEmployeesToRender(fetchedEmployees);
      setAllEmployees(fetchedEmployees);
    }
  }, [fetchedEmployees]);

  useEffect(() => {
    refetch();
  }, [dispatch]);

  const countEmployees = () => {
    const activeEmployees = fetchedEmployees.filter(
      (employee: any) => employee.isActive
    ).length;
    const inActiveEmployees = fetchedEmployees.filter(
      (employee: any) => !employee.isActive
    ).length;
    setActiveCount(activeEmployees || 0);
    setInactiveCount(inActiveEmployees || 0);
  };

  const filterByStatus = (status: boolean | null) => {
    let currentList = allEmployees.slice();
    let newList: IUser[] = [];

    if (status === null) return allEmployees;

    for (const employee of currentList) {
      if (employee.isActive === status) {
        newList.push(employee); 
      }
    }

    return newList;
  };

  const sortAlphabetically = (arrToSort: IUser[]) => {
    if (sortOption === "lastName") {
      if (sortType === "Z-A") {
        const sortedDataDescending = arrToSort.sort((a, b) =>
          b.lastName.localeCompare(a.lastName)
        );

        return sortedDataDescending;
      }
      if (sortType === "A-Z") {
        const sortedData = arrToSort.sort((a, b) =>
          a.lastName.localeCompare(b.lastName)
        );
        return sortedData;
      }
    }

    if (sortType === "Z-A") {
      const sortedDataDescending = arrToSort.sort((a, b) =>
        b.firstName.localeCompare(a.firstName)
      );
      return sortedDataDescending;
    }
    if (sortType === "A-Z") {
      const sortedData = arrToSort.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );

      return sortedData;
    }
  };

  useEffect(() => {
    let updatedList = filterByStatus(filterType);
    setEmployeesToRender(updatedList);
  }, [filterType]);

  const [openDropDown, setOpenDropDown] = useState(false);

  return (
    <MainContainer>
      <NavBar setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <SideNav setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <Controls
        activeCount={activeCount}
        inactiveCount={inactiveCount}
        setFilterType={setFilterType}
        filterType={filterType}
        setSortType={setSortType}
        setSortOption={setSortOption}
        sortType={sortType}
        sortOption={sortOption}
        employeesToRender={sortAlphabetically(employeesToRender.slice()) || []}
      />
      <Content
        employeesToRender={sortAlphabetically(employeesToRender.slice()) || []}
        isLoading={isFetching}
      />
    </MainContainer>
  );
};

export default Employees;
