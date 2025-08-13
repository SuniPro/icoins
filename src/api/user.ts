import { UserCreateType } from "../model/user";
import { postToUserServer } from "./base";

export async function userCreate(
  registerInfo: UserCreateType,
): Promise<string> {
  const response = await postToUserServer("/login", registerInfo);

  return response.data;
}
