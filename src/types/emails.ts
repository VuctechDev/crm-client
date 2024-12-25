import { LeadType } from "./leads";
import { OrganizationType } from "./organizations";
import { UserType } from "./user";

export interface EmailType {
  id: string;
  body: string;
  emailFrom: string;
  subject: string;
  user: UserType;
  organization: OrganizationType;
  lead: LeadType;
  tag: number;
  emailTo: string;
  status: "failed" | "sent" | "read";
  createdAt: string;
  updatedAt: string;
}

export interface EmailTemplateType {
  id: string;
  name: string;
  description: string;
  body: string;
  user: UserType;
  createdAt: string;
  updatedAt: string;
}

export interface EmailSignatureType {
  id: string;
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
  createdBy: string;
}

export interface EmailConfigPublic {
  id: string;
  email: string;
  createdBy: UserType;
  createdAt: string;
  updatedAt: string;
}
