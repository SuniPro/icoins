/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";
import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { StyledBadge } from "../Layouts";
import { CustomModal } from "../../modal";
import { useState } from "react";
import { Sign } from "../../../page/Sign";

export function Header() {
  // const {user} = useUserContext();

  const [openSign, setOpenSign] = useState(false);

  const theme = useTheme();

  return (
    <>
      <HeaderContainer theme={theme}>
        <HeaderLogo theme={theme}>i coins</HeaderLogo>
        <UserLine>
          <UserProfile onClick={() => setOpenSign(true)}>
            <span>Log in</span>
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
      <CustomModal
        open={openSign}
        close={() => setOpenSign(false)}
        children={<Sign />}
      ></CustomModal>
    </>
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
  `,
);

const UserProfile = styled.div`
  padding-right: 10px;
`;

const HeaderLogo = styled.span<{ theme: Theme }>(
  ({ theme }) => css`
    font-weight: 800;
    font-size: 38px;
    transform: translateY(6%);

    color: ${theme.mode.logo.color};
    font-family: ${theme.mode.logo.font};
  `,
);

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
