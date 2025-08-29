import { UserInfoType } from "@/model/user";
import { getFromUserServer, postToUserServer } from "./base";

export async function getUserInfo(): Promise<UserInfoType> {
  const response = await getFromUserServer("/auth/check");

  return response.data;
}

export async function refreshToken(): Promise<void> {
  await postToUserServer("/auth/refresh", {});
}
