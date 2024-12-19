import { useLogout } from "@/lib/api/auth/queries";
import { ROUTES } from "@/lib/consts/routes";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const logOutEvent = new CustomEvent("logOut", {
  detail: { message: "Hello from custom event!", time: new Date() },
});

export const logOut = () => window.dispatchEvent(logOutEvent);

export const useLogoutObserver = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useEffect(() => {
    const handleLogOut = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      queryClient.resetQueries();

      console.log("Custom event triggered!");
      // window.location.href = ROUTES.AUTH.LOGIN;
      // navigate(ROUTES.AUTH.LOGIN);
    };

    window.addEventListener("logOut", () => {
      handleLogOut();
    });

    return () => {
      window.removeEventListener("logOut", () => {
        handleLogOut();
      });
    };
  }, []);
};
