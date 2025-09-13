import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarDays, Users, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  type: string;
  data: string;
  pets: string;
  closer1: string;
  closer2: string;
  customers: string;
  phone: string;
  oldNew: string;
  appointmentDate: string;
  serviceValue: string;
  franchise: string;
  city: string;
  source: string;
  week: string;
  month: string;
  year: string;
}

interface AppointmentFormProps {
  onSubmit: (data: FormData & { codePass: string; reminderDate: string }) => void;
  onCodeGenerated: (code: string) => void;
  onReminderDateGenerated: (date: string) => void;
}

export function AppointmentForm({ onSubmit, onCodeGenerated, onReminderDateGenerated }: AppointmentFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    type: "",
    data: "",
    pets: "",
    closer1: "",
    closer2: "",
    customers: "",
    phone: "",
    oldNew: "",
    appointmentDate: "",
    serviceValue: "",
    franchise: "",
    city: "",
    source: "",
    week: "",
    month: "",
    year: "",
  });

  const [employees, setEmployees] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with current date
  useEffect(() => {
    const today = new Date();
    const currentDate = today.toISOString().slice(0, 10);
    const currentMonth = (today.getMonth() + 1).toString();
    const currentYear = today.getFullYear().toString();

    setFormData(prev => ({
      ...prev,
      data: currentDate,
      month: currentMonth,
      year: currentYear,
    }));
  }, []);

  // Generate confirmation code when customer name changes
  useEffect(() => {
    if (formData.customers.trim()) {
      const randomNumber = Math.floor(Math.random() * 10000);
      const paddedNumber = randomNumber.toString().padStart(4, '0');
      onCodeGenerated(paddedNumber);
    } else {
      onCodeGenerated("");
    }
  }, [formData.customers, onCodeGenerated]);

  // Generate reminder date when appointment date changes
  useEffect(() => {
    if (formData.appointmentDate) {
      const appointmentDate = new Date(formData.appointmentDate);
      appointmentDate.setMonth(appointmentDate.getMonth() + 5);
      const reminderDate = appointmentDate.toISOString().slice(0, 10);
      onReminderDateGenerated(reminderDate);
    } else {
      onReminderDateGenerated("");
    }
  }, [formData.appointmentDate, onReminderDateGenerated]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate confirmation code
      const randomNumber = Math.floor(Math.random() * 10000);
      const codePass = randomNumber.toString().padStart(4, '0');

      // Generate reminder date
      const appointmentDate = new Date(formData.appointmentDate);
      appointmentDate.setMonth(appointmentDate.getMonth() + 5);
      const reminderDate = appointmentDate.toISOString().slice(0, 10);

      await onSubmit({
        ...formData,
        codePass,
        reminderDate,
      });

      toast({
        title: "Success!",
        description: "Appointment registered successfully.",
      });

      // Reset form
      setFormData({
        type: "",
        data: "",
        pets: "",
        closer1: "",
        closer2: "",
        customers: "",
        phone: "",
        oldNew: "",
        appointmentDate: "",
        serviceValue: "",
        franchise: "",
        city: "",
        source: "",
        week: "",
        month: "",
        year: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sourceOptions = [
    "Facebook", "Kommo", "Social Traffic", "SMS", "Call", "Friends",
    "Family Member", "Neighbors", "Reminder", "Email", "Google",
    "Website", "Grooming / Referral P", "Instagram", "Technician", "WhatsApp", "Other"
  ];

  return (
    <Card className="shadow-large border-0 bg-gradient-subtle">
      <CardHeader className="pb-8">
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Register New Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-semibold text-foreground">Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Central">Central</SelectItem>
                  <SelectItem value="Franchise">Franchise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="data" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Date
              </Label>
              <Input
                type="date"
                value={formData.data}
                onChange={(e) => handleInputChange('data', e.target.value)}
                className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pets" className="text-sm font-semibold text-foreground">Pets</Label>
              <Select value={formData.pets} onValueChange={(value) => handleInputChange('pets', value)}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors">
                  <SelectValue placeholder="Number of pets" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="closer1" className="text-sm font-semibold text-foreground">Salesperson (1)</Label>
              <Select value={formData.closer1} onValueChange={(value) => handleInputChange('closer1', value)}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors">
                  <SelectValue placeholder="Select salesperson" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee} value={employee}>{employee}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="closer2" className="text-sm font-semibold text-foreground">Salesperson (2)</Label>
              <Select value={formData.closer2} onValueChange={(value) => handleInputChange('closer2', value)}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors">
                  <SelectValue placeholder="Select salesperson" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee} value={employee}>{employee}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customers" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Customers
              </Label>
              <Input
                type="text"
                value={formData.customers}
                onChange={(e) => handleInputChange('customers', e.target.value)}
                className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors"
                placeholder="Customer name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors"
                placeholder="Phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="oldNew" className="text-sm font-semibold text-foreground">Customer Type</Label>
              <Select value={formData.oldNew} onValueChange={(value) => handleInputChange('oldNew', value)}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors">
                  <SelectValue placeholder="New or returning" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New Customer</SelectItem>
                  <SelectItem value="Old">Returning Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="appointmentDate" className="text-sm font-semibold text-foreground">Appointment Date</Label>
              <Input
                type="date"
                value={formData.appointmentDate}
                onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceValue" className="text-sm font-semibold text-foreground">Service Value</Label>
              <Input
                type="text"
                value={formData.serviceValue}
                onChange={(e) => handleInputChange('serviceValue', e.target.value)}
                className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors"
                placeholder="$0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="franchise" className="text-sm font-semibold text-foreground">Franchise</Label>
              <Input
                type="text"
                value={formData.franchise}
                onChange={(e) => handleInputChange('franchise', e.target.value)}
                className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors"
                placeholder="Franchise name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                City
              </Label>
              <Input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors"
                placeholder="City name"
                required
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="source" className="text-sm font-semibold text-foreground">Source</Label>
              <Select value={formData.source} onValueChange={(value) => handleInputChange('source', value)}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {sourceOptions.map((source) => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="week" className="text-sm font-semibold text-foreground">Week</Label>
              <Select value={formData.week} onValueChange={(value) => handleInputChange('week', value)}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors">
                  <SelectValue placeholder="Select week" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((week) => (
                    <SelectItem key={week} value={week.toString()}>{week}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="month" className="text-sm font-semibold text-foreground">Month</Label>
              <Select value={formData.month} onValueChange={(value) => handleInputChange('month', value)}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <SelectItem key={month} value={month.toString()}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="text-sm font-semibold text-foreground">Year</Label>
              <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-border hover:border-brand-primary transition-colors">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 17 }, (_, i) => 2024 + i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-6">
            <Button 
              type="submit" 
              variant="brand" 
              size="lg" 
              disabled={isLoading}
              className="w-full sm:w-auto min-w-48"
            >
              {isLoading ? "Registering..." : "Register Appointment"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}