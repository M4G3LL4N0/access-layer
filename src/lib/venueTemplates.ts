export type VenueTemplateKey = "restroom" | "workspace" | "office";

export type VenueTemplate = {
  key: VenueTemplateKey;
  label: string;
  description: string;

  // venues table
  category: string;
  status: "active" | "inactive";

  // access_rules table
  rule_name: string;
  is_enabled: boolean;
  start_time: string; // "HH:MM"
  end_time: string;   // "HH:MM"
  days_of_week: number[]; // 0=Sun..6=Sat
  max_grants_per_user_per_day: number;
  min_minutes_between_grants: number;
  access_mode: "show_pass";
  requires_payment: boolean;
  price_cents: number;
  require_login: boolean;
};

export const TEMPLATES: Record<VenueTemplateKey, VenueTemplate> = {
  restroom: {
    key: "restroom",
    label: "Restroom (public pilot)",
    description:
      "High-frequency, quick interactions. Rate-limit to prevent abuse. Staff verifies pass.",
    category: "restroom",
    status: "active",
    rule_name: "Default Restroom Rule",
    is_enabled: true,
    start_time: "08:00",
    end_time: "18:00",
    days_of_week: [0, 1, 2, 3, 4, 5, 6],
    max_grants_per_user_per_day: 3,
    min_minutes_between_grants: 30,
    access_mode: "show_pass",
    requires_payment: false,
    price_cents: 0,
    require_login: false,
  },

  workspace: {
    key: "workspace",
    label: "Workspace (coworking / lounge)",
    description:
      "Lower frequency, longer dwell. Good for day passes, guest rules, and owner controls later.",
    category: "workspace",
    status: "active",
    rule_name: "Default Workspace Rule",
    is_enabled: true,
    start_time: "08:00",
    end_time: "20:00",
    days_of_week: [1, 2, 3, 4, 5],
    max_grants_per_user_per_day: 1,
    min_minutes_between_grants: 240,
    access_mode: "show_pass",
    requires_payment: false,
    price_cents: 0,
    require_login: false,
  },

  office: {
    key: "office",
    label: "Office (front desk / visitor)",
    description:
      "Visitor workflow: fewer passes, stricter rate limits. Great for B2B proofs.",
    category: "office",
    status: "active",
    rule_name: "Default Office Visitor Rule",
    is_enabled: true,
    start_time: "09:00",
    end_time: "18:00",
    days_of_week: [1, 2, 3, 4, 5],
    max_grants_per_user_per_day: 1,
    min_minutes_between_grants: 720,
    access_mode: "show_pass",
    requires_payment: false,
    price_cents: 0,
    require_login: false,
  },
};

export function listTemplates() {
  return Object.values(TEMPLATES);
}
