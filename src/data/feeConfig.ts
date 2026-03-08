export interface FeeConfig {
  tradeFeePercent: number;       // Buy/sell commission %
  withdrawalFeePercent: number;  // Crypto withdrawal fee %
  swapFeePercent: number;        // Swap fee %
  ngnRateMarkupPercent: number;  // Markup over mid-market NGN rate %
}

const FEE_CONFIG_KEY = "cex_fee_config";

const DEFAULT_FEE_CONFIG: FeeConfig = {
  tradeFeePercent: 1.5,
  withdrawalFeePercent: 0.5,
  swapFeePercent: 0.8,
  ngnRateMarkupPercent: 2.0,
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export const feeStore = {
  getConfig: (): FeeConfig => readJson(FEE_CONFIG_KEY, DEFAULT_FEE_CONFIG),
  setConfig: (c: FeeConfig) => localStorage.setItem(FEE_CONFIG_KEY, JSON.stringify(c)),
};
