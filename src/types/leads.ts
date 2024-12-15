import { TagType } from "./tags";

export interface LeadType {
    _id: number;
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
    created: string;
  }