import {
  CryptoAccountAndDeposit,
  CryptoAccountType,
  CryptoCreateRequestType,
  CryptoDepositRequestType,
  CryptoDepositType,
  ExchangeInfo,
} from "../model/financial";
import {
  getFromCryptoTrackerServer,
  getFromUserServer,
  patchToUserServer,
  postToUserServer,
  putToUserServer,
} from "./base";

export async function getExchangeInfo(
  cryptoType: "USDT" | "BTC" | "ETH",
): Promise<ExchangeInfo> {
  const response = await getFromCryptoTrackerServer(
    `/exchange/get?cryptoType=${cryptoType}`,
  );

  return response.data;
}

export async function getCryptoAccountByEmail(
  email: string,
): Promise<CryptoAccountType> {
  const response = await getFromUserServer(
    `/financial/crypto/get/account/by/email/${email}`,
  );
  return response.data;
}

export async function createOrFindCryptoAccount(
  cryptoCreateRequest: CryptoCreateRequestType,
): Promise<CryptoAccountAndDeposit> {
  const response = await putToUserServer(
    "/financial/crypto/create",
    cryptoCreateRequest,
  );
  return response.data;
}

export async function updateTetherWallet(
  tetherWallet: string,
): Promise<CryptoAccountType> {
  const response = await patchToUserServer(
    "/financial/tether/update/wallet",
    tetherWallet,
  );
  return response.data;
}

export async function createCryptoDeposit(
  depositRequest: CryptoDepositRequestType,
): Promise<CryptoDepositType> {
  const response = await postToUserServer(
    "/financial/crypto/create/deposit",
    depositRequest,
  );
  return response.data;
}

export async function getDepositById(id: number): Promise<CryptoDepositType> {
  const response = await getFromUserServer(
    `/financial/crypto/get/deposit/by/${id}`,
  );

  return response.data;
}

export async function getLatestDepositByWallet(
  cryptoWallet: string,
): Promise<CryptoDepositType> {
  const response = await getFromUserServer(
    `/financial/crypto/get/deposit/by/crypto/wallet/${cryptoWallet}`,
  );

  return response.data;
}

export async function depositRequest(id: number): Promise<CryptoDepositType> {
  const response = await patchToUserServer(
    "/financial/crypto/request/deposit",
    id,
  );
  return response.data;
}
