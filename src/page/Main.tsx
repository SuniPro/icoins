/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ContentsContainer } from "../components/layouts/Layouts";
import { Logo, LogoContainer, LogoText } from "../components/Logo/Logo";
import { css, Theme, useTheme } from "@emotion/react";
import { InteractiveForm } from "../components/Form/InteractiveForm";

export function Main() {
  const theme = useTheme();
  return (
    <MainContainer>
      <LogoContainer width={630} height={140}>
        <Logo fontSize={80} />
        <SubjectTitle theme={theme}>
          오직 당신을 위한 프라이빗 안전거래 시스템
        </SubjectTitle>
      </LogoContainer>
      <div
        css={css`
          display: flex;
          flex-direction: column;

          justify-content: center;
          align-items: center;
          margin-top: 40px;
          margin-bottom: 70px;

          gap: 10px;
        `}
      >
        <SubjectTitle theme={theme} fontSize={20}>
          업비트와 빗썸은 필수입니다.
        </SubjectTitle>
        <SubjectTitle theme={theme} fontSize={20}>
          <LogoText fontSize={28} /> 의 이용방법을 모르신다면,&nbsp;
          <a
            css={css`
              font-size: 20px;
              cursor: pointer;
            `}
          >
            여기를 클릭하세요.
          </a>
        </SubjectTitle>
      </div>
      <ContentsContainer>
        <InteractiveForm />
      </ContentsContainer>
    </MainContainer>
  );
}

const SubjectTitle = styled.span<{ theme: Theme; fontSize?: number }>(
  ({ theme, fontSize }) => css`
    font-family: ${theme.mode.font.component.itemTitle};
    font-size: ${fontSize}px;
  `,
);

const MainContainer = styled.main`
  width: 100%;
  margin-top: 2.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ul {
    padding: 0;
    li {
      text-align: left;
      margin: 0 0 10px;
    }
  }
`;
