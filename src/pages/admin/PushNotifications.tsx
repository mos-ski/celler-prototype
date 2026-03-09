import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Users, User, Bell } from "lucide-react";
import { toast } from "sonner";

const sentNotifications = [
  { id: "n1", title: "System Maintenance", body: "Scheduled maintenance on March 10, 2026. Service may be intermittent.", audience: "All Users", sentAt: "8 Mar 2026, 3:00 PM", sentBy: "Jonathan" },
  { id: "n2", title: "New Coin Listed!", body: "SOL is now available for trading on Celler.", audience: "All Users", sentAt: "5 Mar 2026, 10:00 AM", sentBy: "Jonathan" },
  { id: "n3", title: "KYC Reminder", body: "Complete your KYC verification to unlock higher trading limits.", audience: "Unverified Users", sentAt: "1 Mar 2026, 9:00 AM", sentBy: "Jonathan" },
];

const AdminPushNotifications = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<"all" | "verified" | "unverified">("all");
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState(sentNotifications);

  const handleSend = () => {
    if (!title.trim() || !body.trim()) {
      toast.error("Please fill in both title and message");
      return;
    }
    setSending(true);
    setTimeout(() => {
      const audienceLabel = audience === "all" ? "All Users" : audience === "verified" ? "Verified Users" : "Unverified Users";
      setHistory(prev => [{
        id: `n${Date.now()}`,
        title,
        body,
        audience: audienceLabel,
        sentAt: new Date().toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true }),
        sentBy: "Jonathan",
      }, ...prev]);
      toast.success(`Push notification sent to ${audienceLabel}`);
      setTitle("");
      setBody("");
      setSending(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Compose */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Compose Notification</h3>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-muted-foreground">Title</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Notification title..." />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-muted-foreground">Message</label>
            <Textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Write your notification message..." rows={4} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-muted-foreground">Audience</label>
            <div className="flex gap-2 mt-1">
              {[
                { value: "all" as const, label: "All Users", icon: Users },
                { value: "verified" as const, label: "Verified", icon: User },
                { value: "unverified" as const, label: "Unverified", icon: User },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setAudience(opt.value)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    audience === opt.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-accent"
                  }`}
                >
                  <opt.icon className="h-3.5 w-3.5" />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleSend} disabled={sending} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            {sending ? "Sending..." : "Send Push Notification"}
          </Button>
        </div>

        {/* History */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-base font-semibold text-foreground">Sent Notifications</h3>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto">
            {history.map(n => (
              <div key={n.id} className="rounded-lg border border-border p-3">
                <p className="font-medium text-foreground text-sm">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.body}</p>
                <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                  <span className="rounded bg-muted px-1.5 py-0.5 font-medium">{n.audience}</span>
                  <span>{n.sentAt}</span>
                  <span>by {n.sentBy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPushNotifications;
