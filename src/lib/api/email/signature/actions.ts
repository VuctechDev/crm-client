import { EmailSignatureType } from "@/types/emails";
import { apiClient } from "../..";

const path = "/email/signature";

export const getEmailSignature = async (): Promise<EmailSignatureType> => {
  const response = await apiClient.get(`${path}`);
  return response.data;
};

export const createEmailSignature = async (
  body: string
): Promise<{ success: boolean }> => {
  const response = await apiClient.post(`${path}`, { body });
  return response.data;
};

export const updateEmailSignature = async (
  body: string
): Promise<{ success: boolean }> => {
  const response = await apiClient.patch(`${path}`, { body });
  return response.data;
};
