import { useState } from "react";
import { AppointmentSidebar } from "@/components/AppointmentSidebar";
import { AppointmentForm } from "@/components/AppointmentForm";
import { ConfirmationCard } from "@/components/ConfirmationCard";
import { StatsCards } from "@/components/StatsCards";
import { Button } from "@/components/ui/button";
import { Plus, Bell, Search } from "lucide-react";

const Index = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", data);
    
    // Reset after successful submission
    setConfirmationCode("");
    setReminderDate("");
    setIsSubmitting(false);
  };

  const handleSubmitAppointment = () => {
    if (confirmationCode) {
      console.log("Submitting appointment with code:", confirmationCode);
      // This would trigger the form submission
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AppointmentSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Appointment Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">
                  Manage your appointments efficiently
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="default" className="gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-primary rounded-full"></span>
                </Button>
                <Button variant="brand-outline" size="default" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Quick Add
                </Button>
              </div>
            </div>
          </header>

          {/* Stats Cards */}
          <StatsCards />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="xl:col-span-2">
              <AppointmentForm
                onSubmit={handleFormSubmit}
                onCodeGenerated={setConfirmationCode}
                onReminderDateGenerated={setReminderDate}
              />
            </div>

            {/* Confirmation Card */}
            <div className="xl:col-span-1">
              <ConfirmationCard
                confirmationCode={confirmationCode}
                reminderDate={reminderDate}
                onSubmit={handleSubmitAppointment}
                isLoading={isSubmitting}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;