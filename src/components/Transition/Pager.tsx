/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, ReactNode, useEffect } from "react";
import { animated, SpringConfig, useSpring } from "react-spring";
import styled from "@emotion/styled";

interface PagerProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  children: ReactNode[];
  state: number;
  animationConfig?: SpringConfig;
}

const Pager: React.ForwardRefRenderFunction<HTMLDivElement, PagerProps> = (
  {
    children,
    state: index,
    animationConfig = { tension: 190, friction: 20, mass: 0.4 },
    ...other
  },
  ref, // forwardRef를 통해 전달받은 ref
) => {
  const [{ x }, set] = useSpring(() => ({
    x: index * -100,
    config: animationConfig,
  }));

  useEffect(() => {
    set({ x: index * -100 });
  }, [index, set]);

  return (
    <React.Fragment>
      {/* 3. ref를 실제 DOM 요소에 전달합니다. */}
      <Container ref={ref} {...other}>
        <animated.div
          style={{
            flexDirection: "row",
            willChange: "transform",
            minHeight: 0,
            flex: 1,
            display: "flex",
            transform: x.interpolate((x) => `translateX(${x}%)`),
          }}
        >
          {children.map((child, i) => (
            <Child
              key={i}
              tabIndex={index === i ? 0 : -1}
              aria-hidden={i !== index}
            >
              {child}
            </Child>
          ))}
        </animated.div>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  width: 100%;
  height: 100%;
`;

const Child = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: stretch;

  flex-shrink: 0;
`;

export default React.forwardRef(Pager);
