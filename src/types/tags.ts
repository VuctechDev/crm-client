import { UserType } from "./user";

export interface TagType {
    _id: number;
    tag: string;
    description: string;
    color: string;
    organization: string;
    user: UserType;
    leadsCount: number;
    createdAt: string;
    updatedAt: string;
  }