import { css, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

export function NewsCard(props: {
  image: string;
  color: string;
  contents: string;
  description?: string;
  subLine?: string;
}) {
  const { image, color, description, subLine } = props;
  const theme = useTheme();

  return (
    <CardContainer>
      <Card color={image}>
        <CardShape>
          <Image src={image}></Image>
          <ShapeDividerBottom>
            <Layer color={color} />
          </ShapeDividerBottom>
        </CardShape>
        <CardBody>
          <Blockquote color={color} contents="" theme={theme} />
        </CardBody>
        <CardFooter
          color={color}
          theme={theme}
          description={description}
          subLine={subLine}
        ></CardFooter>
      </Card>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  flex: 0 0 auto;
`;

const Card = styled.div<{ color: string }>(
  ({ color }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    overflow: hidden;
    padding-right: 0;
    padding-left: 0;

    height: 100%;

    border-radius: 6px;
    border-bottom: 4px solid ${color};
  `,
);

const CardShape = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
`;

const ShapeDividerBottom = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
`;

function Layer(props: { color: string }) {
  return (
    <SvgCover
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      color={props.color}
    >
      <path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        opacity=".25"
        className="shape-fill"
      ></path>
      <path
        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
        opacity=".5"
        className="shape-fill"
      ></path>
      <path
        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
        className="shape-fill"
      ></path>
    </SvgCover>
  );
}

const SvgCover = styled.svg<{ color: string }>(
  ({ color }) => css`
    position: relative;
    display: block;
    width: 100%;
    height: 50px;

    fill: ${color};
  `,
);

const CardBody = styled.div`
  padding: 1rem 1.5rem;
  flex: 1 1 auto;
`;

function Blockquote(props: { theme: Theme; color: string; contents: string }) {
  const { theme, color, contents } = props;
  return (
    <BlockquoteContainer>
      <BlockquoteCover
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 475.082 475.081"
        x="0px"
        y="0px"
        width="25px"
        height="25px"
        xmlnsXlink="http://www.w3.org/XML/1998/namespace"
        xmlSpace="preserve"
        version="1.1"
        color={color}
      >
        <g>
          <g>
            <path d="M 164.45 219.27 h -63.954 c -7.614 0 -14.087 -2.664 -19.417 -7.994 c -5.327 -5.33 -7.994 -11.801 -7.994 -19.417 v -9.132 c 0 -20.177 7.139 -37.401 21.416 -51.678 c 14.276 -14.272 31.503 -21.411 51.678 -21.411 h 18.271 c 4.948 0 9.229 -1.809 12.847 -5.424 c 3.616 -3.617 5.424 -7.898 5.424 -12.847 V 54.819 c 0 -4.948 -1.809 -9.233 -5.424 -12.85 c -3.617 -3.612 -7.898 -5.424 -12.847 -5.424 h -18.271 c -19.797 0 -38.684 3.858 -56.673 11.563 c -17.987 7.71 -33.545 18.132 -46.68 31.267 c -13.134 13.129 -23.553 28.688 -31.262 46.677 C 3.855 144.039 0 162.931 0 182.726 v 200.991 c 0 15.235 5.327 28.171 15.986 38.834 c 10.66 10.657 23.606 15.985 38.832 15.985 h 109.639 c 15.225 0 28.167 -5.328 38.828 -15.985 c 10.657 -10.663 15.987 -23.599 15.987 -38.834 V 274.088 c 0 -15.232 -5.33 -28.168 -15.994 -38.832 C 192.622 224.6 179.675 219.27 164.45 219.27 Z"></path>
            <path d="M 459.103 235.256 c -10.656 -10.656 -23.599 -15.986 -38.828 -15.986 h -63.953 c -7.61 0 -14.089 -2.664 -19.41 -7.994 c -5.332 -5.33 -7.994 -11.801 -7.994 -19.417 v -9.132 c 0 -20.177 7.139 -37.401 21.409 -51.678 c 14.271 -14.272 31.497 -21.411 51.682 -21.411 h 18.267 c 4.949 0 9.233 -1.809 12.848 -5.424 c 3.613 -3.617 5.428 -7.898 5.428 -12.847 V 54.819 c 0 -4.948 -1.814 -9.233 -5.428 -12.85 c -3.614 -3.612 -7.898 -5.424 -12.848 -5.424 h -18.267 c -19.808 0 -38.691 3.858 -56.685 11.563 c -17.984 7.71 -33.537 18.132 -46.672 31.267 c -13.135 13.129 -23.559 28.688 -31.265 46.677 c -7.707 17.987 -11.567 36.879 -11.567 56.674 v 200.991 c 0 15.235 5.332 28.171 15.988 38.834 c 10.657 10.657 23.6 15.985 38.828 15.985 h 109.633 c 15.229 0 28.171 -5.328 38.827 -15.985 c 10.664 -10.663 15.985 -23.599 15.985 -38.834 V 274.088 C 475.082 258.855 469.76 245.92 459.103 235.256 Z"></path>
          </g>
        </g>
      </BlockquoteCover>
      <Contents theme={theme}>{contents}</Contents>
    </BlockquoteContainer>
  );
}

const BlockquoteContainer = styled.blockquote`
  margin: 0 0 1rem;
`;

const BlockquoteCover = styled.svg<{ color: string }>(
  ({ color }) => css`
    fill: ${color};
  `,
);

const Contents = styled.p<{ theme: Theme }>(
  ({ theme }) => css`
    color: ${theme.mode.textPrimary};
    margin-top: 0.5rem;
  `,
);

function CardFooter(props: {
  color: string;
  theme: Theme;
  description?: string;
  subLine?: string;
}) {
  const { color, theme, description, subLine } = props;
  return (
    <CardFooterContainer theme={theme} color={color}>
      <Description>{description}</Description>
      <small>{subLine}</small>
    </CardFooterContainer>
  );
}

const CardFooterContainer = styled.div<{ theme: Theme; color: string }>(
  ({ theme, color }) => css`
    padding: 0.5rem 1rem;
    background-color: rgba(0, 0, 0, 0.03);
    border-top: 1px solid rgba(0, 0, 0, 0.125);
    color: ${color};

    &:last-child {
      border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
    }

    small {
      color: ${theme.colors.steelGray};
    }
  `,
);

const Description = styled.p`
  margin-bottom: 0;
`;
