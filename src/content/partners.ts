export type PartnerType =
  | "driver"
  | "hotel"
  | "rental"
  | "school"
  | "venue"
  | "organiser"
  | "blogger";

export type Partner = {
  code: string;
  name: string;
  type: PartnerType;
  active: boolean;
  commissionPct: number;
  contact?: {
    name?: string;
    phone?: string;
    email?: string;
  };
};

/**
 * TODO(owner): paste approved partners here, each with a unique
 * `referral_code`. In production this is replaced by the `partners` table.
 */
export const partners: Partner[] = [];

export function findPartner(code: string) {
  return partners.find((p) => p.active && p.code === code);
}
