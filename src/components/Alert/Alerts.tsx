import toast from "react-hot-toast";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useState } from "react";
import { css, Theme, useTheme } from "@emotion/react";

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

export function ConfirmAlert(message: string, func: () => void): void {
  toast((t) => (
    <ConfirmAlertContainer>
      <span>{message}</span>
      <ConfirmFuncBox>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => toast.dismiss(t.id)}
        >
          NO
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            toast.dismiss(t.id);
            func(); // ✅ YES 누르면 실행
          }}
        >
          YES
        </Button>
      </ConfirmFuncBox>
    </ConfirmAlertContainer>
  ));
}

export function showConfirmReceiptAlert(
  message: string,
  func: () => void,
): void {
  toast(<ConfirmReceiptAlert message={message} onConfirm={func} />);
}

function ConfirmReceiptAlert({
  message,
  onConfirm,
}: {
  message: string;
  onConfirm: () => void;
}) {
  const [hashValue, setHashValue] = useState<string>("");
  const theme = useTheme();

  const isSha256Hash = (str: string): boolean => /^[a-f0-9]{64}$/i.test(str);

  return (
    <ConfirmAlertContainer>
      <span>{message}</span>
      <Description>아래에 거래 해시값을 입력해주세요.</Description>
      <StyledInput
        onChange={(e) => setHashValue(e.target.value)}
        isCurrent={isSha256Hash(hashValue)}
        theme={theme}
      />
      <ConfirmFuncBox>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => toast.dismiss()}
        >
          NO
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            if (!isSha256Hash(hashValue)) {
              ErrorAlert("정확한 거래 해시값을 입력하세요.");
            } else {
              toast.dismiss();
              onConfirm();
            }
          }}
        >
          YES
        </Button>
      </ConfirmFuncBox>
    </ConfirmAlertContainer>
  );
}

const ConfirmAlertContainer = styled.div`
  width: 350px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ConfirmFuncBox = styled.div`
  width: 50%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const Description = styled.span`
  margin-top: 5px;
  font-size: 12px;
`;

const StyledInput = styled.input<{ theme: Theme; isCurrent: boolean }>(
  ({ theme, isCurrent }) => css`
    border: 1px solid ${isCurrent ? theme.mode.textAccent : theme.mode.warning};
    width: 240px;
    border-radius: ${theme.borderRadius.softBox};
    height: 20px;
  `,
);
