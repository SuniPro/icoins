/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";
import { ConfirmAlert, SuccessAlert } from "../../Alert";
import { logout } from "../../../api/sign";
import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { StyledBadge } from "../Layouts";

export function Header() {
  // const {user} = useUserContext();

  const theme = useTheme();

  return (
    <HeaderContainer theme={theme}>
      <HeaderLogo>i coins</HeaderLogo>
      <UserLine>
        <UserProfile
          onClick={() =>
            ConfirmAlert("로그아웃하시겠습니까?", () =>
              logout().then(() => {
                SuccessAlert("로그아웃 되었습니다.");
              }),
            )
          }
        >
          Suni. 님
        </UserProfile>
        <IconButton>
          <StyledNotifyIcon
            fontSize="medium"
            color="success"
            theme={theme}
            // onClick={() => setActiveMenu("notice")}
          />
          <StyledBadge badgeContent={2} color="error" overlap="circular" />
        </IconButton>
      </UserLine>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div<{ theme: Theme }>(
  ({ theme }) => css`
    height: 60px;
    z-index: 1;
    top: 0;
    position: fixed;
    width: 100%;
    box-sizing: border-box;

    font-family: ${theme.mode.font.header.user};
    background-color: ${theme.mode.cardBackground};
    padding: 10px 2rem;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;

      gap: 10px;

      li {
        padding: 0;
      }
    }

    span {
      color: ${theme.mode.logo.color};
      font-family: ${theme.mode.logo.font};
    }
  `,
);

const UserProfile = styled.div`
  padding-right: 10px;
`;

const HeaderLogo = styled.span`
  font-weight: 800;
  font-size: 38px;
  transform: translateY(6%);
`;

const StyledNotifyIcon = styled(NotificationsIcon)<{ theme: Theme }>(
  ({ theme }) => css`
    fill: ${theme.colors.honeyHaze};
    position: absolute;
  `,
);

const UserLine = styled.section`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;
