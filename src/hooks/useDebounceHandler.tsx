import { debounce } from "lodash";
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";

export function useDebounceHandler(setValue: Dispatch<SetStateAction<string>>) {
  const changeHandle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debounceHandler(e.target.value, setValue);
    },
    [setValue],
  );

  return { changeHandle };
}

export const debounceHandler = debounce(
  (value: string, callback: (_value: string) => void) => {
    callback(value);
  },
  300, // 딜레이 시간(ms)
);
