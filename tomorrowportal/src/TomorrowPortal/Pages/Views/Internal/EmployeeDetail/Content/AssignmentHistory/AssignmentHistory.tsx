import { useSelector } from "react-redux";
import {
  AssignmentBar,
  AssignmentInfo,
  InfoLabel,
  LabelBar,
  MainContainer,
} from "./styles";
import { RootState } from "../../../../../../redux/store";
import { FC, useEffect, useState } from "react";

interface IAssignmentHistory {
  employeeId: string;
}

const AssignmentHistory: FC<IAssignmentHistory> = ({ employeeId }) => {
  const { allSchedules } = useSelector(
    (state: RootState) => state?.employeeViewControls
  );

  const renderLabelBar = () => {
    return (
      <LabelBar>
        <InfoLabel>
          <span>Designation</span>
        </InfoLabel>
        <InfoLabel>
          <span>Location</span>
        </InfoLabel>
        <InfoLabel>
          <span>Position</span>
        </InfoLabel>
        <InfoLabel>
          <span>Times</span>
        </InfoLabel>
      </LabelBar>
    );
  };

  const relevantAssignments = allSchedules
    .map((schedule) => {
      return schedule.assignedEmployees;
    })
    .flat()
    .filter((employee) => employee.employeeId === employeeId)

    let stringifiedAssignmentsArr: any[] = [];

    for (const assignment of relevantAssignments) {
        const stringifiedAssignment = `${assignment.designation}-${assignment.location}-${assignment.position}`;

        const profileToPush = {
            assignment: stringifiedAssignment, 
            count: 1,
        }

        stringifiedAssignmentsArr.push(profileToPush)
    }


  const renderRelevantAssignments = () => {
    return relevantAssignments.map((assignment) => {
      return (
        <AssignmentBar>
          <AssignmentInfo>
            <span>{assignment.designation}</span>
          </AssignmentInfo>
          <AssignmentInfo>
            <span>{assignment.location}</span>
          </AssignmentInfo>
          <AssignmentInfo>
            <span>{assignment.position[0]}</span>
          </AssignmentInfo>
          <AssignmentInfo>
            <span>1</span>
          </AssignmentInfo>
        </AssignmentBar>
      );
    });
  };

  return (
    <MainContainer>
      {renderLabelBar()}
      {renderRelevantAssignments()}
    </MainContainer>
  );
};

export default AssignmentHistory;
