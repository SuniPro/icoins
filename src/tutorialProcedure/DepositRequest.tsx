/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Card, CardContainer, HeadLine } from "@/components/layouts/Layouts";
import { Input } from "@heroui/react";
import { amountRound, IndexStateProps } from "@/page/Main";
import { useExchangeContext } from "@/context/ExchangeContext";
import { useJoyride } from "@/context/JoyrideContext";
import { useEffect } from "react";
import { FuncItem } from "@/components/styled/Button";

export function DepositRequest(props: { indexState: IndexStateProps }) {
  const { setState } = props.indexState;
  const { selectedCrypto, depositKrw, calculatedCryptoAmount } =
    useExchangeContext();

  const theme = useTheme();

  const krwFormatter = new Intl.NumberFormat("ko-KR");

  const { currentStepIndex } = useJoyride();

  useEffect(() => {
    if (currentStepIndex === 9) {
      setState(2);
    }
  }, [currentStepIndex, setState]);

  return (
    <>
      <CardContainer>
        <Card theme={theme}>
          <HeadLine theme={theme}>입금 신청</HeadLine>
          <div className="flex flex-col gap-4 my-5">
            <Input
              className="deposit-request-crypto-amount"
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">
                    {selectedCrypto}
                  </span>
                </div>
              }
              readOnly
              label={`입금해야할 ${selectedCrypto}`}
              labelPlacement="outside"
              type="number"
              value={amountRound(selectedCrypto, calculatedCryptoAmount)}
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
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">₩</span>
                </div>
              }
              readOnly
              label="신청금액 (원화)"
              labelPlacement="outside"
              type="text"
              value={krwFormatter.format(depositKrw.toNumber())}
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
              이 시세대로 신청을 원하신다면 다음을 누르세요.
            </HeadLine>
          </div>
          <div className="w-full flex flex-row justify-between">
            <FuncItem
              func={() => setState(1)}
              label="이전"
              isActive={false}
              className="w-[45%]"
            />
            <FuncItem
              func={() => setState(2)}
              isActive={true}
              label="다음"
              className="deposit-request-next w-[45%]"
            />
          </div>
        </Card>
      </CardContainer>
    </>
  );
}
