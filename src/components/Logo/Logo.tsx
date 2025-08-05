import { css, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

export function Logo(props: { className?: string; height?: number; fontSize?: number }) {
  const { className, height = 100, fontSize = 28 } = props;
  const theme = useTheme();
  return (
    <LogoTextCase className={className} height={height} fontSize={fontSize} theme={theme}>
      <StyledI fontSize={fontSize + 10}>i</StyledI> coins
    </LogoTextCase>
  );
}

export function LogoText(props: { className?: string; height?: number; fontSize?: number }) {
  const { className, height = 100, fontSize = 28 } = props;
  const theme = useTheme();
  return (
    <LogoTextCase className={className} height={height} fontSize={fontSize} theme={theme}>
      i coins
    </LogoTextCase>
  );
}

const StyledI = styled.span<{ fontSize: number }>(
  ({ fontSize }) => css`
    font-size: ${fontSize}px;
  `,
);

const LogoTextCase = styled.span<{ fontSize: number; height : number; theme: Theme }>(
  ({ theme, height, fontSize }) => css`
    white-space: nowrap;

    height: ${height}px;
    color: ${theme.mode.logo.color};
    font-family: ${theme.mode.logo.font};
    font-weight: 700;
    font-size: ${fontSize}px;
    transform: translateY(0%);
  `,
);

export const LogoContainer = styled.div<{
  width: number;
  height: number;
}>(
  ({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;

    margin-bottom: 5rem;
  `,
);
