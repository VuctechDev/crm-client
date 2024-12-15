import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/components/providers/SnackbarContext";
import { login, register } from "./actions";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/consts/routes";

export const useLogin = () => {
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => null,
    onSuccess: () => {
      queryClient.resetQueries();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate(ROUTES.AUTH.LOGIN);
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};

export const useRegister = () => {
  const { openSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: register,
    onError: (error) => openSnackbar(error.message, "error"),
  });
};
