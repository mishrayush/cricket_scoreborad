import * as React from "react";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import { IButtonProps } from "../interfaces/index";
const StyledButton = styled(Button)`
  background-color: gray;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  margin: auto;
  &:hover {
    background-color: gray;
  }
`;

const ButtonComponent: React.FC<IButtonProps> = props => {
  function handleClick() {
    props.clicked();
  }
  return (
    <div>
      <StyledButton onClick={handleClick}>{props.text}</StyledButton>
    </div>
  );
};

export default ButtonComponent;
