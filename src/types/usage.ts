import { OrganizationType } from "./organizations";

export interface UsageType {
  _id: number;
  period: string;
  cards: number;
  csv: number;
  emails: number;
  createdLeads: number;
  organization: OrganizationType;
  createdAt: string;
  updatedAt: string;
}

export interface UsageCreateType {
  period: string;
  organization: string;
}
