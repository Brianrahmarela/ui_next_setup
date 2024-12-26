import React, { useState, useEffect} from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimePickerDemo } from "./time-picker-demo";
import { id } from 'date-fns/locale';

function DateTimePicker({paramKeyForm, form}) {
  const [dates, setDates] = useState()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	const handleTanggalReview = async () => {
    if(dates){
      const offsetHours = 7; 
      const offsetMilliseconds = 7 * 60 * 60 * 1000;
      const offsetDate = new Date(dates.getTime() + offsetMilliseconds);
      const formattedDate = offsetDate.toISOString().replace('Z', `+0${offsetHours}:00`).replace(/\.\d+/, ''); 
      form.setValue(paramKeyForm, formattedDate)
      form.clearErrors(paramKeyForm)
    }
	};

  useEffect(() => {
    handleTanggalReview()
  }, [dates])

  return (
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn( 'w-full pl-3 text-left font-light flex justify-between',
          !dates && "text-muted-foreground")}
        >      
          { dates ? format(new Date(dates), 'dd MMMM yyyy - HH:mm:ss', { locale: id })
           : ( <span>Pilih Tanggal</span> )}
           <CalendarIcon className={cn("ml-5 h-3 w-3 opacity-70", !dates && "text-muted-foreground opacity-70")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          onSelect={setDates}
          selected={new Date(dates)}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePickerDemo setDates={setDates} dates={dates} handleTanggalReview={handleTanggalReview}/>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DateTimePicker;