import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, createUser, updateUser } from "./actions";
import { useSnackbar } from "@/components/providers/SnackbarContext";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useCreateUser = () => {
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      openSnackbar("personalDataSuccessUpdate");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};

export const useUpdateUser = () => {
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      openSnackbar("personalDataSuccessUpdate");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => openSnackbar(error.message, "error"),
  });
};
