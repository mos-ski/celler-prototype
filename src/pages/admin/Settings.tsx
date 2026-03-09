import { useState } from "react";
import { adminUser } from "@/data/adminMockData";
import { referralStore, ReferralConfig } from "@/lib/referral";
import { feeStore, FeeConfig } from "@/data/feeConfig";
import { kycTierConfig, KycConfig } from "@/data/kycConfig";
import { formatNgn } from "@/lib/crypto";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const settingsTabs = ["General", "Fees", "KYC Limits", "Referrals", "Notifications"];

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [firstName, setFirstName] = useState(adminUser.firstName);
  const [lastName, setLastName] = useState(adminUser.lastName);
  const [isEditing, setIsEditing] = useState(false);

  // Referral config
  const [referralConfig, setReferralConfig] = useState<ReferralConfig>(referralStore.getConfig());
  // Fee config
  const [feeConfig, setFeeConfig] = useState<FeeConfig>(feeStore.getConfig());
  // KYC config
  const [kycConfig, setKycConfig] = useState<KycConfig>(kycTierConfig.getConfig());

  const handleSave = () => {
    toast.success("Settings saved successfully!");
    setIsEditing(false);
  };

  const handleSaveReferralConfig = () => {
    referralStore.setConfig(referralConfig);
    toast.success("Referral settings saved!");
  };

  const handleSaveFeeConfig = () => {
    feeStore.setConfig(feeConfig);
    toast.success("Fee settings saved!");
  };

  const feeFields: { key: keyof FeeConfig; label: string; description: string }[] = [
    { key: "tradeFeePercent", label: "Trade Fee (%)", description: "Commission on buy/sell orders" },
    { key: "withdrawalFeePercent", label: "Withdrawal Fee (%)", description: "Fee on crypto withdrawals" },
    { key: "swapFeePercent", label: "Swap Fee (%)", description: "Fee on crypto-to-crypto swaps" },
    { key: "ngnRateMarkupPercent", label: "NGN Rate Markup (%)", description: "Markup over mid-market NGN/USD rate" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-border">
        {settingsTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium ${activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "General" && (
        <div className="max-w-lg space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{adminUser.role}</span>
              <span className="text-xs text-success">✓ All Access</span>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-xl font-bold text-foreground">
                {adminUser.firstName[0]}
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{adminUser.firstName} {adminUser.lastName}</p>
                <p className="text-sm text-muted-foreground">{adminUser.email}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">General</h3>
              <button onClick={() => setIsEditing(!isEditing)} className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent">
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-muted-foreground">Firstname</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none disabled:opacity-60"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-muted-foreground">Lastname</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none disabled:opacity-60"
                />
              </div>
              {isEditing && (
                <button onClick={handleSave} className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground">
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Fees" && (
        <div className="max-w-lg space-y-6">
          <div>
            <h3 className="text-base font-semibold text-foreground mb-2">Fee Configuration</h3>
            <p className="text-sm text-muted-foreground">Set trading, withdrawal, and conversion fees. Changes apply immediately to new orders.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 space-y-5">
            {feeFields.map(({ key, label, description }) => (
              <div key={key}>
                <label className="mb-1 block text-sm font-medium text-muted-foreground">{label}</label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    value={feeConfig[key]}
                    onChange={(e) => setFeeConfig({ ...feeConfig, [key]: parseFloat(e.target.value) || 0 })}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              </div>
            ))}
            <Button onClick={handleSaveFeeConfig}>
              <Save className="h-4 w-4 mr-2" /> Save Fee Settings
            </Button>
          </div>
        </div>
      )}

      {activeTab === "KYC Limits" && (
        <div className="max-w-lg space-y-6">
          <div>
            <h3 className="text-base font-semibold text-foreground mb-2">KYC Tier Limits</h3>
            <p className="text-sm text-muted-foreground">Configure trade and withdrawal limits per KYC tier. Tiers 1 & 2 are auto-approved, Tier 3 requires manual review.</p>
          </div>
          {Object.entries(kycConfig).map(([tier, config]) => (
            <div key={tier} className="rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">{tier.replace("tier", "Tier ")}</h4>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.approval === "auto" ? "bg-success/15 text-success" : "bg-yellow-500/15 text-yellow-500"}`}>
                  {config.approval === "auto" ? "Auto-approve" : "Manual review"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{config.method}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-muted-foreground">Trade Limit (NGN)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                    <Input
                      type="number"
                      value={config.tradeLimitNgn}
                      onChange={e => setKycConfig({ ...kycConfig, [tier]: { ...config, tradeLimitNgn: Number(e.target.value) } })}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-muted-foreground">Withdraw Limit (NGN)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                    <Input
                      type="number"
                      value={config.withdrawLimitNgn}
                      onChange={e => setKycConfig({ ...kycConfig, [tier]: { ...config, withdrawLimitNgn: Number(e.target.value) } })}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button onClick={() => { kycTierConfig.setConfig(kycConfig); toast.success("KYC limits saved!"); }}>
            <Save className="h-4 w-4 mr-2" /> Save KYC Limits
          </Button>
        </div>
      )}

      {activeTab === "Referrals" && (
        <div className="max-w-lg space-y-6">
          <div>
            <h3 className="text-base font-semibold text-foreground mb-4">Referral Program Settings</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Configure the referral reward amount and weekly withdrawal limits. Changes apply immediately.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-muted-foreground">
                Reward per Referral (NGN)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                <Input
                  type="number"
                  value={referralConfig.rewardAmountNgn}
                  onChange={(e) => setReferralConfig({ ...referralConfig, rewardAmountNgn: Number(e.target.value) })}
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Current: {formatNgn(referralConfig.rewardAmountNgn)} per successful referral
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-muted-foreground">
                Weekly Withdrawal Limit (NGN)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                <Input
                  type="number"
                  value={referralConfig.weeklyWithdrawLimitNgn}
                  onChange={(e) => setReferralConfig({ ...referralConfig, weeklyWithdrawLimitNgn: Number(e.target.value) })}
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Current: {formatNgn(referralConfig.weeklyWithdrawLimitNgn)} max per week
              </p>
            </div>

            <Button onClick={handleSaveReferralConfig} className="mt-4">
              <Save className="h-4 w-4 mr-2" /> Save Referral Settings
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-muted/50 p-4 mt-6">
            <h4 className="font-medium text-foreground mb-2">Current Statistics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Referrals</p>
                <p className="font-bold text-foreground">{referralStore.getReferrals().length}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Earned</p>
                <p className="font-bold text-success">{formatNgn(referralStore.getTotalEarned())}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Pending Withdrawals</p>
                <p className="font-bold text-yellow-500">{referralStore.getWithdrawals().filter(w => w.status === "pending").length}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Withdrawn</p>
                <p className="font-bold text-foreground">{formatNgn(referralStore.getTotalWithdrawnApproved())}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16">
          <p className="text-lg font-medium text-muted-foreground">Notifications</p>
          <p className="mt-1 text-sm text-muted-foreground">Manage your notification settings</p>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
