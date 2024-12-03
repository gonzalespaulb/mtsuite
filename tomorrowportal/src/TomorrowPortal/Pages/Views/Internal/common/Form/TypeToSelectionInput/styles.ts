import styled from "styled-components";
import { flex } from "../../../../../../utils/helpers";
import { inter } from "../../../../../../utils/fonts";
import { colors } from "../../../../../../utils/colors";
import { closeSecondary } from "../../../../assets";

export const MainContainer = styled.div`
  ${flex(undefined, undefined, "column")}
  width: 100%;
  grid-column: 2 / 3;
`;

export const Label = styled.label`
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  display: block;
`;

export const BtnGroup = styled.div`
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: -8px;
  ${flex()}
`;

export const TypeInBtn = styled.div`
  ${flex("center", "center")}
  border: 1px solid ${colors.primary};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 8px;
  margin-right: 8px;
`;

interface AddBtnProps {
  runAnimation: boolean;
}

export const AddBtn = styled.div<AddBtnProps>`
  padding: 16px;
  background: ${colors.primary};
  border-right: 1px solid ${colors.primary};
  ${flex("center", "center")}
  cursor: pointer;
`;

interface ConfirmBtnProps {
  runAnimation: boolean;
}

export const ConfirmBtn = styled.div<ConfirmBtnProps>`
  padding: 16px;
  background: ${colors.primary};
  ${flex("center", "center")}
  cursor: pointer;
  display: ${(props) => (props.runAnimation ? "block" : "none")};
  opacity: ${(props) => (props.runAnimation ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

interface TypeInputProps {
  runAnimation: boolean;
}

export const TypeInput = styled.input<TypeInputProps>`
  height: 42px;
  width: ${(props) => (props.runAnimation ? "100px" : "0px")};
  border: none;
  background: ${colors.input};
  padding: ${(props) => (props.runAnimation ? "16px" : "0px")};
  text-align: center;
  color: ${colors.primary};
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.bold};
  transition: 0.3s ease;
`;

interface IconProps {
  iconUrl: string;
  runAnimation?: boolean;
}

const Icon = styled.div<IconProps>`
  height: 10px;
  width: 10px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const AddIcon = styled(Icon)`
  background-image: url(${(props) => props.iconUrl});
  transform: rotateZ(${(props) => (props.runAnimation ? "0deg" : "-45deg")});
  transition: 0.3s ease;
`;

export const ConfirmIcon = styled(Icon)`
  background-image: url(${(props) => props.iconUrl});
`;

export const SelectionBtn = styled.div`
  border-radius: 10px;
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.bold};
  padding: 16px;
  ${flex("center", "center")}
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid ${colors.primary};
  background: ${colors.secondary};
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;

  :not(:last-child) {
    margin-right: 8px;
  }
`;

interface RemoveBtnProps {
  isRemoving: boolean;
}

export const RemoveBtn = styled.div<RemoveBtnProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url(${closeSecondary});
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${colors.lightRed};
  transform: translateY(${(props) => props.isRemoving ? "0%" : "100%"});
  transition: 0.3s ease;
`;