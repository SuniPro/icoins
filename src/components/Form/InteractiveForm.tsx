/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";
import { Button } from "@mui/material";

type StepProps = {
  onNext?: () => void;
  onPrev?: () => void;
};

const StepOne = ({ onNext }: StepProps) => (
  <>
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <Title>입금 전 안내사항</Title>
      <ul>
        <li>반드시 본인의 지갑주소를 정확히 입력하세요.</li>
        <li>안내받은 입금 전용 주소를 정확히 확인 후에 입금하세요.</li>
        <li>회원님의 부주의로 인한 문제 발생 시 반환이 불가합니다.</li>
      </ul>
    </div>

    <StyledButton type="button" onClick={onNext}>
      동의
    </StyledButton>
  </>
);

const StepTwo = ({ onNext, onPrev }: StepProps) => {
  const theme = useTheme();
  return (
    <>
      <Title>유저이름과 지갑 주소를 입력하세요.</Title>
      <InputLine>
        <StyledInput
          type="text"
          placeholder="유저 이름을 입력하세요."
          theme={theme}
        />
        <StyledInput
          type="text"
          placeholder="지갑 주소를 입력하세요."
          theme={theme}
        />
      </InputLine>
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 80px;
        `}
      >
        <StyledButton type="button" onClick={onPrev}>
          이전
        </StyledButton>
        <StyledButton type="button" onClick={onNext}>
          다음
        </StyledButton>
      </div>
    </>
  );
};

const StepThree = ({ onNext, onPrev }: StepProps) => {
  const theme = useTheme();
  const [deposit, setDeposit] = useState<number>(0);

  const formatNumber = (value: number) =>
    value.toLocaleString("ko-KR", { maximumFractionDigits: 2 });

  const handleDepositInput = (value: string) => {
    const raw = Number(value.replace(/,/g, ""));
    setDeposit(isNaN(raw) ? 0 : raw / 10000); // 1 = 1만원
  };

  const exchangeRate = 1400.52 + 0.4;
  return (
    <>
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <h3>{deposit === 0 ? "테더 시세" : "입금할 테더"}</h3>
        <h3>
          {deposit === 0
            ? `${formatNumber(exchangeRate)} 원`
            : `${formatNumber(deposit * 10000 * (exchangeRate / 1000))} 원`}
        </h3>
      </div>
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <h3>입금 금액</h3>
        <StyledInput
          css={css`
            text-align: right;
          `}
          placeholder="입금금액"
          value={formatNumber(deposit * 10000)}
          onChange={(e) => handleDepositInput(e.target.value)}
          theme={theme}
        />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          `}
        >
          <Button
            color="inherit"
            sx={{ width: "90px" }}
            variant="contained"
            onClick={() => setDeposit((prev) => prev + 1)}
          >
            1만원
          </Button>
          <Button
            color="inherit"
            sx={{ width: "90px" }}
            variant="contained"
            onClick={() => setDeposit((prev) => prev + 5)}
          >
            5만원
          </Button>
          <Button
            color="inherit"
            sx={{ width: "90px" }}
            variant="contained"
            onClick={() => setDeposit((prev) => prev + 10)}
          >
            10만원
          </Button>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          `}
        >
          <Button
            color="inherit"
            sx={{ width: "90px" }}
            variant="contained"
            onClick={() => setDeposit((prev) => prev + 30)}
          >
            30만원
          </Button>
          <Button
            color="inherit"
            sx={{ width: "90px" }}
            variant="contained"
            onClick={() => setDeposit((prev) => prev + 50)}
          >
            50만원
          </Button>
          <Button
            color="inherit"
            sx={{ width: "90px" }}
            variant="contained"
            onClick={() => setDeposit((prev) => prev + 100)}
          >
            100만원
          </Button>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          `}
        >
          <Button
            color="inherit"
            sx={{ width: "90px" }}
            variant="contained"
            onClick={() => setDeposit((prev) => prev + 300)}
          >
            300만원
          </Button>
          <Button
            color="inherit"
            sx={{ width: "90px" }}
            variant="contained"
            onClick={() => setDeposit((prev) => prev + 500)}
          >
            500만원
          </Button>
          <Button
            color="inherit"
            sx={{ width: "90px" }}
            variant="contained"
            onClick={() => setDeposit(0)}
          >
            초기화
          </Button>
        </div>
      </div>
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 80px;
        `}
      >
        <StyledButton type="button" onClick={onPrev}>
          이전
        </StyledButton>
        <StyledButton type="button" onClick={onNext}>
          다음
        </StyledButton>
      </div>
    </>
  );
};

const StepFour = ({ onPrev }: StepProps) => {
  const theme = useTheme();
  return (
    <>
      <Title>입금 지갑 주소 확인</Title>
      <InputLine>
        <StyledInput
          readOnly
          value="Zxdsfqerrfxzv12asdasd"
          type="text"
          theme={theme}
        />
        <span>클릭해서 주소를 복사하세요.</span>
      </InputLine>
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <h3>신청 금액</h3>
        <h3>100000</h3>
      </div>
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 80px;
        `}
      >
        <StyledButton type="button" onClick={onPrev}>
          이전
        </StyledButton>
      </div>
    </>
  );
};

