import Box from "@mui/material/Box";
import AppBar from "./AppBar";
import { Outlet } from "react-router-dom";
import { RouteGuard } from "../components/providers";

const PublicLayout: React.FC = () => {
  return (
    <RouteGuard>
      <Box
        width={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <AppBar open={false} publicPage={true} />
        <Outlet />
      </Box>
    </RouteGuard>
  );
};

export default PublicLayout;
