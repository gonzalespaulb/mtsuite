import { useNavigate } from "react-router-dom";
import {
  BackBtn,
  BackBtnContainer,
  Edit,
  EditIcon,
  EditText,
  MainContainer,
} from "./styles";
import { FC } from "react";
import { ContentValues } from "../../../../../utils/enums";
import { useCreateCustomShift } from "../../../../../redux/hooks/user";

interface IControls {
  setOpenEdit: Function;
}

const Controls:FC<IControls> = ({setOpenEdit}) => {

  let navigate = useNavigate();

  // NOTE ----------------------------------------------------------- PLUG HOOKS HERE
  // NOTE ----------------------------------------------------------- PLUG HOOKS HERE
  // NOTE ----------------------------------------------------------- PLUG HOOKS HERE
  const { onCreateCustomShift } = useCreateCustomShift();


  const customShift = {
    date: "12/25/23",
    isActive: true,
    note: "Covering for Martina.",
  }

  const addCustomShift = () => {
    // <hook>("142965", customShift)
    onCreateCustomShift(customShift, "565656");
  }


  // NOTE ----------------------------------------------------------- PLUG HOOKS HERE
  // NOTE ----------------------------------------------------------- PLUG HOOKS HERE
  // NOTE ----------------------------------------------------------- PLUG HOOKS HERE

  return (
    <MainContainer>
      <BackBtnContainer>
        <BackBtn
          onClick={() => navigate(ContentValues.Employees)}
        />
      </BackBtnContainer>

        {/* <Edit onClick={() => setOpenEdit(true)}> */}
        {/* <Edit onClick={addCustomShift}> */}
          {/* <EditText>Edit Employee Profile</EditText>
          <EditIcon/>
        </Edit> */}
    </MainContainer>
  );
};

export default Controls;
