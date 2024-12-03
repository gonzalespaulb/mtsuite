import { MainContainer } from "./styles";
import DesignationCard from "./DesignationCard/DesignationCard";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

interface IContent {}

const Content: FC<IContent> = () => {
  
  const { designations } = useSelector(
    (state: RootState) => state?.scheduleControls
  );

  const renderDesignations = () => {
    return designations?.map((designation: any) => {
      const designationName = designation.designation;
      const locations = designation.locations;
      const designationId = designation._id; 
      
      return (
        <DesignationCard
          designation={designation}
          locations={locations}
          key={designationName}
          designationId={designationId}
        />
      );
    });
  };

  return <MainContainer>{renderDesignations()}</MainContainer>;
};

export default Content;