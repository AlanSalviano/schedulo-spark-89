import { useState } from "react";
import { TopNavbar } from "@/components/TopNavbar";
import { AppointmentForm } from "@/components/AppointmentForm";
import { ConfirmationCard } from "@/components/ConfirmationCard";
import { StatsCards } from "@/components/StatsCards";

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
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <TopNavbar />

      {/* Main Content */}
      <main className="overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Stats Cards */}
          <StatsCards />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
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