import { OrganizationType } from "./organizations";

export interface UserType {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  birthday: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  avatar: string;
  organization: OrganizationType;
  createdAt: string;
  updatedAt: string;
  status: string;
  lastLogin: string;
  username?: string;
}
