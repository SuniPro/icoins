import styled from "@emotion/styled";
import { ReactElement } from "react";
import { FuncIconItemProps, FuncItemProps } from "./ButtonPropsType";
import { css, Theme, useTheme } from "@emotion/react";
import { Button } from "@heroui/react";

export function FuncItem(props: FuncItemProps): ReactElement {
  const { className, label, func, isActive, ...other } = props;
  const theme = useTheme();

  return (
    <StyledFuncButton
      theme={theme}
      className={className}
      onPress={func}
      backgroundColor={
        isActive ? theme.mode.buttonActive : theme.mode.buttonIsActive
      }
      {...other}
    >
      {label}
    </StyledFuncButton>
  );
}

export function FuncIconItem(props: FuncIconItemProps) {
  const { className, icon, label, func, ...other } = props;
  const theme = useTheme();
  return (
    <StyledFuncButton
      theme={theme}
      className={className}
      onClick={func}
      {...other}
    >
      <IconCase>{icon}</IconCase>
      {label}
    </StyledFuncButton>
  );
}

export const StyledFuncButton = styled(Button)<{
  backgroundColor?: string;
  theme: Theme;
}>(
  ({ backgroundColor, theme }) => css`
    background-color: ${backgroundColor};

    color: white;

    margin: 0;
    padding: 0.6em 1.2em;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${theme.mode.buttonHoverBackground};
    }

    &:active {
      background-color: ${theme.mode.hoverEffect};
      background-size: 100%;
      transition: background 0s;
    }

    transition: background 0.8s;

    &:focus {
      outline: none;
    }
  `,
);

const IconCase = styled.i`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
`;
