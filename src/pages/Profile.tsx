import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/signin"); };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <Card className="border-border/40">
        <CardHeader><CardTitle className="text-base">Account Info</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <Row label="Name" value={user?.fullName || "—"} />
          <Row label="Email" value={user?.email || "—"} />
        </CardContent>
      </Card>

      <Card className="border-border/40">
        <CardHeader><CardTitle className="text-base">Bank Account (Mock)</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <Row label="Bank" value="First Bank of Nigeria" />
          <Row label="Account Number" value="0123456789" />
          <Row label="Account Name" value={user?.fullName || "—"} />
        </CardContent>
      </Card>

      <Button variant="destructive" className="w-full" onClick={handleLogout}>Logout</Button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
