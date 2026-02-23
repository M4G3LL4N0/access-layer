/**
 * Venue Templates
 * Used by admin seed / onboarding flows to quickly create demo venues.
 *
 * IMPORTANT:
 * - Keep this file dependency-free.
 * - Safe to import from server routes.
 */

export type VenueTemplateKey =
  | "cafe"
  | "workspace"
  | "office"
  | "gym"
  | "parking_garage"
  | "parking_lot"
  | "retail"
  | "storage"
  | "event_venue";

/** Minimal template shape used across routes */
export type VenueTemplate = {
  key: VenueTemplateKey;
  name: string;
  category: string;
  status: "active" | "inactive";
  default_city?: string;
  default_region?: string;
  default_country?: string;

  /** optional defaults for access rules / pricing */
  defaults?: {
    access_mode?: "token" | "qr" | "code" | "hybrid";
    requires_payment?: boolean;
    price_cents?: number;
    require_login?: boolean;
    max_grants_per_user_per_day?: number;
    min_minutes_between_grants?: number;
    days_of_week?: number[]; // 0-6 (Sun-Sat)
    start_time?: string; // "HH:MM"
    end_time?: string;   // "HH:MM"
  };

  /** optional onboarding copy */
  blurb?: string;
};

export const TEMPLATES: Record<VenueTemplateKey, VenueTemplate> = {
  cafe: {
    key: "cafe",
    name: "Cafe / Food & Beverage",
    category: "cafe",
    status: "active",
    defaults: {
      access_mode: "qr",
      requires_payment: false,
      require_login: false,
      days_of_week: [0,1,2,3,4,5,6],
      start_time: "06:00",
      end_time: "22:00",
      max_grants_per_user_per_day: 5,
      min_minutes_between_grants: 10,
    },
    blurb:
      "Great for guest Wi-Fi, staff-only areas, vendor deliveries, and time-bounded entry during peak hours.",
  },

  workspace: {
    key: "workspace",
    name: "Workspace / Coworking",
    category: "workspace",
    status: "active",
    defaults: {
      access_mode: "token",
      requires_payment: true,
      price_cents: 1500,
      require_login: true,
      days_of_week: [1,2,3,4,5],
      start_time: "07:00",
      end_time: "20:00",
      max_grants_per_user_per_day: 3,
      min_minutes_between_grants: 30,
    },
    blurb:
      "Ideal for member access, day passes, visitor tokens, staff verification, and audit trails for compliance.",
  },

  office: {
    key: "office",
    name: "Office / Corporate",
    category: "office",
    status: "active",
    defaults: {
      access_mode: "hybrid",
      requires_payment: false,
      require_login: true,
      days_of_week: [1,2,3,4,5],
      start_time: "06:00",
      end_time: "22:00",
      max_grants_per_user_per_day: 10,
      min_minutes_between_grants: 5,
    },
    blurb:
      "For contractors, visitors, and secure areas: policy-defined access, revocation, and centralized logging.",
  },

  gym: {
    key: "gym",
    name: "Gym / Fitness",
    category: "gym",
    status: "active",
    defaults: {
      access_mode: "qr",
      requires_payment: true,
      price_cents: 999,
      require_login: true,
      days_of_week: [0,1,2,3,4,5,6],
      start_time: "05:00",
      end_time: "23:59",
      max_grants_per_user_per_day: 2,
      min_minutes_between_grants: 60,
    },
    blurb:
      "Membership gating, guest passes, after-hours access with verification, and fraud-resistant entry logs.",
  },

  parking_garage: {
    key: "parking_garage",
    name: "Parking Garage",
    category: "parking",
    status: "active",
    defaults: {
      access_mode: "token",
      requires_payment: false,
      require_login: false,
      days_of_week: [0,1,2,3,4,5,6],
      start_time: "00:00",
      end_time: "23:59",
      max_grants_per_user_per_day: 20,
      min_minutes_between_grants: 1,
    },
    blurb:
      "Validation tokens (like retail validation), plate-entry kiosks, operator verify tools, and event logs.",
  },

  parking_lot: {
    key: "parking_lot",
    name: "Parking Lot",
    category: "parking",
    status: "active",
    defaults: {
      access_mode: "token",
      requires_payment: false,
      require_login: false,
      days_of_week: [0,1,2,3,4,5,6],
      start_time: "00:00",
      end_time: "23:59",
      max_grants_per_user_per_day: 20,
      min_minutes_between_grants: 1,
    },
    blurb:
      "Same validation model as garages, plus enforcement workflows and dispute-friendly audit logs.",
  },

  retail: {
    key: "retail",
    name: "Retail",
    category: "retail",
    status: "active",
    defaults: {
      access_mode: "qr",
      requires_payment: false,
      require_login: false,
      days_of_week: [0,1,2,3,4,5,6],
      start_time: "09:00",
      end_time: "21:00",
      max_grants_per_user_per_day: 5,
      min_minutes_between_grants: 5,
    },
    blurb:
      "Backroom access, vendor delivery windows, manager-only doors, temporary staff onboarding.",
  },

  storage: {
    key: "storage",
    name: "Self Storage",
    category: "storage",
    status: "active",
    defaults: {
      access_mode: "token",
      requires_payment: true,
      price_cents: 2500,
      require_login: true,
      days_of_week: [0,1,2,3,4,5,6],
      start_time: "06:00",
      end_time: "22:00",
      max_grants_per_user_per_day: 6,
      min_minutes_between_grants: 10,
    },
    blurb:
      "Tenant access windows, staff overrides, temporary vendor tokens, and durable audit history.",
  },

  event_venue: {
    key: "event_venue",
    name: "Event Venue",
    category: "events",
    status: "active",
    defaults: {
      access_mode: "qr",
      requires_payment: true,
      price_cents: 3500,
      require_login: false,
      days_of_week: [4,5,6],
      start_time: "18:00",
      end_time: "03:00",
      max_grants_per_user_per_day: 1,
      min_minutes_between_grants: 1,
    },
    blurb:
      "Ticket-like entry tokens, staff scanning/verify, timebox enforcement, and fast post-event reporting.",
  },
};

export const TEMPLATE_KEYS = Object.keys(TEMPLATES) as VenueTemplateKey[];

export function isVenueTemplateKey(v: string): v is VenueTemplateKey {
  return (TEMPLATE_KEYS as string[]).includes(v);
}
