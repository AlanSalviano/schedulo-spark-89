import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, TrendingUp, Clock } from "lucide-react";

export function StatsCards() {
  const stats = [
    {
      icon: Calendar,
      label: "Today's Appointments",
      value: "12",
      change: "+2 from yesterday",
      positive: true,
    },
    {
      icon: Users,
      label: "New Customers",
      value: "8",
      change: "+15% this week",
      positive: true,
    },
    {
      icon: TrendingUp,
      label: "Monthly Revenue",
      value: "$24,580",
      change: "+8.2% from last month",
      positive: true,
    },
    {
      icon: Clock,
      label: "Avg. Service Time",
      value: "45 min",
      change: "-5 min from last week",
      positive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-soft border-0 bg-gradient-subtle hover:shadow-medium transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
            <div className="p-2 bg-gradient-primary rounded-lg">
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
            <p className={`text-xs ${stat.positive ? "text-green-600" : "text-red-600"}`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}