/** @jsxImportSource @emotion/react */
import { useQuery } from "@tanstack/react-query";
import { getAllSites } from "@/api/site";
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

export function InfoWrite(props: {
  indexState: IndexStateProps;
  user: UserInfoType | null;
}) {
  const { user } = props;
  const { setState } = props.indexState;

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

  const { data: siteList } = useQuery({
    queryKey: ["siteList"],
    queryFn: () => getAllSites(),
  });

  const getWallet = () => {
    getCryptoAccountByEmail(email)
      .then((response) => {
        setSite(response.site);
        setCryptoWallet(response.cryptoWallet);
      })
      .catch((error) => ErrorAlert(error.message));
  };

  const WalletCreateAndLogin = () => {
    if (site.length !== 0) {
      createOrFindCryptoAccount({
        site,
        cryptoWallet,
        email,
      })
        .then(() => setState(1))
        .catch((e) => ErrorAlert(e.message));
    } else {
      ErrorAlert("사이트를 선택해주세요.");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setIsVisible(false);
    event.preventDefault();
    WalletCreateAndLogin();
  };

  if (!siteList) return;

  return (
    <>
      <CardContainer>
        <Card theme={theme}>
          <HeadLine theme={theme}>정보 입력</HeadLine>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 my-5">
              <Select
                className="max-w-full"
                label="사이트를 선택하세요"
                variant="bordered"
                selectedKeys={[site]}
                value={site}
                onChange={(e) => setSite(e.target.value)}
                css={css`
                  * {
                    background-color: #f4f4f4 !important;
                    border-radius: 10px;
                  }
                `}
              >
                {siteList.map((site) => (
                  <SelectItem key={site.site}>
                    {site.site.toUpperCase()}
                  </SelectItem>
                ))}
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
