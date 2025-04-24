import {
  ExchangeInfoType,
  TetherAccountAndDepositType,
  TetherAccountType,
  TetherCreateRequestType,
  TetherDepositRequestType,
  TetherDepositType,
} from "../model/financial";
import {
  getFromUserServer,
  patchToUserServer,
  postToUserServer,
  putToUserServer,
} from "./base";
import axios from "axios";
import { ErrorAlert } from "../components/Alert/Alerts";

export async function getExchangeInfo(): Promise<number> {
  const response = await getFromUserServer("/financial/exchange");

  return response.data;
}

export async function getTetherAccountByEmail(
  email: string,
): Promise<TetherAccountType> {
  const response = await getFromUserServer(
    `/financial/tether/get/account/by/email/${email}`,
  );
  return response.data;
}

export async function createOrFindTetherAccount(
  tetherCreateRequest: TetherCreateRequestType,
): Promise<TetherAccountAndDepositType> {
  const response = await putToUserServer(
    "/financial/tether/create",
    tetherCreateRequest,
  );
  return response.data;
}

export async function updateTetherWallet(
  tetherWallet: string,
): Promise<TetherAccountType> {
  const response = await patchToUserServer(
    "/financial/tether/update/wallet",
    tetherWallet,
  );
  return response.data;
}

export async function depositRequest(
  depositRequest: TetherDepositRequestType,
): Promise<TetherDepositType> {
  const response = await postToUserServer(
    "/financial/tether/create/deposit",
    depositRequest,
  );
  return response.data;
}

export async function getLatestDepositByWallet(
  tetherWallet: string,
): Promise<TetherDepositType> {
  const response = await getFromUserServer(
    `/financial/tether/get/deposit/by/tether/wallet/${tetherWallet}`,
  );
  return response.data;
}

export async function getUsdToKrwRate(): Promise<ExchangeInfoType> {
  try {
    const response = await axios.get("https://api.frankfurter.app/latest", {
      params: {
        from: "USD",
        to: "KRW",
      },
    });

    return response.data;
  } catch {
    ErrorAlert("환율 조회에 실패하였습니다.");
    return null as unknown as ExchangeInfoType;
  }
}
