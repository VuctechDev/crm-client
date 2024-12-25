export const ROUTES = {
  HOME: "/",
  AUTH: {
    ROOT: "/auth",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REGISTER_CONFIRMATION: "/auth/register-confirmation",
  },
  CAMPAIGNS: "/campaigns",
  ONBOARDING: {
    ROOT: "/onboarding",
    USER: "/onboarding/user",
    ORGANIZATION: "/onboarding/organization",
  },
  LEADS: {
    ROOT: "/leads",
    PROFILE: "/leads/:id",
    ADD: {
      ROOT: "/leads/add",
      CARDS: "/leads/add/cards",
      CSV: "/leads/add/csv",
      NEW: "/leads/add/new",
    },
  },
  EMAIL: {
    ROOT: "/email",
    NEW: "/email/new",
    SIGNATURE: "/email/signature",
    CONFIG: "/email/config",
    TEMPLATES: "/email/templates",
  },
  TAGS: {
    ROOT: "/tags",
  },
  USAGE: {
    ROOT: "/usage",
  },
  COMMON: {
    EDIT: "edit",
  },
};
