import { FC, useState } from "react";
import {
  CheckBox,
  DownloadBtn,
  Input,
  MainContainer,
  PopOut,
  ToDownload,
} from "./styles";
import { employeeListToCSV } from "../../../../../../utils/csvTemplates";

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

interface IDownload {
  employeesToRender: IUser[];
}

const Download: FC<IDownload> = ({ employeesToRender }) => {
  const [openPopout, setOpenPopout] = useState(false);
  const [fieldsToDownload, setFieldsToDownload] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const checkboxHandle = (field: string) => {
    setFieldsToDownload((prevFields) => {
      if (prevFields.includes(field)) {
        // If the field is already in the list, remove it
        return prevFields.filter((item) => item !== field);
      } else {
        // If the field is not in the list, add it
        return [...prevFields, field];
      }
    });
  };

  const handleDownload = () => {
    // Implement the logic to download CSV based on selected fields

    const hardcopy = employeesToRender.map((employee) => {
      const formatted = Object.fromEntries(
        Object.entries({
          firstName: fieldsToDownload.includes("firstName")
            ? employee.firstName
            : null,
          lastName: fieldsToDownload.includes("lastName")
            ? employee.lastName
            : null,
          preferredName: fieldsToDownload.includes("preferredName")
            ? employee.preferredName
            : null,
          employeeId: fieldsToDownload.includes("employeeId")
            ? employee.employeeId
            : null,
          email: fieldsToDownload.includes("email") ? employee.email : null,
          availableDays: fieldsToDownload.includes("availableDays")
            ? employee.availableDays
            : null,
        }).filter(([_, value]) => value !== null)
      );

      return formatted;
    });

    employeeListToCSV(hardcopy, fileName);
    setFileName("");
  };

  return (
    <MainContainer
      onClick={(e) => {
        setOpenPopout(!openPopout);
      }}
    >
      <PopOut openPopOut={openPopout} onClick={(e) => e.stopPropagation()}>
        <ToDownload>
          <CheckBox
            isChecked={fieldsToDownload.includes("firstName")}
            onClick={() => checkboxHandle("firstName")}
          ></CheckBox>
          <span>First Name</span>
        </ToDownload>
        <ToDownload>
          <CheckBox
            isChecked={fieldsToDownload.includes("employeeId")}
            onClick={() => checkboxHandle("employeeId")}
          ></CheckBox>
          <span>Employee ID</span>
        </ToDownload>
        <ToDownload>
          <CheckBox
            isChecked={fieldsToDownload.includes("lastName")}
            onClick={() => checkboxHandle("lastName")}
          ></CheckBox>
          <span>Last Name</span>
        </ToDownload>
        <ToDownload>
          <CheckBox
            isChecked={fieldsToDownload.includes("email")}
            onClick={() => checkboxHandle("email")}
          ></CheckBox>
          <span>Email</span>
        </ToDownload>
        <ToDownload>
          <CheckBox
            isChecked={fieldsToDownload.includes("preferredName")}
            onClick={() => checkboxHandle("preferredName")}
          ></CheckBox>
          <span>Preferred Name</span>
        </ToDownload>
        <ToDownload>
          <CheckBox
            isChecked={fieldsToDownload.includes("availableDays")}
            onClick={() => checkboxHandle("availableDays")}
          ></CheckBox>
          <span>Available Days</span>
        </ToDownload>
        <Input
          placeholder="FILE NAME NO SPACE"
          onChange={(e) => setFileName(e.target.value)}
          value={fileName}
        />
        <DownloadBtn onClick={handleDownload}>
          <span>DOWNLOAD CSV</span>
        </DownloadBtn>
      </PopOut>
    </MainContainer>
  );
};

export default Download;
