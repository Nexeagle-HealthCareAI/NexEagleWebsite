import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { createAppointment } from "@/lib/api";
import type { Doctor } from "@/data/doctors";

const bookingSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  slot: z.string().min(1, "Please select a time slot"),
  reason: z.string().max(2000).optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

interface BookingDialogProps {
  doctor: Doctor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingDialog = ({ doctor, open, onOpenChange }: BookingDialogProps) => {
  const [date, setDate] = useState<Date | undefined>();
  const [dateError, setDateError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingForm>({ resolver: zodResolver(bookingSchema) });

  const selectedSlot = watch("slot");

  // Reset state whenever the dialog opens for a (possibly different) doctor.
  useEffect(() => {
    if (open) {
      reset();
      setDate(undefined);
      setDateError(null);
      setIsBooked(false);
    }
  }, [open, doctor, reset]);

  if (!doctor) return null;

  const onSubmit = async (values: BookingForm) => {
    if (!date) {
      setDateError("Please pick a preferred date");
      return;
    }
    setDateError(null);
    setIsSubmitting(true);
    try {
      await createAppointment({
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        location: doctor.location,
        clinic: doctor.clinic,
        patient: { name: values.name, phone: values.phone, email: values.email },
        preferredDate: format(date, "yyyy-MM-dd"),
        preferredSlot: values.slot,
        reason: values.reason,
      });
      setIsBooked(true);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not book the appointment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-3xl max-h-[90vh] overflow-y-auto">
        {isBooked ? (
          <div className="text-center py-8 px-2 space-y-4">
            <div className="w-14 h-14 bg-teal-50 border border-brand-teal/20 rounded-2xl flex items-center justify-center mx-auto">
              <Check className="w-7 h-7 text-brand-teal" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Appointment Requested!</h3>
            <p className="text-slate-500 text-sm">
              Your request with <span className="font-semibold">{doctor.name}</span> on{" "}
              <span className="font-semibold">
                {date ? format(date, "PPP") : ""} ({selectedSlot})
              </span>{" "}
              has been sent. The clinic will confirm your slot shortly.
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              className="mt-2 h-11 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-full"
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-black text-slate-900">
                Book with {doctor.name}
              </DialogTitle>
              <DialogDescription className="text-slate-500">
                {doctor.specialty} · {doctor.clinic ? `${doctor.clinic}, ` : ""}
                {doctor.location}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" {...register("name")} />
                {errors.name && (
                  <p className="text-xs text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-10",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-[60] bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => {
                          setDate(d);
                          if (d) setDateError(null);
                        }}
                        disabled={(d) =>
                          d < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {dateError && <p className="text-xs text-red-600">{dateError}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label>Time Slot</Label>
                  <Select
                    value={selectedSlot}
                    onValueChange={(v) =>
                      setValue("slot", v, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctor.availableSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.slot && (
                    <p className="text-xs text-red-600">{errors.slot.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reason">Reason (optional)</Label>
                <Textarea
                  id="reason"
                  rows={3}
                  placeholder="Briefly describe your symptoms or reason for the visit"
                  className="resize-none"
                  {...register("reason")}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm Appointment"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
