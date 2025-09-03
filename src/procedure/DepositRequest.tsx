import { useTheme } from "@emotion/react";
import { Card, CardContainer, HeadLine } from "@/components/layouts/Layouts";
import { Input } from "@heroui/react";
import { Step } from "./Step";
import {
  amountRound,
  DepositProcessingStateProps,
  IndexStateProps,
} from "@/page/Main";
import { useExchangeContext } from "@/context/ExchangeContext";
import { CustomConfirmAlert, ErrorAlert } from "@/components/Alert";
import { createCryptoDeposit } from "@/api/financial";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { SiteType } from "@/model/site";
import { getSite } from "@/api/site";
import { ChainType, CryptoType } from "@/model/financial";

export function DepositRequest(props: {
  indexState: IndexStateProps;
  processingDepositState: DepositProcessingStateProps;
}) {
  const { user } = useUserContext();
  const { setState } = props.indexState;
  const { setProcessingDeposit } = props.processingDepositState;
  const { selectedCrypto, depositKrw, calculatedCryptoAmount } =
    useExchangeContext();

  const [siteObject, setSiteObject] = useState<SiteType | null>(null);

  useEffect(() => {
    if (user) {
      getSite(user.site).then((site) => {
        setSiteObject(site);
      });
    }
  }, [user]);

  const theme = useTheme();

  const chainMeet = (cryptoType: CryptoType): ChainType => {
    switch (cryptoType) {
      case "USDT":
        return "TRON";
      case "BTC":
        return "BTC";
      case "ETH":
        return "ETH";
    }
  };

  const depositConfirm = () => {
    if (!siteObject || !user) return;
    const walletRow = siteObject.siteWalletList.find(
      (wallet) => wallet.chainType === chainMeet(selectedCrypto),
    );
    if (!walletRow) {
      return ErrorAlert("사이트의 지갑을 찾을 수 없습니다.");
    }
    CustomConfirmAlert(
      <>
        <HeadLine theme={theme} textAlign="center">
          정말 이대로 신청하시겠습니까?
        </HeadLine>
        <Input
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">
                {selectedCrypto}
              </span>
            </div>
          }
          readOnly
          label={`입금해야할 ${selectedCrypto}`}
          labelPlacement="outside"
          type="number"
          value={amountRound(selectedCrypto, calculatedCryptoAmount).toString()}
        />
      </>,
      () =>
        // console.log({
        //   cryptoWallet: user!.cryptoWallet,
        //   cryptoType: selectedCrypto,
        //   amount: calculatedCryptoAmount.toString(),
        //   krwAmount: depositKrw.toString(),
        // }),
        {
          createCryptoDeposit({
            toAddress: walletRow.cryptoWallet,
            fromAddress: user.cryptoWallet,
            cryptoWallet: user.cryptoWallet,
            cryptoType: selectedCrypto,
            amount: amountRound(selectedCrypto, calculatedCryptoAmount),
            krwAmount: depositKrw.toString(),
          })
            .then((response) => {
              setProcessingDeposit(response);
              setState(3);
            })
            .catch((e) => ErrorAlert(e.message));
        },
      theme,
    );
  };

  const krwFormatter = new Intl.NumberFormat("ko-KR");

  return (
    <>
      <CardContainer>
        <Card theme={theme}>
          <HeadLine theme={theme}>입금 신청</HeadLine>
          <div className="flex flex-col gap-4 my-5">
            <Input
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">
                    {selectedCrypto}
                  </span>
                </div>
              }
              readOnly
              label={`입금해야할 ${selectedCrypto}`}
              labelPlacement="outside"
              type="number"
              value={amountRound(selectedCrypto, calculatedCryptoAmount)}
            />
            <Input
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">₩</span>
                </div>
              }
              readOnly
              label="신청금액 (원화)"
              labelPlacement="outside"
              type="text"
              value={krwFormatter.format(depositKrw.toNumber())}
            />
            <HeadLine theme={theme} textAlign="center">
              이 시세대로 신청을 원하신다면 다음을 누르세요.
            </HeadLine>
          </div>
          <Step next={depositConfirm} previous={() => setState(1)} />
        </Card>
      </CardContainer>
    </>
  );
}
