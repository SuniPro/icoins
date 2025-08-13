export interface UserType {
  id: number;
  username: string;
  level: number;
  insertName: string;
  insertDateTime: string;
  updateName: string;
  updateDateTime: string;
  deleteName: string;
  deleteDateTime: string;
}

export const levelLabelMap: Record<number, string> = {
  3: "게스트",
  2: "유저",
  1: "VIP",
  0: "관리자",
};

export interface SignInType {
  email: string;
  password: string;
}

export interface UserCreateType {
  username: string;
  email: string;
  password: string;
}
