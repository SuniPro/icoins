import styled from "@emotion/styled";
import { css, Global, Theme, useTheme } from "@emotion/react";

export const ResourcePageContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.section`
  display: flex;
`;

export function GlobalStyled() {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        width: 100%;
        position: relative;

        z-index: -1;
        background-color: ${theme.mode.bodyBackground};

        :root {
          font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
          line-height: 1.5;
          font-weight: 400;

          color-scheme: light dark;

          color: ${theme.mode.textPrimary};
          background-color: ${theme.mode.bodyBackground};

          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
          width: 100%;
          overflow: hidden;
        }

        body {
          margin: 0;
          display: flex;
          place-items: center;
          color: ${theme.mode.textPrimary};
          background-color: ${theme.mode.bodyBackground};

          box-sizing: border-box;
        }

        button {
          border-radius: ${theme.borderRadius.softBox};
          border: 1px solid transparent;
          font-weight: 500;
          font-family: ${theme.mode.font.component.itemDescription};
          transition: border-color 0.25s;
        }

        main {
          box-sizing: border-box;
        }
      `}
    />
  );
}

export const ModalContainer = styled.div<{ width: number; theme: Theme }>(
  ({ width, theme }) => css`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${width}px;
    height: 450px;
    border: 1px solid ${theme.mode.textSecondary};
    border-radius: ${theme.borderRadius.softBox};
    color: ${theme.mode.textPrimary};
    background-color: ${theme.mode.cardBackground};
    overflow-x: visible;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
);