export function InteractiveForm() {
  const [step, setStep] = useState(0);

  const next = () => setStep((prev) => prev + 1);

  const prev = () => setStep((prev) => prev - 1);

  const steps = [
    {
      title: "안내사항",
      component: <StepOne onNext={next} />,
    },
    { title: "정보입력", component: <StepTwo onNext={next} onPrev={prev} /> },
    {
      title: "입금",
      component: <StepThree onNext={next} onPrev={prev} />,
    },
    { title: "입금확인", component: <StepFour onPrev={prev} /> },
  ];

  return (
    <>
      <Container>
        <Steps>
          {steps.map((contents, index) => (
            <Step
              key={index}
              active={step === index}
              left={(index * 100) / (steps.length - 1)}
            >
              <Liner active={step >= index + 1} />
              <StepLabel>{contents.title}</StepLabel>
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
          <Slider contentsLength={steps.length} step={step}>
            {steps.map((contents, index) => (
              <SliderList key={index} active={step === index}>
                {contents.component}
              </SliderList>
            ))}
          </Slider>
        </SliderContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  transition: all 0.5s ease;
  width: 400px;
`;

const Steps = styled.div`
  margin-bottom: 10px;
  position: relative;
  height: 25px;
`;

const Step = styled.div<{
  active: boolean;
  left: number;
}>(
  ({ active, left }) => css`
    position: absolute;
    top: 0;
    -webkit-transform: translate(-50%);
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

const StepLabel = styled.span`
  position: relative;
  z-index: 1; // liner 밑에 깔리는 것 방지
  line-height: 25px;
  height: 25px;
  margin: 0;
  color: #777;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
`;

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
    -webkit-transform: translate(-50%, -50%);
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

const Slider = styled.div<{ step: number; contentsLength: number }>(
  ({ step, contentsLength }) => css`
    overflow: hidden;
    width: ${contentsLength * 400}px;
    -webkit-transition: 0.3s all ease;
    -webkit-transform: translate(0px) scale(1);
    -ms-transform: translate(0px) scale(1);

    display: flex;
    transition: transform 0.3s ease;
    transform: ${`translateX(-${step * 400}px)`};
  `,
);

const SliderList = styled.div<{ active: boolean }>(
  ({ active }) => css`
    -webkit-transition: 0.3s all ease;

    float: left;
    width: 400px;
    text-align: center;

    flex-shrink: 0;
    transition: transform 0.3s ease;
    transform: scale(${active ? 1 : 0.5});
  `,
);

const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const StyledButton = styled.button`
  display: inline-block;
  text-decoration: none;
  background: #5892fc;
  border: none;
  color: white;
  padding: 10px 25px;
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

  margin: 40px 0;
`;

const StyledInput = styled.input<{ theme: Theme }>(
  ({ theme }) => css`
    border: none;
    font-size: 18px;
    width: 300px;
    height: 30px;
    background-color: ${theme.mode.bodyBackground};

    &:focus-visible {
      outline: none;
    }
  `,
);
