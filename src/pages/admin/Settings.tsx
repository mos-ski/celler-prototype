import { useState } from "react";
import { adminUser } from "@/data/adminMockData";
import { toast } from "sonner";

const settingsTabs = ["General", "Security", "Notifications"];

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [firstName, setFirstName] = useState(adminUser.firstName);
  const [lastName, setLastName] = useState(adminUser.lastName);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
    setIsEditing(false);
  };

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

      {activeTab !== "General" && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16">
          <p className="text-lg font-medium text-muted-foreground">{activeTab}</p>
          <p className="mt-1 text-sm text-muted-foreground">Manage your {activeTab.toLowerCase()} settings</p>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
