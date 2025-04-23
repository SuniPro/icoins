/** @jsxImportSource @emotion/react */
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";
import {
  TetherCreateRequestType,
  TetherDepositRequestType,
} from "../../../model/financial";
import AcceptImage from "../../../assets/image/accpeted.png";
import { Container } from "../../layouts/Frames/FrameLayouts";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import {
  createOrFindTetherAccount,
  depositRequest,
  getExchangeInfo,
  getLatestDepositByWallet,
} from "../../../api/financial";
import { ErrorAlert, SuccessAlert } from "../../Alert/Alerts";
import { Spinner } from "../../Empty/Spinner";
import { useSearchParams } from "react-router-dom";
import { iso8601ToYYMMDDHHMM } from "../../styled/Date/DateFomatter";

interface StepProps {
  step?: number;
  next?: () => void;
  prev?: () => void;
  lastStep?: () => void;
}

interface tetherWalletInfoStateType {
  info: TetherCreateRequestType;
  setInfo: Dispatch<SetStateAction<TetherCreateRequestType>>;
}

interface depositRequestStateType {
  request: TetherDepositRequestType;
  setRequest: Dispatch<SetStateAction<TetherDepositRequestType>>;
}

export function Consent(props: { stepFunc: StepProps }) {
  const { next } = props.stepFunc;

  return (
    <>
      <VerticalContainer>
        <Title>입금 전 안내사항</Title>
        <ul>
          <li>반드시 본인의 지갑주소를 정확히 입력하세요.</li>
          <li>안내받은 입금 전용 주소를 정확히 확인 후에 입금하세요.</li>
          <li>회원님의 부주의로 인한 문제 발생 시 반환이 불가합니다.</li>
        </ul>
      </VerticalContainer>

      <ButtonLine>
        <StyledButton type="button" onClick={next}>
          동의
        </StyledButton>
      </ButtonLine>
    </>
  );
}

const formatNumber = (value: number): number => parseFloat(value.toFixed(2));

const isValidTetherAddress = (address: string): boolean => {
  const ethRegex = /^0x[a-fA-F0-9]{40}$/; // ERC-20, BEP-20
  const tronRegex = /^T[a-zA-Z0-9]{33}$/; // TRC-20
  const omniRegex = /^(1|3|bc1)[a-zA-Z0-9]{25,39}$/; // Omni (Bitcoin 기반 주소)

  return (
    ethRegex.test(address) || tronRegex.test(address) || omniRegex.test(address)
  );
};

