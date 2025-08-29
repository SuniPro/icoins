/** @jsxImportSource @emotion/react */
import { Card, CardContainer, HeadLine } from "@/components/layouts/Layouts";
import { css, useTheme } from "@emotion/react";
import { Step } from "./Step";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { CryptoType } from "@/model/financial";
import { amountRound, IndexStateProps } from "@/page/Main";
import { memo } from "react";
import { useExchangeContext } from "@/context/ExchangeContext";
import { ErrorAlert } from "@/components/Alert";
import BigNumber from "bignumber.js";
import { UserInfoType } from "@/model/user";

function ExchangeCheck(props: {
  indexState: IndexStateProps;
  user: UserInfoType;
}) {
  const { user } = props;
  const { setState } = props.indexState;

  const cryptoList = () => {
    switch (user.chainType) {
      case "BTC":
        return ["BTC"];
      case "ETH":
        return ["USDT", "ETH"];
      case "TRON":
        return ["USDT"];
    }
  };

  const {
    selectedCrypto,
    depositKrw,
    calculatedCryptoAmount,
    currentPrice,
    handleCryptoChange,
    handleKrwButtonClick,
  } = useExchangeContext();

  const theme = useTheme();

  const nextStep = () => {
    if (depositKrw.isLessThan(10000)) {
      ErrorAlert("입금 금액은 최소 10000원 이상이어야합니다.");
    } else {
      setState(2);
    }
  };

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
              value={selectedCrypto}
              placeholder={selectedCrypto}
              variant="bordered"
              selectedKeys={[selectedCrypto]}
              onChange={(e) => handleCryptoChange(e.target.value as CryptoType)}
              css={css`
                * {
                  background-color: #f4f4f4 !important;
                  border-radius: 10px;
                }
              `}
            >
              {cryptoList().map((crypto) => (
                <SelectItem key={crypto}>{crypto}</SelectItem>
              ))}
            </Select>
            <Input
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
            />
            <div className="flex flex-row justify-between flex-wrap gap-1">
              {buttons.map((button) => (
                <Button
                  size="sm"
                  color="secondary"
                  className="bg-transparent"
                  key={button.label}
                  onPress={() =>
                    handleKrwButtonClick(depositKrw.plus(button.value))
                  }
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
          <Step next={nextStep} previous={() => setState(0)} />
        </Card>
      </CardContainer>
    </>
  );
}

export default memo(ExchangeCheck);
