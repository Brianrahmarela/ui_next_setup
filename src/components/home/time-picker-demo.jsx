import React, { useRef } from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";

const TimePickerDemo = ({ dates, datasRow, setDates, handleUpdateWaktuSolved}) => {
  const minuteRef = useRef(null);
  const hourRef = useRef(null);
  const secondRef = useRef(null);
  
  function convDateFromApiExist(tanggal) {
    const year = tanggal.getUTCFullYear();
    const month = (tanggal.getUTCMonth() + 1).toString().padStart(2, '0'); 
    const day = tanggal.getUTCDate().toString().padStart(2, '0');
    const hours = tanggal.getUTCHours().toString().padStart(2, '0');
    const minutes = tanggal.getUTCMinutes().toString().padStart(2, '0'); 
    const seconds = tanggal.getUTCSeconds().toString().padStart(2, '0');
    const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    return formattedDateString;
  }
  
  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePickerInput
          handleUpdateWaktuSolved={handleUpdateWaktuSolved}
          picker="hours"
          dates={dates}
          datasRow={convDateFromApiExist(new Date(datasRow))}
          setDates={setDates}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput
          handleUpdateWaktuSolved={handleUpdateWaktuSolved}
          picker="minutes"
          dates={dates}
          datasRow={convDateFromApiExist(new Date(datasRow))}
          setDates={setDates}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="seconds" className="text-xs">
          Seconds
        </Label>
        <TimePickerInput
          handleUpdateWaktuSolved={handleUpdateWaktuSolved}
          picker="seconds"
          dates={dates}
          datasRow={convDateFromApiExist(new Date(datasRow))}
          setDates={setDates}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
};

export { TimePickerDemo };