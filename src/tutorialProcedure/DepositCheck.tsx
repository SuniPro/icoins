/** @jsxImportSource @emotion/react */
import { Card, CardContainer, HeadLine } from "@/components/layouts/Layouts";
import { amountRound, IndexStateProps } from "@/page/Main";
import { css, useTheme } from "@emotion/react";
import { QRCodeSVG } from "qrcode.react";
import { RefObject, useEffect, useRef } from "react";
import { Input } from "@heroui/react";
import { ErrorAlert, SuccessAlert } from "@/components/Alert";
import { StyledFuncButton } from "@/components/styled/Button/Button";
import { useExchangeContext } from "@/context/ExchangeContext";
import { useJoyride } from "@/context/JoyrideContext";

export const inputCopy = (ref: RefObject<HTMLInputElement | null>) => {
  if (!ref.current) return;
  const wallet = ref.current;
  navigator.clipboard
    .writeText(wallet.value)
    .then(() => {
      SuccessAlert("복사 성공");
    })
    .catch(() => {
      ErrorAlert("복사 실패");
    });
};

export function DepositCheck(props: { indexState: IndexStateProps }) {
  const { setState } = props.indexState;
  const { calculatedCryptoAmount } = useExchangeContext();
  const theme = useTheme();

  const walletRef = useRef<HTMLInputElement>(null);

  const { currentStepIndex } = useJoyride();

  useEffect(() => {
    if (currentStepIndex === 11) {
      setState(3);
    }
  }, [currentStepIndex, setState]);

  return (
    <CardContainer>
      <Card theme={theme}>
        <HeadLine className="deposit-check-check" theme={theme}>
          입금 확인 요청
        </HeadLine>
        <div className=" flex flex-col gap-4 my-5">
          <div className="w-full flex flex-col items-center">
            <div className="w-[220px] h-[220px] bg-white flex justify-center items-center rounded-[20px]">
              <QRCodeSVG
                className="deposit-check-qr"
                value="TESTCRYPTOWALLET"
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />
            </div>
          </div>
          <Input
            className="deposit-check-wallet"
            readOnly
            label="TEST 의 지갑주소 (클릭하여 복사하세요.)"
            labelPlacement="outside"
            type="text"
            value="TESTCRYPTOWALLET"
            onClick={() => inputCopy(walletRef)}
            ref={walletRef}
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
          <Input
            className="deposit-check-amount"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">USDT</span>
              </div>
            }
            readOnly
            label="입금해야할 USDT"
            labelPlacement="outside"
            type="number"
            value={amountRound("USDT", calculatedCryptoAmount)}
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
          <HeadLine theme={theme} textAlign="center">
            입금을 완료하시고 아래의 확인요청을 눌러주세요.
          </HeadLine>
        </div>
        <StyledFuncButton
          onPress={() => setState(4)}
          className="deposit-check-next w-full"
          theme={theme}
          backgroundColor={theme.mode.buttonActive}
        >
          확인 요청
        </StyledFuncButton>
      </Card>
    </CardContainer>
  );
}
