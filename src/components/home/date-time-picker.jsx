import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimePickerDemo } from "./time-picker-demo";
import { id } from 'date-fns/locale';
import { API } from "@/config";
import { customRevalidatePath } from "@/lib/action";
import { toast } from "sonner"

function DateTimePicker({isPerluValidasi, handleWaktuSolvedIsPerluValidasiCol, datas, datasRow, token}) {
  const [dates, setDates] = useState()
  const [btnAction, setBtnAction] = useState()

	const handleUpdateWaktuSolved = async () => {
    const offsetHours = 7;
    const offsetMilliseconds = 7 * 60 * 60 * 1000;
    const offsetDate = new Date(dates.getTime() + offsetMilliseconds);
    const formattedDate = offsetDate.toISOString().replace('Z', `+0${offsetHours}:00`).replace(/\.\d+/, ''); 
    
    if(!isPerluValidasi){
      if(dates){
        const params = {
          solved_at: formattedDate
        };
    
        const response = await API.PATCH("/review/modify", datas.id, params, token);
        if (response.success) {
          await customRevalidatePath('/home');
          toast.success("Saved successfully", );
        } else {
          toast.error("error");
        }
        return response.data;
      }
    } else if(isPerluValidasi) {
      handleWaktuSolvedIsPerluValidasiCol(datas.id, formattedDate)
    }
	};

  return (
    <Popover>
      <PopoverTrigger asChild onClick={() => setBtnAction(datasRow === null ? 'Save' : 'Update')}>
        <Button
          variant={"outline"}
          className={cn(
            'w-full pl-3 text-left font-light flex justify-between',
            !datasRow && "text-muted-foreground"
          )}
        >      
          { datas.solved_at === null ? (
             <span>Pilih Tanggal</span>
           )
           : dates === undefined && datasRow ? 
           format(datasRow, 'dd MMMM yyyy - HH:mm:ss', { locale: id })
           : dates || datasRow !== null ? 
           format(new Date(dates), 'dd MMMM yyyy - HH:mm:ss', { locale: id })
           : (
             <span>Pilih Tanggal</span>
           )}
           <CalendarIcon className={cn("ml-5 h-3 w-3 opacity-70", !datasRow && "text-muted-foreground opacity-70")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          onSelect={setDates}
          selected={new Date(dates ? dates : datasRow)}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePickerDemo setDates={setDates} dates={dates} datasRow={datasRow} handleUpdateWaktuSolved={handleUpdateWaktuSolved}/>
        </div>
          <div className="m-3 mt-1">
            <Button disabled={dates === undefined} 
            className="w-full" onClick={ handleUpdateWaktuSolved}>
              {btnAction}
            </Button>
          </div>
      </PopoverContent>
    </Popover>
  );
}

export default DateTimePicker;