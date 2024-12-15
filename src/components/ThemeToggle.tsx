import { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { IconButton } from "@mui/material";
import { useThemeContext } from "@/components/providers/ThemeProvider";

interface ThemeToggleProps {}

const ThemeToggle: FC<ThemeToggleProps> = (): ReactElement => {
  const { toggleTheme, isDarkTheme } = useThemeContext();
  return (
    <Box>
      <IconButton onClick={toggleTheme} disableRipple>
        {isDarkTheme ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Box>
  );
};

export default ThemeToggle;
