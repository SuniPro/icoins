import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { uid } from "uid";

export interface TagType {
  name: string;
  color: string;
}

export interface AdvertisementPropsType {
  image: string;
  color: string;
  title: string;
  description: string;
  tag?: TagType[];
  link: string;
}

// /**
//  * 주어진 width, height 에 대해 도형 크기를 계산해 반환
//  * - 기준: width₀=400 → size₀=76
//  * - 기준: height₀=300 → size₀=76
//  *
//  * @param width  현재 너비
//  * @param height 현재 높이
//  * @returns 보간된 도형 크기
//  */
// function interpolateSize(width: number, height: number): number {
//   const baseWidth = 400;
//   const baseHeight = 300;
//   const baseSize = 76;
//
//   // 너비 기준 스케일
//   const scaleW = width / baseWidth;
//   // 높이 기준 스케일
//   const scaleH = height / baseHeight;
//
//   // 3) 비율이 더 작은 쪽을 택해서 가로·세로 비율 모두 만족하게 하려면
//   // ★ 실제로 쓸 값을 위 3가지 중 하나로 선택하세요 ★
//   return baseSize * Math.min(scaleW, scaleH);
// }

export function Advertisement(props: {
  contents: AdvertisementPropsType;
  width: number;
  height: number;
}) {
  const { width, height } = props;
  const { image, color, title, description, tag, link } = props.contents;
  const theme = useTheme();

  return (
    <>
      <Card theme={theme} width={width}>
        <CardInner
          className="card-inner"
          style={{ color: "#fffff" }}
          backgroundColor={color}
          height={height}
        >
          <Box>
            <ImageBox>
              <Image src={image} alt={image} />
            </ImageBox>
            <Icon color={color} theme={theme}>
              <IconBox href={link} color={color}>
                {" "}
                <ArrowOutwardIcon />
              </IconBox>
            </Icon>
          </Box>
        </CardInner>
        <Content>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <TagList>
            {tag?.map((tag) => (
              <Tag color={tag.color} key={`${uid()}-${tag}`}>
                {tag.name}
              </Tag>
            ))}
          </TagList>
        </Content>
      </Card>
    </>
  );
}

const Card = styled.article<{ width: number; theme: Theme }>(
  ({ width, theme }) => css`
    width: ${width}px;
    background-color: ${theme.mode.cardBackground};
    border-radius: 1.25rem;
  `,
);

const CardInner = styled.div<{ backgroundColor: string; height: number }>(
  ({ backgroundColor, height }) => css`
    position: relative;
    width: inherit;
    height: ${height}px;
    background: ${backgroundColor};
    border-radius: 1.25rem 1.25rem 0 1.25rem;
    overflow: hidden;
  `,
);

const Box = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.mode.cardBackground};
  border-radius: 1.25rem;
  overflow: hidden;
`;

const ImageBox = styled.div`
  position: absolute;
  inset: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Icon = styled.div<{ theme: Theme }>(
  ({ theme }) => css`
    position: absolute;
    bottom: -0.375rem;
    right: -0.375rem;
    width: 6rem;
    height: 6rem;
    background: ${theme.mode.cardBackground};
    border-top-left-radius: 50%;

    &::before {
      position: absolute;
      content: "";
      bottom: 0.375em;
      left: -1.25em;
      background: transparent;
      width: 1.25em;
      height: 1.25em;
      border-bottom-right-radius: 1.25rem;
      box-shadow: 0.313rem 0.313rem 0 0.313rem ${theme.mode.cardBackground};
    }

    &::after {
      position: absolute;
      content: "";
      top: -1.25rem;
      right: 0.375rem;
      background: transparent;
      width: 1.25rem;
      height: 1.25rem;
      border-bottom-right-radius: 1.25rem;
      box-shadow: 0.313rem 0.313rem 0 0.313rem ${theme.mode.cardBackground};
    }

    &:hover > a {
      transform: scale(1.1);
    }
  `,
);

const IconBox = styled.a<{ color: string }>(
  ({ color }) => css`
    position: absolute;
    inset: 0.625rem;
    background: ${color};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;

    & > svg {
      fill: #ffffff;
      width: 1.5rem;
    }
  `,
);

const Content = styled.div`
  width: 100%;
  padding: 0.938rem 1.625rem 2rem 1.625rem;
  box-sizing: border-box;
`;

const Title = styled.h3`
  text-transform: capitalize;
`;

const Description = styled.p`
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.mode.textSecondary};
`;

const TagList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: clamp(8px, 0.8vw, 18px);
`;

const Tag = styled.li<{ color: string }>(
  ({ color }) => css`
    text-transform: uppercase;
    background-color: ${color}35;
    color: ${color};
    font-size: 4%;
    font-weight: 700;
    padding: 1% 1.8%;
    border-radius: 0.188rem;
  `,
);
