export interface TetherAccountType {
  id: number;
  tetherWallet: string;
  username: string;
  insertDateTime: string;
  updateDateTime?: string;
  deleteDateTime?: string;
}

export interface TetherAccountAndDepositType {
  id: number;
  tetherWallet: string;
  username: string;
  accepted: boolean | null;
  acceptedAt: string | null;
  requestedAt: string | null;
  insertDateTime: string;
  updateDateTime?: string;
  deleteDateTime?: string;
}

export interface TetherCreateRequestType {
  email: string;
  tetherWallet: string;
}

export interface TetherDepositRequestType {
  tetherWallet: string;
  amount: number;
}

export interface TetherDepositType {
  id: number;
  tetherWallet: string;
  username: string;
  insertDateTime: string;
  amount: number;
  accepted: boolean;
  acceptedAt: string;
  requestedAt: string;
  status: TransactionStatusType;
}

export interface ExchangeInfoType {
  amount: number;
  base: string;
  date: string;
  rates: ExchangeRatesType;
}

interface ExchangeRatesType {
  KRW: number;
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
