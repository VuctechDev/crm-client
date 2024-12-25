import { UserType } from "./user";

export interface TagType {
  id: string;
  tag: string;
  description: string;
  color: string;
  organization: string;
  user: UserType;
  leadsCount: number;
  createdAt: string;
  updatedAt: string;
}
