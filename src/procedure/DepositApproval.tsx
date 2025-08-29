import { Card, CardContainer, HeadLine } from "@/components/layouts/Layouts";
import { amountRound, IndexStateProps } from "@/page/Main";
import { useTheme } from "@emotion/react";
import { Input } from "@heroui/react";
import { StyledFuncButton } from "@/components/styled/Button/Button";
import BigNumber from "bignumber.js";
import { SendingIcon, SuccessIcon } from "@/components/styled/icons";
import { CryptoDepositType } from "@/model/financial";

export function DepositApproval(props: {
  indexState: IndexStateProps;
  deposit: CryptoDepositType;
}) {
  const { deposit } = props;
  const { setState } = props.indexState;

  const theme = useTheme();

  const sendCheck = () => {
    if (deposit.isSend) {
      return <SuccessIcon />;
    } else {
      return <SendingIcon />;
    }
  };

  return (
    <CardContainer>
      <Card theme={theme}>
        <HeadLine theme={theme}>입금 확인 요청</HeadLine>
        <div className="flex flex-col gap-4 my-5">
          <div className="w-full flex flex-col items-center">{sendCheck()}</div>
          <Input
            onClick={() => {}}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">
                  {deposit.cryptoType}
                </span>
              </div>
            }
            readOnly
            label={`요청한 ${deposit.cryptoType}`}
            labelPlacement="outside"
            type="number"
            value={amountRound(
              deposit.cryptoType,
              new BigNumber(deposit.amount),
            ).toString()}
          />
          {deposit.isSend ? (
            <HeadLine theme={theme} textAlign="center">
              승인이 완료되었습니다.
            </HeadLine>
          ) : (
            <div className="flex flex-col items-center">
              <HeadLine theme={theme} textAlign="center">
                관리자에게 승인을 요청했습니다.
              </HeadLine>
              <HeadLine theme={theme} textAlign="center">
                잠시만 기다려주세요.
              </HeadLine>
            </div>
          )}
        </div>
        {deposit.isSend && (
          <StyledFuncButton
            onPress={() => setState(0)}
            className="w-full"
            theme={theme}
            backgroundColor={theme.mode.buttonActive}
          >
            홈으로
          </StyledFuncButton>
        )}
      </Card>
    </CardContainer>
  );
}
