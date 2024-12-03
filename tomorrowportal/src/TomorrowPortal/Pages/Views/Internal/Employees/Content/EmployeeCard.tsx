import { FC, useState } from "react";
import {
  Card,
  Email,
  EmailContainer,
  EmailIcon,
  EmployeeId,
  IdStatusContainer,
  InformationContainer,
  Name,
  NameContainer,
  Phone,
  PhoneContainer,
  PhoneIcon,
  ProfilePicture,
  Status,
  StatusContainer,
} from "./styles";
import phone from "./assets/phone.png";
import email from "./assets/email.png";
import { setCurrentEmployee } from "../../../../../redux/ContentSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ContentValues } from "../../../../../utils/enums";


  interface IPerformanceStats {
    totalHours: number;
    lates: number;
    absences: number;
    ncns: number;
  }
  
  interface IStation {
    name: string;
    station: string[];
  }

  interface ICustomShift {
    date: string;
    isActive: boolean;
    note: string;
    id: string;
  }
  
  interface IEmployee {
    firstName: string;
    lastName: string;
    preferredName: string;
    employeeId: string;
    isActive: boolean;
    email: string;
    mailingAddress: string;
    employeePicture: string;
    employeePosition: string;
    phoneNumber: string;
    availableDays: string[];
    terrainLimit: number;
    liftsWorked: IStation[];
    performance: IPerformanceStats;
    customShifts: ICustomShift[];
  }
  
  export interface IEmployeeCard {
    employee: IEmployee;
    employeeIndex: number;
  }

const EmployeeCard: FC<IEmployeeCard> = ({ employee }) => {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [cardHover, setCardHover] = useState<boolean>(false);

  return (
    <Card 
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
      onClick={() => {
        dispatch(setCurrentEmployee(employee))
        navigate(ContentValues.EmployeeDetail)
      }}
      cardHover={cardHover}
    >
      <IdStatusContainer>
        <EmployeeId>{employee.employeeId}</EmployeeId>
        <StatusContainer isActive={employee.isActive}>
          <Status>{employee.isActive ? "Active" : "Inactive"}</Status>
        </StatusContainer>
      </IdStatusContainer>

      <ProfilePicture
        employeePicture={employee.employeePicture}
      />
      <InformationContainer>
        <NameContainer>
          <Name>{employee.firstName} {employee.lastName}</Name>
        </NameContainer>
        <EmailContainer>
          <EmailIcon icon={email} />
          <Email>{employee.email}</Email>
        </EmailContainer>
        <PhoneContainer>
          <PhoneIcon icon={phone} />
          <Phone>{employee.phoneNumber}</Phone>
        </PhoneContainer>
      </InformationContainer>
    </Card>
  );
};

export default EmployeeCard;
