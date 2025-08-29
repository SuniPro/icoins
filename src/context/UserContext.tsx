import { getUserInfo, refreshToken } from "@/api/auth";
import { UserInfoType } from "@/model/user";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect } from "react";

const UserContext = createContext<{
  user: UserInfoType | null;
  isLoading: boolean;
  isError: boolean;
} | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<UserInfoType | null>({
    queryKey: ["getUserInfo"],
    queryFn: () => getUserInfo(),
    refetchInterval: 60000,
    retry: false,
  });

  useEffect(() => {
    refreshToken().then();
  }, [isError]);

  return (
    <UserContext.Provider value={{ user: user ?? null, isLoading, isError }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within the context");
  }

  return context;
}