export function InfoWriting(props: {
  stepFunc: StepProps;
  infoState: tetherWalletInfoStateType;
}) {
  const { stepFunc, infoState } = props;
  const { next, prev, lastStep } = stepFunc;
  const { info, setInfo } = infoState;
  const theme = useTheme();

  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    setInfo((prev) => ({ ...prev, email: email ? email : "" }));
  }, [email, setInfo]);

  const nextStep = () => {
    if (info.email === "") {
      ErrorAlert("이메일을 입력해주세요.");
    } else if (info.tetherWallet === "") {
      ErrorAlert("지갑의 주소를 입력해주세요.");
    } else if (!isValidTetherAddress(info.tetherWallet)) {
      ErrorAlert("유효하지 않은 지갑 주소입니다.");
    } else {
      setLoading(true);
      createOrFindTetherAccount(info)
        .then((result) => {
          setLoading(false);
          SuccessAlert(`${result.email.split("@")[0]} 님 환영합니다.`);
          if (result.accepted !== null) {
            result.accepted ? next?.() : lastStep?.();
          } else {
            next?.();
          }
        })
        .catch((err) => {
          setLoading(false);
          ErrorAlert(err.message);
        });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Title>이메일과 지갑 주소를 입력하세요.</Title>
      <InputLine>
        <StyledInput
          type="text"
          placeholder="이메일을 입력하세요."
          defaultValue={email !== null ? email : ""}
          onChange={(e) => {
            setInfo((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
          theme={theme}
        />
        <StyledInput
          type="text"
          placeholder="지갑 주소를 입력하세요."
          onChange={(e) =>
            setInfo((prev) => ({ ...prev, tetherWallet: e.target.value }))
          }
          theme={theme}
        />
      </InputLine>
      <ButtonLine>
        <StyledButton type="button" onClick={prev}>
          이전
        </StyledButton>
        <StyledButton type="button" onClick={nextStep}>
          다음
        </StyledButton>
      </ButtonLine>
    </>
  );
}

export function DepositRequest(props: {
  stepFunc: StepProps;
  infoState: tetherWalletInfoStateType;
  requestState: depositRequestStateType;
}) {
  const { stepFunc, infoState, requestState } = props;
  const { next, prev } = stepFunc;
  const { info } = infoState;
  const { request, setRequest } = requestState;
  const theme = useTheme();
  const [deposit, setDeposit] = useState<number>(0);
  const { data: exchangeData } = useQuery({
    queryKey: ["getExchangeInfo"],
    queryFn: () => getExchangeInfo(),
    refetchInterval: 300000,
  });

  const payback = import.meta.env.VITE_USDT_PAYBACK;

  const exchangeRate = exchangeData
    ? exchangeData + parseInt(payback.toString())
    : 0;
  const handleDepositInput = (value: string) => {
    const raw = Number(value.replace(/,/g, ""));
    if (!isNaN(raw)) {
      setDeposit(raw / 10000);
    }
  };

  const formattedDeposit = formatNumber(deposit * 10000);

  useEffect(() => {
    setRequest((prev) => ({
      ...prev,
      tetherWallet: info.tetherWallet,
      amount: formatNumber(deposit * 10000),
    }));
  }, [deposit, exchangeRate, info.tetherWallet, setRequest]);

  const nextStep = () => {
    if (exchangeRate === 0) {
      ErrorAlert(`환율정보를 받아오지 못했습니다 잠시후 다시 시도해주세요.`);
    } else if (deposit > 10000) {
      ErrorAlert("최소 만원 이상을 입력해주세요.");
    } else if (!isValidTetherAddress(info.tetherWallet)) {
      ErrorAlert("유효하지 않은 지갑 주소입니다.");
    } else {
      depositRequest(request)
        .then((result) =>
          SuccessAlert(`${result.amount} 원 입금 신청되었습니다.`),
        )
        .then(next)
        .catch((err) => ErrorAlert(err.message));
    }
  };

  return (
    <>
      <HorizontalContainer justifyContent="space-between">
        <h3>{deposit === 0 ? "테더 시세" : "입금되는 테더"}</h3>
        <h3>
          {deposit === 0
            ? `${formatNumber(exchangeRate)} 원`
            : `${formatNumber(
                formatNumber((deposit * 10000) / exchangeRate),
              )} USDT`}
        </h3>
      </HorizontalContainer>
      <HorizontalContainer justifyContent="space-between">
        <h3>입금 금액</h3>
        <div>
          <StyledInput
            align="right"
            placeholder="입금금액"
            value={formattedDeposit}
            onChange={(e) => handleDepositInput(e.target.value)}
            theme={theme}
          />
          <span>원</span>
        </div>
      </HorizontalContainer>
      <VerticalContainer
        css={css`
          gap: 10px;
          margin: 20px 0 50px;
        `}
      >
        <HorizontalContainer justifyContent="space-between" gap={10}>
          <CostButton
            theme={theme}
            onClick={() => setDeposit((prev) => prev + 1)}
          >
            1만원
          </CostButton>
          <CostButton
            theme={theme}
            onClick={() => setDeposit((prev) => prev + 5)}
          >
            5만원
          </CostButton>
          <CostButton
            theme={theme}
            onClick={() => setDeposit((prev) => prev + 10)}
          >
            10만원
          </CostButton>
        </HorizontalContainer>
        <HorizontalContainer justifyContent="space-between" gap={10}>
          <CostButton
            theme={theme}
            onClick={() => setDeposit((prev) => prev + 30)}
          >
            30만원
          </CostButton>
          <CostButton
            theme={theme}
            onClick={() => setDeposit((prev) => prev + 50)}
          >
            50만원
          </CostButton>
          <CostButton
            theme={theme}
            onClick={() => setDeposit((prev) => prev + 100)}
          >
            100만원
          </CostButton>
        </HorizontalContainer>
        <HorizontalContainer justifyContent="space-between" gap={10}>
          <CostButton
            theme={theme}
            onClick={() => setDeposit((prev) => prev + 300)}
          >
            300만원
          </CostButton>
          <CostButton
            theme={theme}
            onClick={() => setDeposit((prev) => prev + 500)}
          >
            500만원
          </CostButton>
          <CostButton theme={theme} onClick={() => setDeposit(0)}>
            초기화
          </CostButton>
        </HorizontalContainer>
      </VerticalContainer>
      <ButtonLine>
        <StyledButton type="button" onClick={prev}>
          이전
        </StyledButton>
        <StyledButton type="button" onClick={nextStep}>
          다음
        </StyledButton>
      </ButtonLine>
    </>
  );
}

export function WaitingForAccepted(props: {
  stepFunc: StepProps;
  infoState: tetherWalletInfoStateType;
  requestState: depositRequestStateType;
}) {
  const { requestState, stepFunc } = props;
  const { step } = stepFunc;
  const { request } = requestState;
  const theme = useTheme();

  const responseWalletRef = useRef<HTMLInputElement>(null);

  const { data: depositRecord } = useQuery({
    queryKey: ["getLatestDepositByWallet"],
    queryFn: () => getLatestDepositByWallet(request.tetherWallet),
    refetchInterval: 2000,
    enabled: Boolean(request.tetherWallet.length !== 0) && step === 3,
  });

  const copyResponseWallet = () => {
    if (!responseWalletRef.current) return;
    const wallet = responseWalletRef.current;
    navigator.clipboard
      .writeText(wallet.value)
      .then(() => {
        SuccessAlert("복사 성공");
      })
      .catch(() => {
        ErrorAlert("복사 실패");
      });
  };

  if (!depositRecord) return;

  const isPending = depositRecord.status === "PENDING";

  return (
    <>
      <Title>입금 지갑 주소 확인</Title>
      <VerticalContainer
        gap={4}
        css={css`
          margin: 20px 0;
        `}
      >
        <StyledInput
          align="center"
          readOnly
          value={import.meta.env.VITE_ACCOUNT_NUMBER}
          type="text"
          css={css`
            width: 500px;
            font-size: 18px;
            font-weight: bold;
            color: ${theme.mode.highlight};
          `}
          ref={responseWalletRef}
          onClick={copyResponseWallet}
          theme={theme}
        />
        <span
          css={css`
            font-family: ${theme.mode.font.component.itemDescription};
            font-size: 14px;
          `}
        >
          위의 주소를 클릭해서 복사하세요.
        </span>
      </VerticalContainer>

      <VerticalContainer
        gap={10}
        css={css`
          width: 80%;
          margin-bottom: 20px;
        `}
      >
        <h3
          css={css`
            font-size: 20px;
          `}
        >
          신청 결과
        </h3>
        <HorizontalContainer fontSize={16} justifyContent="space-between">
          <span>신청금액</span>
          <span>{depositRecord.amount} 원</span>
        </HorizontalContainer>
        <HorizontalContainer fontSize={16} justifyContent="space-between">
          <span>요청일시</span>
          <span>{iso8601ToYYMMDDHHMM(depositRecord.requestedAt)}</span>
        </HorizontalContainer>
        {isPending ? (
          <HorizontalContainer justifyContent="space-between">
            <span>승인일시</span>
            <span>대기중</span>
          </HorizontalContainer>
        ) : (
          <HorizontalContainer fontSize={16} justifyContent="space-between">
            <span>승인일시</span>
            <span>{iso8601ToYYMMDDHHMM(depositRecord.acceptedAt)}</span>
          </HorizontalContainer>
        )}
      </VerticalContainer>
      <div>
        {isPending ? (
          <Spinner />
        ) : (
          <img
            css={css`
              width: 230px;
            `}
            src={AcceptImage}
            alt="Accept"
          />
        )}
      </div>
    </>
  );
}

const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const ButtonLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 80px;
`;

const StyledButton = styled(Button)`
  display: inline-block;
  text-decoration: none;
  background: #5892fc;
  border: none;
  color: white;
  padding: 5px 25px;
  font-size: 1rem;
  border-radius: 3px;
  cursor: pointer;
  font-family: "Nanum Gothic, Tofu", sans-serif;
  position: relative;
`;

const InputLine = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  gap: 30px;

  width: 100%;

  margin: 60px 0;
`;

const StyledInput = styled.input<{
  theme: Theme;
  align?: "left" | "center" | "right";
}>(
  ({ theme, align }) => css`
    border: none;
    font-size: 18px;
    width: 310px;
    height: 30px;
    background-color: ${theme.mode.bodyBackground};

    text-align: ${align};

    &:focus-visible {
      outline: none;
    }
  `,
);

const CostButton = styled(Button)<{ theme: Theme }>(
  ({ theme }) => css`
    background-color: ${theme.mode.cardBackground};
    color: ${theme.mode.textPrimary};
    //box-shadow: none;
    width: 90px;
  `,
);

const HorizontalContainer = styled(Container)<{
  justifyContent?: "flex-start" | "space-between" | "center";
  fontSize?: number;
  gap?: number;
}>(
  ({ justifyContent = "center", fontSize, gap = 0 }) => css`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: ${justifyContent};
    gap: ${gap}px;
    font-size: ${fontSize}px;
  `,
);

const VerticalContainer = styled(Container)<{
  justifyContent?: "flex-start" | "space-between" | "center";
  gap?: number;
}>(
  ({ justifyContent = "center", gap = 0 }) => css`
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: ${justifyContent};
    gap: ${gap}px;
  `,
);
