/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useWindowContext } from "../context/WindowContext";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { login } from "../api/sign";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "../components/Alert";
import { userCreate } from "../api/user";

interface loginInfoType {
  email: string;
  password: string;
}

interface registerInfo {
  username: string;
  email: string;
  password: string;
}

export function Sign() {
  const navigate = useNavigate();
  const theme = useTheme();

  const { windowWidth } = useWindowContext();
  const width = windowWidth < theme.windowSize.mobile ? windowWidth : 500;

  const [isLogin, setIsLogin] = useState(true);

  const [loginInfo, setLoginInfo] = useState<loginInfoType>({
    email: "",
    password: "",
  });

  const [registerInfo, setRegisterInfo] = useState<registerInfo>({
    username: "",
    email: "",
    password: "",
  });

  const loginFn = () => {
    login(loginInfo)
      .then((_) => navigate("/"))
      .catch((err) => ErrorAlert(err.message));
  };

  const registerFn = () => {
    userCreate(registerInfo)
      .then((_) => navigate("/"))
      .catch((err) => ErrorAlert(err.message));
  };

  return (
    <>
      <section
        css={css`
          width: ${width}px;

          background: white;
          border-radius: calc(0.625rem - 2px);
          
          font-family: ${theme.mode.font.component.itemTitle};
        }
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            cursor: pointer;
          `}
        >
          <div
            onClick={() => setIsLogin(true)}
            css={css`
              width: 50%;
              height: 40px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              border-top-left-radius: calc(0.625rem - 2px);
              ${isLogin ? " " : "background : #eaeaea;"}
            `}
          >
            <span>로그인</span>
          </div>
          <div
            onClick={() => setIsLogin(false)}
            css={css`
              width: 50%;
              height: 40px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              border-top-right-radius: calc(0.625rem - 2px);
              ${isLogin ? "background : #eaeaea;" : " "}
            `}
          >
            <span>회원가입</span>
          </div>
        </div>
        <div
          css={css`
            padding: 30px 10px;
            box-sizing: border-box;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 18px;
            `}
          >
            {isLogin ? (
              <Login setLoginInfo={setLoginInfo} />
            ) : (
              <Register
                registerInfo={registerInfo}
                setRegisterInfo={setRegisterInfo}
              />
            )}
            <Button
              onClick={() => (isLogin ? loginFn() : registerFn())}
              css={css`
                width: 90%;
                height: 40px;
                border-radius: calc(0.625rem - 2px);

                background-color: ${theme.mode.highlight};
                color: white;
              `}
            >
              {isLogin ? "로그인" : "회원가입"}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Login(props: {
  setLoginInfo: Dispatch<SetStateAction<{ email: string; password: string }>>;
}) {
  const { setLoginInfo } = props;
  return (
    <>
      <InfoInput>
        <input
          placeholder="E-mail"
          type="email"
          onChange={(e) =>
            setLoginInfo((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </InfoInput>
      <InfoInput>
        <input
          placeholder="Password"
          type="password"
          onChange={(e) =>
            setLoginInfo((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </InfoInput>
    </>
  );
}

function Register(props: {
  registerInfo: registerInfo;
  setRegisterInfo: Dispatch<SetStateAction<registerInfo>>;
}) {
  const { registerInfo, setRegisterInfo } = props;
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  return (
    <>
      <InfoInput>
        <input
          placeholder="Username"
          type="text"
          onChange={(e) =>
            setRegisterInfo((prev) => ({ ...prev, username: e.target.value }))
          }
        />
      </InfoInput>
      <InfoInput>
        <input
          placeholder="E-mail"
          type="email"
          onChange={(e) =>
            setRegisterInfo((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </InfoInput>
      <InfoInput
        isError={
          registerInfo.password !== passwordCheck || passwordCheck.length < 8
        }
      >
        <input
          placeholder="Password"
          type="password"
          onChange={(e) =>
            setRegisterInfo((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </InfoInput>
      <InfoInput
        isError={
          registerInfo.password !== passwordCheck || passwordCheck.length < 8
        }
      >
        <input
          placeholder="Password-Check"
          type="password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
      </InfoInput>
    </>
  );
}

const InfoInput = styled.div<{ isError?: boolean }>(
  ({ isError }) => css`

      width: 90%;
      height: 40px;
      input {
        width: 100%;
        height: 100%;
        border: 1px solid ${isError !== undefined && isError ? "red" : "oklch(92.2% 0 0)"};
        padding: 6px 8px;
        font-size: 14px;

        box-sizing: border-box;

        line-height: calc(1.25 / 0.875);

        border-radius: calc(0.625rem - 2px);
        
        transition: border 500ms ease-in-out;

        &:focus-visible {
          box-shadow:
              0 0 #0000,
              0 0 #0000,
              0 0 #0000,
              0 1px 2px 0 #0000000d;
        }
  `,
);
