import { useEffect, useState } from "react";
import {
  Active,
  AddBtn,
  AddIcon,
  CloseBtn,
  ConfirmBtn,
  ConfirmIcon,
  ContentContainer,
  Inactive,
  LocationsContainer,
  MainContainer,
  Overlay,
  RemoveBtn,
  SaveBtn,
  SelectionBtn,
  Sidebar,
  StartTimesContainer,
  StartTimesController,
  StartTimesList,
  StatusContainer,
  StatusDivider,
  StatusToggle,
  Title,
  TitleBar,
  TypeInBtn,
  TypeInput,
} from "./styles";
import { useDispatch } from "react-redux";
import {
  setOpenDesignationEdit,
  setDesignationToEdit,
  saveDesignationEdits,
} from "../../../../../redux/ScheduleSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { checkSecondary, closeSecondary } from "../../../assets";
import LocationCard from "./LocationCard/LocationCard";
import { addToast } from "../../../../../redux/NotificationSlice";
import { SUCCESS } from "../../../../../utils/status";

type TPosition =
  | "Administrator"
  | "Attendant"
  | "Foreman"
  | "Manager"
  | "Operator"
  | "Relief"
  | "Supervisor"
  | "Superuser";

interface IDesignation {
  designation: string;
  startTimes: string[];
  isActive: boolean;
  locations: {
    terrain: string;
    designation: string;
    positions: {
      startTime: string;
      position: TPosition[];
    }[];
  }[];
}

const EditDesignation = () => {
  const dispatch = useDispatch();

  const { designationToEdit } = useSelector(
    (state: RootState) => state?.scheduleControls
  );

  const [runAnimation, setRunAnimation] = useState<boolean>(false);
  const [startTimeEdit, setStartTimeEdit] = useState<boolean>(false);
  const [time, setTime] = useState("");
  const [btnToRemove, setBtnToRemove] = useState<number | null>();

  const [selectedDesignation, setSelectedDesignation] =
    useState<IDesignation | null>(null);

  useEffect(() => {
    setRunAnimation(true);
    setSelectedDesignation(designationToEdit);
  }, []);

  const closeEdit = () => {
    setRunAnimation(false);

    setTimeout(() => {
      dispatch(setOpenDesignationEdit(false));
      dispatch(setDesignationToEdit(null));
    }, 450);
  };

  // NOTE ------------------------------------------------------- LIFT STATUS

  const toggleStatus = (status: boolean) => {
    if (selectedDesignation) {
      const editedStatus = {
        designation: selectedDesignation.designation,
        startTimes: selectedDesignation.startTimes,
        isActive: status,
        locations: selectedDesignation.locations,
      };

      setSelectedDesignation(editedStatus);
    }
  };

  // NOTE ------------------------------------------------------- START TIMES

  const removeBtn = (index: number) => {
    if (selectedDesignation) {
      const newList = selectedDesignation?.startTimes.slice();
      newList.splice(index, 1);

      const editedStartTimes = {
        designation: selectedDesignation.designation,
        startTimes: newList,
        isActive: selectedDesignation.isActive,
        locations: selectedDesignation.locations,
      };

      setSelectedDesignation(editedStartTimes);
    }
  };

  const renderStartTimes = () => {
    if (selectedDesignation) {
      return selectedDesignation.startTimes.map((startTime, i) => {
        return (
          <SelectionBtn
            key={startTime}
            onMouseEnter={() => setBtnToRemove(i)}
            onMouseLeave={() => setBtnToRemove(null)}
          >
            <span>{startTime}</span>
            <RemoveBtn
              isRemoving={btnToRemove === i}
              onClick={() => removeBtn(i)}
            />
          </SelectionBtn>
        );
      });
    }
  };

  const confirm = () => {
    setStartTimeEdit(false);

    if (
      !time ||
      time === "" ||
      selectedDesignation?.startTimes.includes(time)
    ) {
      setTime("");
      return;
    }

    if (selectedDesignation) {
      const editedStartTimes = {
        designation: selectedDesignation.designation,
        startTimes: [...selectedDesignation.startTimes, time],
        isActive: selectedDesignation.isActive,
        locations: selectedDesignation.locations,
      };

      setSelectedDesignation(editedStartTimes);
    }

    setTime("");
  };

  const saveAction = () => {
    dispatch(saveDesignationEdits(selectedDesignation));
    closeEdit();

    const editsSaved = {
      status: SUCCESS,
      message: `${selectedDesignation?.designation} has been edited.`
    }

    dispatch(addToast(editsSaved));
  }

  // NOTE ------------------------------------------------------- LOCATIONS

  const renderLocations = () => {
    if (selectedDesignation) {
      return selectedDesignation?.locations?.map((location) => {
        return (
          <LocationCard
            setSelectedDesignation={setSelectedDesignation}
            selectedDesignation={selectedDesignation}
            startTimes={selectedDesignation.startTimes}
            locationProfile={location}
          />
        );
      });
    }
  };

  return (
    <MainContainer>
      <Overlay runAnimation={runAnimation} />
      <Sidebar runAnimation={runAnimation}>
        <TitleBar>
          <Title>{selectedDesignation?.designation}</Title>
          <CloseBtn onClick={closeEdit} />
        </TitleBar>
        <ContentContainer>
          {/* NOTE ------------------------------------------------------- LIFT STATUS */}
          <StatusContainer>
            <span>Designation Status</span>
            <StatusToggle>
              <Active
                isActive={
                  selectedDesignation ? selectedDesignation?.isActive : true
                }
                onClick={() => toggleStatus(true)}
              >
                <span>Active</span>
              </Active>
              <StatusDivider />
              <Inactive
                isActive={
                  selectedDesignation ? selectedDesignation?.isActive : true
                }
                onClick={() => toggleStatus(false)}
              >
                <span>Inactive</span>
              </Inactive>
            </StatusToggle>
          </StatusContainer>

          {/* NOTE ------------------------------------------------------- START TIMES */}

          <StartTimesContainer>
            <StartTimesController>
              <span>Start Times</span>
              <TypeInBtn>
                <AddBtn
                  runAnimation={startTimeEdit}
                  onClick={() => setStartTimeEdit(!startTimeEdit)}
                >
                  <AddIcon
                    iconUrl={closeSecondary}
                    runAnimation={startTimeEdit}
                  />
                </AddBtn>
                <TypeInput
                  placeholder="00:00 XX"
                  runAnimation={startTimeEdit}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <ConfirmBtn runAnimation={startTimeEdit} onClick={confirm}>
                  <ConfirmIcon iconUrl={checkSecondary} />
                </ConfirmBtn>
              </TypeInBtn>
            </StartTimesController>

            <StartTimesList>{renderStartTimes()}</StartTimesList>
          </StartTimesContainer>

          {/* NOTE ------------------------------------------------------- LOCATIONS */}

          <LocationsContainer>{renderLocations()}</LocationsContainer>

          <SaveBtn
            onClick={saveAction}
          >
            <span>SAVE CHANGES</span>
          </SaveBtn>
        </ContentContainer>
      </Sidebar>
    </MainContainer>
  ); 
};

export default EditDesignation;
