import { SubscriptionType } from "@/types/subscription";
import { apiClient } from "..";

const path = "/subscriptions";

export const getSubscription = async (): Promise<{
  data: SubscriptionType;
}> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};
