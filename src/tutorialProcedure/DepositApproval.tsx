/** @jsxImportSource @emotion/react */
import { Card, CardContainer, HeadLine } from "@/components/layouts/Layouts";
import {
  amountRound,
  DepositProcessingStateProps,
  IndexStateProps,
} from "@/page/Main";
import { css, useTheme } from "@emotion/react";
import { Input } from "@heroui/react";
import { StyledFuncButton } from "@/components/styled/Button/Button";
import BigNumber from "bignumber.js";
import { SendingIcon, SuccessIcon } from "@/components/styled/icons";
import { useJoyride } from "@/context/JoyrideContext";
import { useEffect, useState } from "react";
import { useExchangeContext } from "@/context/ExchangeContext";

export function DepositApproval(props: {
  indexState: IndexStateProps;
  processingDepositState: DepositProcessingStateProps;
}) {
  const { setState } = props.indexState;

  const { calculatedCryptoAmount } = useExchangeContext();

  const [send, setSend] = useState<boolean>(false);
  const { currentStepIndex } = useJoyride();

  useEffect(() => {
    if (currentStepIndex === 16) {
      setState(4);
    }

    if (currentStepIndex === 17) {
      setSend(true);
    }
  }, [currentStepIndex, setState]);

  const theme = useTheme();

  const sendCheck = () => {
    if (send) {
      return <SuccessIcon />;
    } else {
      return <SendingIcon />;
    }
  };

  return (
    <CardContainer>
      <Card theme={theme}>
        <HeadLine theme={theme} className="deposit-approval-check">
          입금 확인 요청
        </HeadLine>
        <div className="flex flex-col gap-4 my-5">
          <div className="deposit-approval-send w-full flex flex-col items-center">
            {sendCheck()}
          </div>
          <Input
            onClick={() => {}}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">USDT</span>
              </div>
            }
            readOnly
            label="요청한 USDT"
            labelPlacement="outside"
            type="number"
            value={amountRound(
              "USDT",
              new BigNumber(calculatedCryptoAmount),
            ).toString()}
            css={css`
              input {
                color: ${theme.mode.textPrimary} !important;
              }

              div {
                background-color: ${theme.mode.cardBackground} !important;
              }

              label {
                color: ${theme.mode.textPrimary};
              }
            `}
          />
          {send ? (
            <HeadLine theme={theme} textAlign="center">
              승인이 완료되었습니다.
            </HeadLine>
          ) : (
            <div className="flex flex-col items-center">
              <HeadLine theme={theme} textAlign="center">
                관리자에게 승인을 요청했습니다.
              </HeadLine>
              <HeadLine theme={theme} textAlign="center">
                잠시만 기다려주세요.
              </HeadLine>
            </div>
          )}
        </div>
        {send && (
          <StyledFuncButton
            onPress={() => setState(0)}
            className="w-full"
            theme={theme}
            backgroundColor={theme.mode.buttonActive}
          >
            홈으로
          </StyledFuncButton>
        )}
      </Card>
    </CardContainer>
  );
}
