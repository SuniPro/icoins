import { getSite } from "@/api/site";
import { Card, CardContainer, HeadLine } from "@/components/layouts/Layouts";
import { SiteType } from "@/model/site";
import {
  amountRound,
  DepositProcessingStateProps,
  IndexStateProps,
} from "@/page/Main";
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
import { UserInfoType } from "@/model/user";

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
  user: UserInfoType;
  processingDepositState: DepositProcessingStateProps;
}) {
  const { user } = props;
  const { setState } = props.indexState;
  const { processingDeposit } = props.processingDepositState;
  const theme = useTheme();

  const [siteObject, setSiteObject] = useState<SiteType | null>(null);

  useEffect(() => {
    getSite(user.site).then((site) => {
      setSiteObject(site);
    });
  }, [user]);

  const walletRef = useRef<HTMLInputElement>(null);

  const depositConfirm = () => {
    if (!processingDeposit) return;
    CustomConfirmAlert(
      <>
        <HeadLine theme={theme} textAlign="center">
          입금을 완료하셨습니까?
        </HeadLine>
        <Input
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">
                {processingDeposit.cryptoType}
              </span>
            </div>
          }
          readOnly
          label={`입금해야할 ${processingDeposit.cryptoType}`}
          labelPlacement="outside"
          type="number"
          value={amountRound(
            processingDeposit.cryptoType,
            new BigNumber(processingDeposit.amount),
          )}
        />
      </>,
      () => {
        depositRequest(processingDeposit.id)
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

  if (!processingDeposit) return;
  const walletRow = siteObject?.siteWalletList.find(
    (wallet) => wallet.chainType === processingDeposit.chainType,
  );

  return (
    <CardContainer>
      <Card theme={theme}>
        <HeadLine theme={theme}>입금 확인 요청</HeadLine>
        <div className="flex flex-col gap-4 my-5">
          <div className="w-full flex flex-col items-center">
            {siteObject && walletRow && (
              <QRCodeSVG
                value={walletRow.cryptoWallet}
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />
            )}
          </div>
          {walletRow && (
            <Input
              readOnly
              label={`${user.site.toUpperCase()} 의 지갑주소 (클릭하여 복사하세요.)`}
              labelPlacement="outside"
              type="text"
              value={walletRow.cryptoWallet}
              onClick={() => inputCopy(walletRef)}
              ref={walletRef}
            />
          )}
          <Input
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">
                  {processingDeposit.cryptoType}
                </span>
              </div>
            }
            readOnly
            label={`
            입금해야할 ${processingDeposit.cryptoType}`}
            labelPlacement="outside"
            type="number"
            value={amountRound(
              processingDeposit.cryptoType,
              new BigNumber(processingDeposit.amount),
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
