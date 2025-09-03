/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ContentsContainer } from "../components/layouts/Layouts";
import { css, keyframes, Theme, useTheme } from "@emotion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Pager from "../components/Transition/Pager";
import { Logo, LogoContainer } from "@/components/Logo";
import { InfoWrite } from "@/procedure/InfoWrite";
import ExchangeCheck from "@/procedure/ExchangeCheck";
import { DepositRequest } from "@/procedure/DepositRequest";
import { ExchangeContextProvider } from "@/context/ExchangeContext";
import { DepositCheck } from "@/procedure/DepositCheck";
import { CryptoDepositType, CryptoType } from "@/model/financial";
import { DepositApproval } from "@/procedure/DepositApproval";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/context/UserContext";
import { getLatestDepositByWallet } from "@/api/financial";
import { SuccessAlert } from "@/components/Alert";
import { useWindowContext } from "@/context/WindowContext";

export interface IndexStateProps {
  state: number;
  setState: Dispatch<SetStateAction<number>>;
}

export interface DepositProcessingStateProps {
  processingDeposit: CryptoDepositType | null;
  setProcessingDeposit: Dispatch<SetStateAction<CryptoDepositType | null>>;
}

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

export const amountRound = (cryptoType: CryptoType, amount: BigNumber) => {
  if (cryptoType === "USDT") {
    return amount.toFixed(2);
  } else {
    return amount.toString();
  }
};

export function Main() {
  const theme = useTheme();
  const { user } = useUserContext();

  const [state, setState] = useState(0);
  const [processingDeposit, setProcessingDeposit] =
    useState<CryptoDepositType | null>(null);

  const { windowWidth } = useWindowContext();

  const mainWidth = windowWidth < theme.windowSize.tablet ? windowWidth : 600;

  const { data: depositFromServer } = useQuery({
    queryKey: ["getLatestDepositByWallet", user],
    queryFn: () => getLatestDepositByWallet(user!.cryptoWallet),
    enabled: Boolean(user),
  });

  useEffect(() => {
    if (!depositFromServer) return;
    if (!depositFromServer.isSend && depositFromServer.status === "CONFIRMED") {
      setProcessingDeposit(depositFromServer);
      SuccessAlert("승인 대기 중인 요청이 있습니다.");
      setState(4);
    } else if (
      !depositFromServer.isSend &&
      depositFromServer.status === "PENDING"
    ) {
      setProcessingDeposit(depositFromServer);
      SuccessAlert("입금이 진행되지 않은 거래내역이 있습니다.");
      setState(3);
    }
  }, [depositFromServer]);

  return (
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
            <InfoWrite indexState={{ state, setState }} user={user} />
            <ExchangeCheck indexState={{ state, setState }} user={user} />
            <DepositRequest
              indexState={{ state, setState }}
              processingDepositState={{
                processingDeposit,
                setProcessingDeposit,
              }}
            />
            {user && (
              <DepositCheck
                indexState={{ state, setState }}
                user={user}
                processingDepositState={{
                  processingDeposit,
                  setProcessingDeposit,
                }}
              />
            )}
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
    </ExchangeContextProvider>
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
