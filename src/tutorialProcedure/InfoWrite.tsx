/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Card, CardContainer, HeadLine } from "@/components/layouts/Layouts";
import { IndexStateProps } from "@/page/Main";
import { StyledFuncButton } from "@/components/styled/Button/Button";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  WalletIcon,
} from "@/components/styled/icons";
import { useEffect, useState } from "react";
import { useJoyride } from "@/context/JoyrideContext";

export function InfoWrite(props: { indexState: IndexStateProps }) {
  const { setState } = props.indexState;

  const { setRun, currentStepIndex } = useJoyride();

  useEffect(() => {
    setRun(true);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentStepIndex === 1) {
      setEmail("test@test.com");
    }

    if (currentStepIndex === 4) {
      setIsVisible(true);
      setWallet("TEST_CRYPTO_WALLET");
    }
  }, [currentStepIndex]);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  return (
    <>
      <CardContainer>
        <Card theme={theme}>
          <HeadLine theme={theme}>정보 입력</HeadLine>
          <div className="flex flex-col gap-4 my-5">
            <Select
              className="input-write-site max-w-full"
              label="사이트를 선택하세요"
              variant="bordered"
              selectedKeys={["TEST"]}
              value="TEST"
              css={css`
                span {
                  color: ${theme.mode.textPrimary};
                }
              `}
            >
              {["TEST"].map((site) => (
                <SelectItem key={site}>{site}</SelectItem>
              ))}
            </Select>
            <Input
              className="input-write-email"
              label="이메일"
              size="sm"
              type="email"
              autoComplete="email"
              variant="underlined"
              color="primary"
              value={email}
              css={css`
                label {
                  color: ${theme.mode.textPrimary} !important;
                }

                svg {
                  cursor: pointer;
                }
              `}
              endContent={
                <WalletIcon className="input-write-wallet-icon text-2xl text-default-400 pointer-events-none" />
              }
            />
            <Input
              className="input-write-wallet w-full"
              css={css`
                label {
                  color: ${theme.mode.textPrimary} !important;
                }
              `}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-solid outline-transparent"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              label="지갑주소"
              type="password"
              variant="underlined"
              color="primary"
              autoComplete="current-password"
              size="sm"
              value={wallet}
            />
          </div>
          <StyledFuncButton
            className="input-write-next w-full"
            type="submit"
            theme={theme}
            backgroundColor={theme.mode.buttonActive}
            onPress={() => setState(1)}
          >
            다음
          </StyledFuncButton>
        </Card>
      </CardContainer>
    </>
  );
}
