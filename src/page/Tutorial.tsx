/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ContentsContainer } from "../components/layouts/Layouts";
import { css, keyframes, Theme, useTheme } from "@emotion/react";
import { useState } from "react";
import Pager from "../components/Transition/Pager";
import { Logo, LogoContainer } from "@/components/Logo";
import { ExchangeContextProvider } from "@/context/ExchangeContext";
import { CryptoDepositType } from "@/model/financial";
import { useWindowContext } from "@/context/WindowContext";
import { InfoWrite } from "@/tutorialProcedure/InfoWrite";
import ExchangeCheck from "@/tutorialProcedure/ExchangeCheck";
import { DepositRequest } from "@/tutorialProcedure/DepositRequest";
import { DepositCheck } from "@/tutorialProcedure/DepositCheck";
import { DepositApproval } from "@/tutorialProcedure/DepositApproval";
import { JoyrideProvider } from "@/context/JoyrideContext";
import { JoyrideManager } from "@/tutorialProcedure/JoyrideManager";

const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export function Tutorial() {
  const theme = useTheme();

  const [state, setState] = useState(0);
  const [processingDeposit, setProcessingDeposit] =
    useState<CryptoDepositType | null>(null);

  const { windowWidth } = useWindowContext();

  const mainWidth = windowWidth < theme.windowSize.tablet ? windowWidth : 600;

  return (
    <JoyrideProvider>
      <ExchangeContextProvider>
        <MainContainer width={mainWidth}>
          <LogoContainer width={300} height={140}>
            <Logo fontSize={80} />
            <SubjectTitle theme={theme}>
              오직 당신을 위한 프라이빗 안전거래 시스템
            </SubjectTitle>
          </LogoContainer>
          <StyledContentsContainer>
            <Pager state={state}>
              <InfoWrite indexState={{ state, setState }} />
              <ExchangeCheck indexState={{ state, setState }} />
              <DepositRequest indexState={{ state, setState }} />
              <DepositCheck indexState={{ state, setState }} />
              <DepositApproval
                indexState={{ state, setState }}
                processingDepositState={{
                  processingDeposit,
                  setProcessingDeposit,
                }}
              />
            </Pager>
          </StyledContentsContainer>
          <footer style={{ width: "100%", height: "20px" }}></footer>
        </MainContainer>
        <JoyrideManager />
      </ExchangeContextProvider>
    </JoyrideProvider>
  );
}

const SubjectTitle = styled.span<{ theme: Theme; fontSize?: number }>(
  ({ theme, fontSize }) => css`
    font-family: ${theme.mode.font.component.itemTitle};
    font-size: ${fontSize}px;
  `,
);

const MainContainer = styled.main<{ width: number }>(
  ({ width }) => css`
    width: ${width}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    overflow: hidden;

    ul {
      li {
        text-align: left;
        margin: 0 0 10px;
      }
    }
  `,
);

const StyledContentsContainer = styled(ContentsContainer)`
  animation: ${fadeUp} 0.7s ease-in-out;
  animation-fill-mode: both;
`;
