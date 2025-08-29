import type { BigNumber } from "bignumber.js";

export type ChainType = "TRON" | "ETH" | "BTC";
export type CryptoType = "USDT" | "ETH" | "BTC";

export interface CryptoAccountType {
  id: number;
  cryptoWallet: string;
  chainType: ChainType;
  email: string;
  site: string;
  insertDateTime: string;
  updateDateTime?: string;
  deleteDateTime?: string;
}

export interface CryptoAccountAndDeposit {
  id: number;
  cryptoWallet: string;
  email: string;
  accepted: boolean;
  acceptedAt: string;
  requestedAt: string;
  insertDateTime: string;
  updateDateTime?: string;
  deleteDateTime?: string;
}

export interface CryptoCreateRequestType {
  cryptoWallet: string;
  email: string;
  site: string;
}

export interface CryptoDepositRequestType {
  fromAddress: string;
  toAddress: string;
  cryptoWallet: string;
  cryptoType: CryptoType;
  amount: string;
  krwAmount: string;
}

export interface CryptoDepositType {
  id: number;
  email: string;
  status: TransactionStatusType;
  chainType: ChainType;
  cryptoType: CryptoType;
  fromAddress: string;
  toAddress: string;
  amount: string;
  krwAmount: string;
  accepted: boolean;
  acceptedAt: string;
  requestedAt: string;
  isSend: boolean;
}

export const TransactionStatus = [
  "PENDING", // 요청
  "PROCESSING", // 지갑 처리 중
  "CONFIRMED", // 블록에 포함됨
  "FAILED", // 블록 전송 실패
  "CANCELLED", // 관리자 취소
  "TIMEOUT", // 시간 초과
];

export type TransactionStatusType = (typeof TransactionStatus)[number];

export const transactionStatusLabelMap: Record<TransactionStatusType, string> =
  {
    PENDING: "요청",
    PROCESSING: "처리 중",
    CONFIRMED: "승인",
    FAILED: "실패",
    CANCELLED: "반려",
    TIMEOUT: "요청시간 초과",
  };

export interface ExchangeInfo {
  // 시가 00시 기준
  opening_price: BigNumber;
  // 종가 00시 기준
  closing_price: BigNumber;
  // 저가 00시 기준
  min_price: BigNumber;
  // 고가 00시 기준
  max_price: BigNumber;
  // 거래량 00시 기준
  units_traded: BigNumber;
  // 거래금액 00시 기준
  acc_trade_value: BigNumber;
  // 전일 종가
  prev_closing_price: BigNumber;
  // 최근 24시간 거래량
  units_traded_24H: number;
  // 최근 24시간 거래금액
  acc_trade_value_24H: BigNumber;
  // 최근 24시간 변동가
  fluctate_24H: BigNumber;
  // 최근 24시간 변동률
  fluctate_rate_24H: number;
  date: number;
}
