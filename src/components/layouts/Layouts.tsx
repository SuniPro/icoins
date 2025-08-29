import { css, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import { Container } from "./Frames/FrameLayouts";

export const HeadLine = styled.h1<{ theme: Theme; textAlign?: string }>(
  ({ theme, textAlign = "left" }) => css`
    text-align: ${textAlign};
    font-size: 16px;
    font-weight: 600;
    font-family: ${theme.mode.font.component.itemTitle};
  `,
);

export function CardContainer({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full flex flex-col items-center p-2 box-border">
      {children}
    </div>
  );
}

export const Card = styled.div<{ theme: Theme }>(
  ({ theme }) => css`
    width: 100%;
    padding: 30px 28px;
    background-color: white;
    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    margin: 0 8px;

    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: ${theme.borderRadius.roundedBox};
  `,
);

export const ContentsContainer = styled(Container)`
  width: 90%;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

/** 범용적으로 사용되는 컨테이너 컴포넌트입니다.
 * 주로 자녀 요소의 정렬을 위해 사용됩니다.
 * */
export function OutLine(props: {
  className?: string;
  title?: string;
  children: ReactNode;
  alignItems?: "center" | "flex-start";
}) {
  const { className, title, alignItems = "center", children } = props;
  const theme = useTheme();
  return (
    <OutLineContainer
      className={className}
      theme={theme}
      alignItems={alignItems}
    >
      {title && <OutLineTitle>{title}</OutLineTitle>}
      {children}
    </OutLineContainer>
  );
}

const OutLineContainer = styled.div<{
  theme: Theme;
  alignItems: "center" | "flex-start";
}>(
  ({ theme, alignItems }) => css`
    display: flex;
    padding: 16px;
    flex-direction: column;
    justify-content: space-between;
    align-items: ${alignItems};
    width: 100%;
    height: auto;
    border: 1px solid ${theme.mode.textSecondary};
    border-radius: ${theme.borderRadius.softBox};
    background: ${theme.mode.cardBackground};
    box-sizing: border-box;
  `,
);

const OutLineTitle = styled.div(
  ({ theme }) => css`
    width: 100%;
    color: ${theme.mode.textPrimary};
    /* Default/Label/12px-Eb */
    font-family: ${theme.mode.font.component.itemTitle};
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 133.333% */
  `,
);
