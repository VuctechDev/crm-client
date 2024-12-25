import { TagType } from "./tags";

export interface LeadType {
  id: string;
  website: string;
  firstName: string;
  lastName: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  industry: string;
  employees: string;
  archived: boolean;
  tags: TagType[];
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  owner: string;
}
