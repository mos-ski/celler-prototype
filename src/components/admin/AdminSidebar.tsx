import {
  Home, ArrowLeftRight, Users, Gift, Settings, CreditCard, LogOut, Shield, Bell
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { adminUser } from "@/data/adminMockData";

const sections = [
  {
    label: "DASHBOARD",
    items: [
      { title: "Overview", url: "/admin", icon: Home },
      { title: "Transactions", url: "/admin/transactions", icon: ArrowLeftRight },
      { title: "Giftcard Orders", url: "/admin/giftcard-orders", icon: CreditCard },
    ],
  },
  {
    label: "USERS",
    items: [
      { title: "Customers", url: "/admin/customers", icon: Users },
      { title: "KYC", url: "/admin/kyc", icon: Shield },
      { title: "Referrals", url: "/admin/referrals", icon: Gift },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { title: "Push Notifications", url: "/admin/notifications", icon: Bell },
      { title: "Settings", url: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) =>
    path === "/admin" ? currentPath === "/admin" : currentPath.startsWith(path);

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <span className="text-xl font-bold text-primary">C</span>
        {!collapsed && <span className="text-lg font-bold text-foreground">celler</span>}
      </div>

      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.label}>
            {!collapsed && (
              <SidebarGroupLabel className="text-[11px] font-semibold tracking-wider text-muted-foreground">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink
                        to={item.url}
                        end={item.url === "/admin"}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        activeClassName="bg-accent text-foreground"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span className="flex-1">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <div className="mt-auto border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">
            {adminUser.firstName[0]}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-foreground">{adminUser.firstName}</p>
              <p className="truncate text-xs text-muted-foreground">{adminUser.email}</p>
            </div>
          )}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            title="Exit to user app"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Sidebar>
  );
}
