/** @jsxImportSource @emotion/react */
import { Card, CardContainer, HeadLine } from "@/components/layouts/Layouts";
import { css, useTheme } from "@emotion/react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { amountRound, IndexStateProps } from "@/page/Main";
import { memo, useEffect } from "react";
import { useExchangeContext } from "@/context/ExchangeContext";
import BigNumber from "bignumber.js";
import { useJoyride } from "@/context/JoyrideContext";
import { FuncItem } from "@/components/styled/Button";

function ExchangeCheck(props: { indexState: IndexStateProps }) {
  const { setState } = props.indexState;

  const { currentStepIndex } = useJoyride();

  useEffect(() => {
    if (currentStepIndex === 6) {
      setState(1);
    }
  }, [currentStepIndex, setState]);

  const {
    selectedCrypto,
    depositKrw,
    calculatedCryptoAmount,
    currentPrice,
    handleCryptoChange,
    handleKrwButtonClick,
  } = useExchangeContext();

  const theme = useTheme();

  const buttons = [
    { value: 10000, label: "1만원" },
    { value: 100000, label: "10만원" },
    { value: 500000, label: "50만원" },
    { value: 1000000, label: "100만원" },
    { value: 5000000, label: "500만원" },
    { value: 0, label: "RESET" },
  ];

  const ITEMS_PER_ROW = 4;

  // 마지막 줄을 채우기 위해 필요한 유령 요소의 개수 계산
  const remainder = buttons.length % ITEMS_PER_ROW;
  const spacers =
    remainder === 0 ? [] : Array(ITEMS_PER_ROW - remainder).fill(null);

  return (
    <>
      <CardContainer>
        <Card theme={theme}>
          <HeadLine theme={theme}>시세 확인</HeadLine>
          <div className="flex flex-col gap-4 my-5">
            <Select
              className="max-w-full"
              label="화폐를 선택하세요"
              value="TRON"
              placeholder={selectedCrypto}
              variant="bordered"
              selectedKeys={["TRON"]}
              onChange={() => handleCryptoChange("USDT")}
              css={css`
                span {
                  color: ${theme.mode.textPrimary};
                }
              `}
            >
              {["TRON"].map((crypto) => (
                <SelectItem key={crypto}>{crypto}</SelectItem>
              ))}
            </Select>
            <Input
              className="exchange-check-crypto-amount"
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">
                    {selectedCrypto}
                  </span>
                </div>
              }
              readOnly
              label={
                depositKrw.isLessThan(1)
                  ? `${selectedCrypto} 시세`
                  : `입금해야할 ${selectedCrypto}`
              }
              labelPlacement="outside"
              type="number"
              value={
                depositKrw.isLessThan(1)
                  ? currentPrice.toString()
                  : amountRound(
                      selectedCrypto,
                      new BigNumber(calculatedCryptoAmount),
                    )
              }
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
              label="입금금액"
              labelPlacement="outside"
              type="text"
              value={depositKrw.toNumber().toLocaleString("ko-KR")}
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
            <div className="exchange-check-amount flex flex-row justify-between flex-wrap gap-1">
              {buttons.map((button) => (
                <Button
                  size="sm"
                  color="secondary"
                  className="bg-transparent"
                  key={button.label}
                  onPress={() => {
                    if (button.value !== 0) {
                      handleKrwButtonClick(depositKrw.plus(button.value));
                    } else {
                      handleKrwButtonClick(new BigNumber(button.value));
                    }
                  }}
                  css={css`
                    width: 64px;
                    background-color: #989898 !important;
                  `}
                >
                  {button.label}
                </Button>
              ))}
              {spacers.map((_, index) => (
                <div
                  key={`spacer-${index}`}
                  css={css`
                    width: 64px;
                  `}
                />
              ))}
            </div>
          </div>
          <div className="w-full flex flex-row justify-between">
            <FuncItem
              func={() => setState(0)}
              label="이전"
              isActive={false}
              className="w-[45%]"
            />
            <FuncItem
              func={() => setState(1)}
              isActive={true}
              label="다음"
              className="exchange-check-next w-[45%]"
            />
          </div>
        </Card>
      </CardContainer>
    </>
  );
}

export default memo(ExchangeCheck);
