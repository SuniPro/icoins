import { css, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

export function Logo(props: { className?: string; fontSize?: number }) {
  const { className, fontSize = 28 } = props;
  const theme = useTheme();
  return (
    <LogoTextCase className={className} fontSize={fontSize} theme={theme}>
      <StyledI fontSize={fontSize + 10}>i</StyledI> conins
    </LogoTextCase>
  );
}

export function LogoText(props: { className?: string; fontSize?: number }) {
  const { className, fontSize = 28 } = props;
  const theme = useTheme();
  return (
    <LogoTextCase className={className} fontSize={fontSize} theme={theme}>
      i conins
    </LogoTextCase>
  );
}

const StyledI = styled.span<{ fontSize: number }>(
  ({ fontSize }) => css`
    font-size: ${fontSize}px;
  `,
);

const LogoTextCase = styled.span<{ fontSize: number; theme: Theme }>(
  ({ theme, fontSize }) => css`
    white-space: nowrap;

    height: 100px;
    color: ${theme.colors.azure};
    font-family: ${theme.mode.font.logo};
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
