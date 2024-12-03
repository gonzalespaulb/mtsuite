import { FC, useEffect, useState } from "react";
import {
  EmptyState,
  FormContainer,
  Inputs,
  MainContainer,
  Section,
} from "./styles";
import {
  TypeInput,
  TypeToSelectionInput,
  CheckList,
  Designation,
} from "../../common/Form";


interface IContent {
  setPayload: Function;
  setFormPercentage: Function;
}

const Content:FC<IContent> = ({setPayload, setFormPercentage}) => {
  const [designation, setDesignation] = useState("");
  const [startTimes, setStartTimes] = useState([]);
  const [locations, setLocations] = useState<any[]>([]);

  const stateList = [
    {
      inputName: "Name",
      state: designation,
      setFunc: setDesignation,
      isFilled: designation !== "",
    },
    {
      inputName: "Start Times",
      state: startTimes,
      setFunc: setStartTimes,
      isFilled: startTimes.length,
    },
    {
      inputName: "Locations",
      state: locations,
      setFunc: setLocations,
      isFilled: locations.length > 0,
    },
  ];

  useEffect(() => {
    formElementPercentage();
  }, [stateList]);

  const formElementPercentage = () => {
    const numberOfTrue = stateList.filter(
      (element) => element.isFilled
    ).length;

    const percentFilled = Math.ceil((numberOfTrue / stateList.length) * 100);

    setFormPercentage(percentFilled);
  };

  const payload = {
    designation,
    startTimes,
    locations,
  };

  useEffect(() => {
    setPayload(payload);
  }, [designation, startTimes, locations])


  const hasLocations = locations.length > 0;

  return (
    <MainContainer>
      <FormContainer modifyRadius={hasLocations}>
        <Section>
          <CheckList
            checkListName={"Designation Details"}
            stateList={stateList}
            stopIndex={0}
          />
          <Inputs>
            <TypeInput stateProfile={stateList[0]} placeholder={"Village Express"}/>
            <TypeToSelectionInput stateProfile={stateList[1]} />
            <Designation startTimes={startTimes} stateProfile={stateList[2]} />
          </Inputs>
        </Section>
      </FormContainer>
      {hasLocations ? (
        <></>
      ) : (
        <EmptyState modifyRadius={hasLocations}>
          <span>This designation has no current locations.</span>
        </EmptyState>
      )}
    </MainContainer>
  );
};

export default Content;
