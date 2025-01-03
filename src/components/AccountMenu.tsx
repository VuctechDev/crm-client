import React, { FC, ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem } from "@mui/material";
import { useGetUser } from "@/lib/api/user/queries";
import { useLogout } from "@/lib/api/auth/queries";
import { logOut } from "@/hooks/useLogoutObserver";

interface AccountMenuProps {}

const AccountMenu: FC<AccountMenuProps> = ({}): ReactElement => {
  const { data: user } = useGetUser();
  const { mutate } = useLogout();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleLogout = async () => {
    // try {
    //   mutate();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const displayMenu = Boolean(anchorEl);
  return (
    <Box>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Typography color="text.primary">{user?.firstName}</Typography>
      </Button>
      {displayMenu && (
        <Menu
          open={true}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          disableScrollLock
          slotProps={{ paper: { sx: { "& > ul": { p: 0 } } } }}
        >
          <Box
            sx={(t) => ({
              p: "10px 20px 20px",
            })}
          >
            <Typography>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2">{user?.email}</Typography>
            <Typography>{user?.organization?.name}</Typography>
          </Box>
          <MenuItem sx={{ py: "10px" }} onClick={logOut}>
            {t("logout")}
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
};

export default AccountMenu;
