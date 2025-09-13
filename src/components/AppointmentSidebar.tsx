import { Calendar, Users, Settings, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function AppointmentSidebar({ className }: SidebarProps) {
  const menuItems = [
    {
      icon: Calendar,
      label: "Appointment Registration",
      active: true,
    },
    {
      icon: Users,
      label: "Customers",
      active: false,
    },
    {
      icon: BarChart3,
      label: "Analytics",
      active: false,
    },
    {
      icon: Settings,
      label: "Settings",
      active: false,
    },
  ];

  return (
    <aside className={cn("w-80 bg-card shadow-large border-r border-border flex flex-col", className)}>
      {/* Logo Section */}
      <div className="p-8 border-b border-border">
        <div className="flex items-center justify-center">
          <div className="w-48 h-48 bg-gradient-subtle rounded-2xl flex items-center justify-center shadow-soft">
            <img 
              src="https://i.imgur.com/XamnfOc.png" 
              alt="Company Logo" 
              className="max-w-full max-h-full object-contain rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-xl text-left font-medium transition-all duration-300 group",
                item.active
                  ? "bg-gradient-primary text-white shadow-brand"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-soft"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-all duration-300",
                item.active ? "text-white" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">System Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}