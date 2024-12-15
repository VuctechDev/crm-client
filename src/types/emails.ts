import { LeadType } from "./leads";
import { OrganizationType } from "./organizations";
import { UserType } from "./user";

export interface EmailType {
  _id: number;
  body: string;
  from: string;
  subject: string;
  user: UserType;
  organization: OrganizationType;
  lead: LeadType;
  tag: number;
  to: string;
  status: "failed" | "sent" | "read";
  createdAt: string;
  updatedAt: string;
}

export interface EmailTemplateType {
  _id: number;
  name: string;
  description: string;
  body: string;
  user: UserType;
  createdAt: string;
  updatedAt: string;
}

export interface EmailSignatureType {
  _id: number;
  body: string;
  user: UserType;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmailConfigCreateType {
  host: string;
  email: string;
  password: string;
  iv: string;
  port: string;
  organization: string;
  user: string;
}

export interface EmailConfigPublic {
  _id: number;
  email: string;
  user: UserType;
  createdAt: string;
  updatedAt: string;
}
