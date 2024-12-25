import { CommentType } from "@/types/comment";
import { apiClient } from "..";

const path = "/comments";

export const getComments = async (
  parent: string,
  count: number
): Promise<{ data: CommentType[]; total: number }> => {
  const response = await apiClient.get(
    `${path}?count=${count}&parent=${parent}`
  );
  return response.data.data;
};

export const getCommentById = async (id: string): Promise<CommentType> => {
  const response = await apiClient.get(`${path}/${id}`);
  return response.data.data;
};

export const createComment = async (
  data: Partial<CommentType>
): Promise<any> => {
  const response = await apiClient.post(path, data);
  return response.data;
};

type UpdateCommentArgs = {
  id: string;
  data: CommentType;
};

export const updateComment = async ({
  id,
  data,
}: UpdateCommentArgs): Promise<any> => {
  const response = await apiClient.patch(`${path}?id=${id}`, data);
  return response.data;
};

export const deleteComment = async (id: string) => {
  const response = await apiClient.delete(`${path}?id=${id}`);
  return response.data;
};
