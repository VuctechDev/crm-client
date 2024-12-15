import { UserType } from "./user";

export interface CommentType {
  _id: number;
  comment: string;
  createdBy: UserType;
  parent: number;
  edited: boolean;
  createdAt: string;
  updatedAt: string;
}
