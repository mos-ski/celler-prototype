import { useState } from "react";
import { ArrowLeft, Camera, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { store } from "@/lib/crypto";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    if (user) {
      store.setUser({ ...user, fullName, username });
    }
    setSuccess(true);
    setTimeout(() => navigate(-1), 1500);
  };

  if (success) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-success" />
          </div>
          <p className="text-xl font-bold mb-2">Profile Updated!</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pb-8">
        <div className="flex items-center gap-3 pt-4 mb-6">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-semibold">Edit Profile</h1>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold">
              {fullName?.[0]?.toUpperCase() ?? "T"}
            </div>
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Camera size={14} className="text-primary-foreground" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Full Name</label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-14 rounded-2xl bg-secondary border-0" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Username</label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} className="h-14 rounded-2xl bg-secondary border-0" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Email</label>
            <Input value={user?.email || ""} disabled className="h-14 rounded-2xl bg-secondary border-0 opacity-50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Phone Number</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234" className="h-14 rounded-2xl bg-secondary border-0" />
          </div>

          <Button onClick={handleSave} className="w-full h-14 rounded-2xl text-base font-semibold mt-4">
            Save Changes
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
