import { getSite } from "@/api/site";
import { Card, CardContainer, HeadLine } from "@/components/layouts/Layouts";
import { useUserContext } from "@/context/UserContext";
import { SiteResponseType } from "@/model/site";
import { amountRound, IndexStateProps } from "@/page/Main";
import { useTheme } from "@emotion/react";
import { QRCodeSVG } from "qrcode.react";
import { RefObject, useEffect, useRef, useState } from "react";
import { Input } from "@heroui/react";
import {
  CustomConfirmAlert,
  ErrorAlert,
  SuccessAlert,
} from "@/components/Alert";
import { depositRequest } from "@/api/financial";
import BigNumber from "bignumber.js";
import { StyledFuncButton } from "@/components/styled/Button/Button";
import { CryptoDepositType } from "@/model/financial";

export const inputCopy = (ref: RefObject<HTMLInputElement | null>) => {
  if (!ref.current) return;
  const wallet = ref.current;
  navigator.clipboard
    .writeText(wallet.value)
    .then(() => {
      SuccessAlert("복사 성공");
    })
    .catch(() => {
      ErrorAlert("복사 실패");
    });
};

export function DepositCheck(props: {
  indexState: IndexStateProps;
  deposit?: CryptoDepositType | null;
}) {
  const { user } = useUserContext();
  const { deposit } = props;
  const { setState } = props.indexState;
  const theme = useTheme();

  const [siteObject, setSiteObject] = useState<SiteResponseType | null>(null);

  useEffect(() => {
    if (user) {
      getSite(user.site).then((site) => {
        setSiteObject(site);
      });
    }
  }, [user]);

  const walletRef = useRef<HTMLInputElement>(null);

  const depositConfirm = () => {
    if (!deposit) return;
    CustomConfirmAlert(
      <>
        <HeadLine theme={theme} textAlign="center">
          입금을 완료하셨습니까?
        </HeadLine>
        <Input
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">
                {deposit.cryptoType}
              </span>
            </div>
          }
          readOnly
          label={`입금해야할 ${deposit.cryptoType}`}
          labelPlacement="outside"
          type="number"
          value={amountRound(deposit.cryptoType, new BigNumber(deposit.amount))}
        />
      </>,
      () => {
        depositRequest(deposit.id)
          .then((response) => {
            if (response.status === "CONFIRMED") {
              setState(4);
            }
          })
          .catch((e) => ErrorAlert(e.message));
      },
      theme,
    );
  };

  if (!deposit) return;

  return (
    <CardContainer>
      <Card theme={theme}>
        <HeadLine theme={theme}>입금 확인 요청</HeadLine>
        <div className="flex flex-col gap-4 my-5">
          <div className="w-full flex flex-col items-center">
            {siteObject && (
              <QRCodeSVG
                value={siteObject.cryptoWallet}
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />
            )}
          </div>
          <Input
            readOnly
            label={`${user?.site.toUpperCase()} 의 지갑주소 (클릭하여 복사하세요.)`}
            labelPlacement="outside"
            type="text"
            value={siteObject?.cryptoWallet}
            onClick={() => inputCopy(walletRef)}
            ref={walletRef}
          />
          <Input
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">
                  {deposit.cryptoType}
                </span>
              </div>
            }
            readOnly
            label={`
            입금해야할 ${deposit.cryptoType}`}
            labelPlacement="outside"
            type="number"
            value={amountRound(
              deposit.cryptoType,
              new BigNumber(deposit.amount),
            )}
          />
          <HeadLine theme={theme} textAlign="center">
            입금을 완료하시고 아래의 확인요청을 눌러주세요.
          </HeadLine>
        </div>
        <StyledFuncButton
          onPress={depositConfirm}
          className="w-full"
          theme={theme}
          backgroundColor={theme.mode.buttonActive}
        >
          확인 요청
        </StyledFuncButton>
      </Card>
    </CardContainer>
  );
}
