import { SignInType, UserType } from "../model/user";
import { getFromUserServer, postToUserServer } from "./base";

export async function me(): Promise<UserType> {
  const response = await getFromUserServer("/me");
  return response.data;
}

export async function login(loginInfo: SignInType): Promise<string> {
  const response = await postToUserServer("/login", loginInfo);

  return response.data;
}

export async function logout(): Promise<number> {
  const response = await getFromUserServer("/logout");

  return response.data;
}
