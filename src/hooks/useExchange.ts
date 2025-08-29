import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { CryptoType } from "@/model/financial";
import { getExchangeInfo } from "@/api/financial";

export function useExchange(initialCrypto: CryptoType = "USDT") {
  const [selectedCrypto, setSelectedCrypto] =
    useState<CryptoType>(initialCrypto);
  const [depositKrw, setDepositKrw] = useState<BigNumber>(BigNumber(0));

  const { data: exchangeInfo, isLoading: isExchangeInfoLoading } = useQuery({
    queryKey: ["getExchangeInfo", selectedCrypto],
    queryFn: () => getExchangeInfo(selectedCrypto),
  });

  const handleCryptoChange = (newCrypto: CryptoType) => {
    setSelectedCrypto(newCrypto);
    setDepositKrw(BigNumber(0));
  };

  const handleKrwButtonClick = (amount: BigNumber) => {
    setDepositKrw(amount);
  };

  const calculatedCryptoAmount =
    exchangeInfo && !depositKrw.isEqualTo(0)
      ? new BigNumber(depositKrw).dividedBy(exchangeInfo.closing_price)
      : new BigNumber(0);

  const currentPrice = exchangeInfo?.closing_price ?? new BigNumber(0);

  return {
    selectedCrypto,
    depositKrw,
    calculatedCryptoAmount,
    currentPrice,
    isExchangeInfoLoading,
    handleCryptoChange,
    handleKrwButtonClick,
  };
}
