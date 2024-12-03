import { MainContainer } from "./styles";
import EmployeeCard from "./EmployeeCard";
import { FC } from "react";
import Loader from "../../../Common/Loader/Loader";

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

interface IContent {
  employeesToRender: IUser[];
  isLoading: boolean;
} 

const Content: FC<IContent> = ({ employeesToRender, isLoading }) => {


  const daysCheck = (day: string) => {

    const availableEmployees = employeesToRender.map((employee) => {
      if(!employee.isActive) return;

      if(employee.availableDays.includes(day)) {
        return `${employee.lastName} ${employee.firstName}`
      }
      
    }).filter((item) => item !== undefined);

    console.log(availableEmployees);
  }          
 
  const allEmails = employeesToRender.filter((employee) => {  
    if(employee.availableDays.length > 0 && employee.isActive) return employee;
  })

  console.log(allEmails.map((employee) => employee.email));

  const renderEmployees = () => {
    return employeesToRender?.map((employee: any, i: number) => {
      return <EmployeeCard key={i} employee={employee} employeeIndex={i} />;
    }); 
  };

  return <MainContainer>{isLoading ? <Loader/> : renderEmployees()}</MainContainer>;
};

export default Content;
