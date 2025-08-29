import { useExchange } from "@/hooks/useExchange";
import { CryptoType } from "@/model/financial";
import { createContext, ReactNode, useContext } from "react";

const ExchangeContext = createContext<{
  selectedCrypto: CryptoType;
  depositKrw: BigNumber;
  calculatedCryptoAmount: BigNumber;
  currentPrice: BigNumber;
  handleCryptoChange: (_newCrypto: CryptoType) => void;
  handleKrwButtonClick: (_amount: BigNumber) => void;
} | null>(null);

export function ExchangeContextProvider({ children }: { children: ReactNode }) {
  const {
    selectedCrypto,
    depositKrw,
    calculatedCryptoAmount,
    currentPrice,
    handleCryptoChange,
    handleKrwButtonClick,
  } = useExchange("USDT");

  return (
    <ExchangeContext.Provider
      value={{
        selectedCrypto,
        depositKrw,
        calculatedCryptoAmount,
        currentPrice,
        handleCryptoChange,
        handleKrwButtonClick,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
}

export function useExchangeContext() {
  const context = useContext(ExchangeContext);
  if (!context) {
    throw new Error("useExchangeContext must be used within the context");
  }

  return context;
}
