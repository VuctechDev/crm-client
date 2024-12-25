import { UserType } from "./user";

export interface CommentType {
  id: string;
  comment: string;
  createdBy: UserType;
  parent: string;
  edited: boolean;
  createdAt: string;
  updatedAt: string;
}
