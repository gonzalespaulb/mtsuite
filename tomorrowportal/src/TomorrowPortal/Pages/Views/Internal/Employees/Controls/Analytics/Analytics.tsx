import { FC, useState } from "react";
import { Count, CountContainer, MainContainer, PopOut } from "./styles";

interface IAnalytics {
  activeCount: number;
  inactiveCount: number;
  setFilterType: Function;
  filterType: null | boolean;
}

const Analytics: FC<IAnalytics> = ({
  activeCount,
  inactiveCount,
  setFilterType,
  filterType,
}) => {
  const [openPopout, setOpenPopout] = useState(false);

  const filterHandle = (filterType: null | boolean) => {
    setFilterType(filterType);
    setOpenPopout(false);
  }

  return (
    <MainContainer
      onClick={(e) => {
        setOpenPopout(!openPopout);
      }}
    >
      <PopOut openPopOut={openPopout} onClick={(e) => e.stopPropagation()}>
        <CountContainer>
          <span>All Employees</span>
          <Count onClick={() => filterHandle(null)} filterType={filterType} countType={null}>
            <span>{activeCount + inactiveCount}</span>
          </Count>
        </CountContainer>
        <CountContainer>
          <span>Active</span>
          <Count onClick={() => filterHandle(true)} filterType={filterType} countType={true}>
            <span>{activeCount}</span>
          </Count>
        </CountContainer>
        <CountContainer>
          <span>Inactive</span>
          <Count onClick={() => filterHandle(false)} filterType={filterType} countType={false}>
            <span>{inactiveCount}</span>
          </Count>
        </CountContainer>
      </PopOut>
    </MainContainer>
  );
};

export default Analytics;
