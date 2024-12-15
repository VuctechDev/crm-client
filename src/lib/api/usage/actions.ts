import { UsageType } from "@/types/usage";
import { apiClient } from "..";

const path = "/usage";

export const getUsage = async (): Promise<{ data: UsageType }> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};
