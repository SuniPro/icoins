import { useState } from "react";
import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";
import {
  TetherCreateRequestType,
  TetherDepositRequestType,
} from "../../model/financial";
import {
  DepositRequest,
  InfoWriting,
  RequestDeposit,
  WaitingAccepted,
} from "./Steps";
import { useProportionHook } from "../../hooks/useWindowHooks";

export function InteractiveForm(props: { windowWidth: number }) {
  const { windowWidth } = props;
  const theme = useTheme();

  const [step, setStep] = useState(0);

  const [info, setInfo] = useState<TetherCreateRequestType>({
    email: "",
    site: null,
    tetherWallet: "",
  });

  const [request, setRequest] = useState<TetherDepositRequestType>({
    tetherWallet: "",
    amount: 0,
    usdtAmount: 0,
  });

  const { size } = useProportionHook(
    windowWidth,
    theme.windowSize.mobile - 100,
    theme.windowSize.mobile,
  );
  const stepWidth = useProportionHook(windowWidth, 80, theme.windowSize.mobile);

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);
  const lastStep = () => setStep(steps.length - 1);

  const steps = [
    {
      title: "정보입력",
      component: (
        <InfoWriting
          stepFunc={{ next, prev, lastStep }}
          infoState={{
            info,
            setInfo,
          }}
        />
      ),
    },
    {
      title: "시세확인",
      component: (
        <DepositRequest
          stepFunc={{ next, prev }}
          infoState={{ info, setInfo }}
          requestState={{
            request,
            setRequest,
          }}
        />
      ),
    },
    {
      title: "입금신청",
      component: (
        <RequestDeposit
          stepFunc={{ next, prev, step }}
          infoState={{
            info,
            setInfo,
          }}
          requestState={{
            request,
            setRequest,
          }}
        />
      ),
    },
    {
      title: "입금확인",
      component: (
        <WaitingAccepted
          stepFunc={{ next, prev, step }}
          infoState={{
            info,
            setInfo,
          }}
          requestState={{
            request,
            setRequest,
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Container width={size}>
        <Steps>
          {steps.map((contents, index) => (
            <Step
              key={index}
              active={step === index}
              left={(index * 100) / (steps.length - 1)}
              width={stepWidth.size}
            >
              <Liner active={step >= index + 1} />
              <StepLabel theme={theme}>{contents.title}</StepLabel>
            </Step>
          ))}
        </Steps>
        <Line>
          <DotMove left={(step * 100) / (steps.length - 1)} />
          {steps.map((_, index) => (
            <Dot
              key={index}
              isActive={step === index}
              left={(index * 100) / (steps.length - 1)}
            />
          ))}
        </Line>
        <SliderContainer>
          <Slider contentsLength={steps.length} step={step} width={size}>
            {steps.map((contents, index) => (
              <SliderList key={index} active={step === index} width={size}>
                {contents.component}
              </SliderList>
            ))}
          </Slider>
        </SliderContainer>
      </Container>
    </>
  );
}

const Container = styled.div<{ width: number }>(
  ({ width }) => css`
    position: relative;
    transition: all 0.5s ease;
    width: ${width}px;
  `,
);

const Steps = styled.div`
  margin-bottom: 10px;
  position: relative;
  height: 25px;
`;

const Step = styled.div<{
  active: boolean;
  left: number;
  width: number;
}>(
  ({ active, left }) => css`
    position: absolute;
    top: 0;
    -ms-transform: translate(-50%);
    transform: translate(-50%);
    height: 25px;
    padding: 0 5px;
    display: inline-block;
    width: 80px;
    text-align: center;
    -webkit-transition: 0.3s all ease;
    transition: 0.3s all ease;
    clip: ${active ? "rect(0, 100px, 25px, 0px)" : ""};

    left: ${left}%;
  `,
);

const Liner = styled.div<{ active: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  margin-top: -1px;
  background: #999;
  transition: width 0.3s ease;
  z-index: 0;
  width: ${({ active }) => (active ? "100%" : "0%")};
`;

const StepLabel = styled.span<{ theme: Theme }>(
  ({ theme }) => css`
    position: relative;
    z-index: 1; // liner 밑에 깔리는 것 방지
    line-height: 25px;
    height: 25px;
    margin: 0;
    color: ${theme.mode.textSecondary};
    font-family: "Roboto", sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
  `,
);

const Dot = styled.div<{ isActive: boolean; left: number }>(
  ({ isActive, left }) => css`
    position: absolute;
    top: 50%;
    left: ${left}%;
    width: 15px;
    height: 15px;
    background: ${isActive ? "#5892fc" : "#bbb"};
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0.5);
    transition: 0.3s all ease;
  `,
);

const DotMove = styled.div<{ left: number }>(
  ({ left }) => css`
    position: absolute;
    top: 50%;
    width: 15px;
    height: 15px;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: #ddd;
    border-radius: 50%;
    -webkit-transition: 0.3s all ease;
    transition: 0.3s all ease;

    left: ${left}%;
  `,
);

const Line = styled.div`
  width: 100%;
  height: 5px;
  background: #ddd;
  position: relative;
  border-radius: 10px;
  overflow: visible;
  margin-bottom: 50px;
`;

const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Slider = styled.div<{
  step: number;
  contentsLength: number;
  width: number;
}>(
  ({ step, contentsLength, width }) => css`
    width: ${contentsLength * width}px;
    -webkit-transition: 0.3s all ease;
    -ms-transform: translate(0px) scale(1);

    display: flex;
    transition: transform 0.3s ease;
    transform: ${`translateX(-${step * width}px)`};
  `,
);

const SliderList = styled.div<{ active: boolean; width: number }>(
  ({ active, width }) => css`
    -webkit-transition: 0.3s all ease;

    float: left;
    width: ${width}px;
    text-align: center;

    flex-shrink: 0;
    transition: transform 0.3s ease;
    transform: scale(${active ? 1 : 0.5});

    display: flex;
    flex-direction: column;
    align-items: center;
  `,
);
