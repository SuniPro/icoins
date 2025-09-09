/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Card, CardContainer, HeadLine } from "@/components/layouts/Layouts";
import { IndexStateProps } from "@/page/Main";
import {
  createOrFindCryptoAccount,
  getCryptoAccountByEmail,
} from "@/api/financial";
import { FormEvent, useEffect, useState } from "react";
import { StyledFuncButton } from "@/components/styled/Button/Button";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  WalletIcon,
} from "@/components/styled/icons";
import { ErrorAlert } from "@/components/Alert/Alerts";
import { UserInfoType } from "@/model/user";
import { useLocation } from "react-router-dom";

export function InfoWrite(props: {
  indexState: IndexStateProps;
  user: UserInfoType | null;
}) {
  const { user } = props;
  const { setState } = props.indexState;
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const siteParam = searchParams.get("site") || null;

  useEffect(() => {
    if (!siteParam) return;
    setSite(siteParam);
  }, [siteParam]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setSite(user.site);
      setCryptoWallet(user.cryptoWallet);
    }
  }, [user]);

  const theme = useTheme();

  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [site, setSite] = useState<string>("");
  const [email, setEmail] = useState("");
  const [cryptoWallet, setCryptoWallet] = useState("");

  const getWallet = () => {
    getCryptoAccountByEmail(email)
      .then((response) => {
        setSite(response.site);
        setCryptoWallet(response.cryptoWallet);
      })
      .catch((error) => ErrorAlert(error.message));
  };

  const WalletCreateAndLogin = () => {
    if (site === "") {
      ErrorAlert("사이트를 선택해주세요.");
    } else if (!email.includes("@")) {
      ErrorAlert("이메일을 형식을 지켜주세요.");
    } else if (cryptoWallet.length < 1) {
      ErrorAlert("지갑주소는 비워둘 수 없습니다.");
    } else {
      createOrFindCryptoAccount({
        site,
        cryptoWallet,
        email,
      })
        .then(() => setState(1))
        .catch((e) => ErrorAlert(e.message));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setIsVisible(false);
    event.preventDefault();
    WalletCreateAndLogin();
  };

  return (
    <>
      <CardContainer>
        <Card theme={theme}>
          <HeadLine theme={theme}>정보 입력</HeadLine>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 my-5">
              <Select
                isDisabled
                className="max-w-full"
                label="사이트를 선택하세요"
                variant="bordered"
                selectedKeys={[site]}
                value={site}
                css={css`
                  span {
                    color: ${theme.mode.textPrimary};
                  }
                `}
              >
                <SelectItem key={site}>{site.toUpperCase()}</SelectItem>
              </Select>
              <Input
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
                  cryptoWallet.length < 2 && (
                    <label onClick={getWallet}>
                      <WalletIcon className="text-2xl text-default-400 pointer-events-none" />
                    </label>
                  )
                }
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="w-full"
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
                type={isVisible ? "text" : "password"}
                variant="underlined"
                color="primary"
                autoComplete="current-password"
                size="sm"
                value={cryptoWallet}
                onChange={(e) => setCryptoWallet(e.target.value)}
              />
            </div>
            <StyledFuncButton
              type="submit"
              className="w-full"
              theme={theme}
              backgroundColor={theme.mode.buttonActive}
            >
              다음
            </StyledFuncButton>
          </form>
        </Card>
      </CardContainer>
    </>
  );
}
