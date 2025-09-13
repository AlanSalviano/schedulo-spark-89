import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hash, Bell, Calendar } from "lucide-react";

interface ConfirmationCardProps {
  confirmationCode: string;
  reminderDate: string;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function ConfirmationCard({ confirmationCode, reminderDate, onSubmit, isLoading = false }: ConfirmationCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Card className="shadow-large border-0 bg-gradient-subtle h-fit sticky top-8">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-xl font-bold text-foreground">Appointment Details</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Confirmation Code */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            <Hash className="w-4 h-4" />
            Confirmation Code
          </div>
          <div className="relative">
            <div className="h-20 bg-gradient-secondary rounded-2xl flex items-center justify-center shadow-medium border-2 border-brand-secondary/20">
              <span className="text-3xl font-bold text-foreground tracking-wider font-mono">
                {confirmationCode || "0000"}
              </span>
            </div>
            {confirmationCode && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
        </div>

        {/* Reminder Date */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            <Bell className="w-4 h-4" />
            Reminder Date
          </div>
          <div className="relative">
            <div className="h-20 bg-gradient-secondary rounded-2xl flex items-center justify-center shadow-medium border-2 border-brand-secondary/20">
              <div className="text-center">
                {reminderDate ? (
                  <>
                    <div className="text-2xl font-bold text-foreground">
                      {formatDate(reminderDate)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3" />
                      5 months after appointment
                    </div>
                  </>
                ) : (
                  <span className="text-lg text-muted-foreground">--/--/----</span>
                )}
              </div>
            </div>
            {reminderDate && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            onClick={onSubmit}
            variant="brand"
            size="lg"
            disabled={isLoading || !confirmationCode}
            className="w-full"
          >
            {isLoading ? "Processing..." : "Submit Appointment"}
          </Button>
        </div>

        {/* Info */}
        <div className="text-center text-xs text-muted-foreground">
          The confirmation code is generated automatically when you enter the customer name.
        </div>
      </CardContent>
    </Card>
  );
}