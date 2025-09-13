import { Calendar, Users, Settings, BarChart3, Menu, Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TopNavbarProps {
  className?: string;
}

export function TopNavbar({ className }: TopNavbarProps) {
  const menuItems = [
    {
      icon: Calendar,
      label: "Appointments",
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
    <header className={cn("bg-card shadow-large border-b border-border", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-subtle rounded-lg flex items-center justify-center shadow-soft">
              <img 
                src="https://i.imgur.com/XamnfOc.png" 
                alt="Company Logo" 
                className="max-w-full max-h-full object-contain rounded"
              />
            </div>
            <h1 className="text-xl font-bold text-foreground hidden sm:block">
              Appointment Dashboard
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  item.active
                    ? "bg-gradient-primary text-white shadow-brand"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">Search</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-primary rounded-full"></span>
            </Button>
            
            <Button variant="brand-outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Add</span>
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <nav className="flex items-center justify-around py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium transition-all duration-300",
                  item.active
                    ? "text-brand-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* User info bar */}
      <div className="bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-xs">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground">System Administrator</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Manage your appointments efficiently
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}