import { LeadType } from "@/types/leads";
import { apiClient } from "..";

const path = "/leads";

export const getLeads = async (
  query: string
): Promise<{ data: LeadType[]; total: number }> => {
  const response = await apiClient.get(`${path}?${query}`);
  return response.data;
};

export const getLeadById = async (id: string): Promise<LeadType> => {
  const response = await apiClient.get(`${path}/${id}`);
  return response.data.data;
};

export const createLead = async (data: LeadType): Promise<any> => {
  const response = await apiClient.post(path, data);
  return response.data;
};

type UpdateLeadArgs = {
  id: string;
  data: LeadType;
};

export const updateLead = async ({
  id,
  data,
}: UpdateLeadArgs): Promise<any> => {
  const response = await apiClient.patch(`${path}?id=${id}`, data);
  return response.data;
};

export const deleteLead = async (id: string) => {
  const response = await apiClient.delete(`${path}?id=${id}`);
  return response.data;
};
