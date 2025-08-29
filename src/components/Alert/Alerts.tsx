import toast from "react-hot-toast";
import styled from "@emotion/styled";
import { FuncItem } from "../styled/Button/Button";
import { css, Theme } from "@emotion/react";
import { ReactNode } from "react";
import { Card } from "../layouts/Layouts";

export function Alert(message: string) {
  toast(message, {
    duration: 6000,
  });
}

export function ErrorAlert(message: string): void {
  toast.error(message);
}

export function SuccessAlert(message: string): void {
  toast.success(message);
}

export function CustomConfirmAlert(
  customNode: ReactNode,
  func: () => void,
  theme: Theme,
): void {
  toast.custom(
    (t) => (
      <Card
        className={`${t.visible ? "animate-custom-enter" : "animate-custom-leave"} max-w-md w-full bg-white pointer-events-auto`}
        theme={theme}
      >
        <div className="w-full flex flex-col gap-4">
          {customNode}
          <div className="w-full flex flex-row justify-between">
            <StyledButton
              func={() => toast.dismiss(t.id)}
              label="취소"
              backgroundColor={theme.colors.crimsonRed}
              theme={theme}
            />
            <StyledButton
              func={() => {
                func();
                toast.dismiss(t.id);
              }}
              label="확인"
              backgroundColor={theme.mode.buttonActive}
            />
          </div>
        </div>
      </Card>
    ),
    {
      duration: Infinity, // 자동으로 사라지지 않도록 설정
    },
  );
}

const StyledButton = styled(FuncItem)<{ backgroundColor: string }>(
  ({ backgroundColor }) => css`
    background-color: ${backgroundColor};
    width: 45%;
    color: white;

    &:hover {
      background-color: ${backgroundColor};
    }
  `,
);
