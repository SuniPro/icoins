import { ChainType } from "./financial";

export interface SiteType {
  id: number;
  site: string;
  siteWalletList: SiteWalletType[];
  telegramUsername: string;
  telegramChatId: number;
  insertDateTime: string;
  insertId: string;
  updateDateTime: string | null;
  updateId: string | null;
  deleteDateTime: string | null;
  deleteId: string | null;
}

export interface SiteWalletType {
  cryptoWallet: string;
  chainType: ChainType;
}
