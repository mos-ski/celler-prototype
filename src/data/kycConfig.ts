export interface KycTierLimits {
  tradeLimitNgn: number;
  withdrawLimitNgn: number;
  method: string;
  approval: "auto" | "manual";
}

export type KycConfig = Record<string, KycTierLimits>;

const DEFAULT_KYC_CONFIG: KycConfig = {
  tier1: { tradeLimitNgn: 1_410_000, withdrawLimitNgn: 141_000, method: "BVN + Liveness Check", approval: "auto" },
  tier2: { tradeLimitNgn: 7_050_000, withdrawLimitNgn: 705_000, method: "Government ID + Address Proof", approval: "auto" },
  tier3: { tradeLimitNgn: 28_200_000, withdrawLimitNgn: 14_100_000, method: "Employment + Risk Assessment", approval: "manual" },
};

const STORAGE_KEY = "celler_kyc_config";

export const kycTierConfig = {
  getConfig: (): KycConfig => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : { ...DEFAULT_KYC_CONFIG };
    } catch {
      return { ...DEFAULT_KYC_CONFIG };
    }
  },
  setConfig: (config: KycConfig) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  },
};
