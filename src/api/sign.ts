import { UserType } from "../model/user";
import { getFromICoinsServer } from "./base";

export async function me(): Promise<UserType> {
  const response = await getFromICoinsServer("/me");
  return response.data;
}

export async function logout(): Promise<number> {
  const response = await getFromICoinsServer("/logout");

  return response.data;
}
