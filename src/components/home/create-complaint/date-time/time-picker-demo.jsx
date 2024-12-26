import React, { useRef } from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";

const TimePickerDemo = ({ dates, setDates, handleTanggalReview}) => {
  const minuteRef = useRef(null);
  const hourRef = useRef(null);
  const secondRef = useRef(null);
  
  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePickerInput
          handleTanggalReview={handleTanggalReview}
          picker="hours"
          dates={dates}
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
          handleTanggalReview={handleTanggalReview}
          picker="minutes"
          dates={dates}
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
          handleTanggalReview={handleTanggalReview}
          picker="seconds"
          dates={dates}
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