import { css, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { useWindowContext } from "../../../context/WindowContext";
import { useProportionHook } from "../../../hooks/useWindowHooks";

const MENU_LIST = ["PAYBACK", "EVENT", "TRANSITION"];

/** 여백을 위한 GAP을 받습니다.
 * GAP은 string 타입이니, 전달하실때 margin-bottom : 10px; 형태로 전달하시면 됩니다.
 * */
export function MainNavigation(props: { gap?: string }) {
  const { gap } = props;
  const theme = useTheme();

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const { windowWidth } = useWindowContext();

  const { size } = useProportionHook(
    windowWidth,
    windowWidth - 100,
    theme.windowSize.tablet,
  );

  const lineWidth = size / 3;

  return (
    <Container theme={theme} ref={containerRef} gap={gap}>
      <ul>
        {MENU_LIST.map((menu, i) => (
          <List key={menu} onClick={() => setActiveIndex(i)} width={lineWidth}>
            {menu}
          </List>
        ))}
        <Underline
          left={lineWidth * activeIndex}
          width={lineWidth}
          theme={theme}
        />
      </ul>
    </Container>
  );
}

const List = styled.li<{ width: number }>(
  ({ width }) => css`
    width: ${width}px;
    height: 20px;

    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    cursor: pointer;
  `,
);

const Underline = styled(List)<{ left: number; width: number; theme: Theme }>(
  ({ left, width, theme }) => css`
    position: absolute !important;
    width: ${width}px;
    height: 2px;

    bottom: 0;

    left: ${left}px;

    background-color: ${theme.mode.textAccent};
    transition:
      left 0.3s ease,
      width 0.3s ease;
  `,
);

export const Container = styled.div<{ theme: Theme; gap?: string }>(
  ({ theme, gap }) => css`
    width: 100%;

    height: 20px;

    ${gap};

    ul {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: 0;
      padding: 16px 0;

      font-family: ${theme.mode.font.component.itemTitle};

      li {
        position: relative;

        list-style: none;
        margin: 0;
        padding: 0;
      }
    }
  `,
);
