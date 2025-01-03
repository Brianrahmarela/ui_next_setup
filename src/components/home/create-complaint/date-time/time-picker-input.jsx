import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { getArrowByType, getDateByType, setDateByType } from "./time-picker-utils";

const TimePickerInput = forwardRef(({
  className,
  type = "tel",
  value,
  id,
  name,
  dates = new Date(new Date().setHours(0, 0, 0, 0)),
  setDates,
  onChange,
  onKeyDown,
  picker,
  onLeftFocus,
  onRightFocus,
  handleTanggalReview,
  ...props
}, ref) => {

  const [flag, setFlag] = useState(false);
  
  useEffect(() => {
    if (flag) {
      const timer = setTimeout(() => {
        setFlag(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [flag]);

  const calculatedValue = useMemo(() => getDateByType(dates, picker), [dates, picker]);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") return;
    e.preventDefault();
    if (e.key === "ArrowRight") onRightFocus?.();
    if (e.key === "ArrowLeft") onLeftFocus?.();
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      const step = e.key === "ArrowUp" ? 1 : -1;
      const newValue = getArrowByType(calculatedValue, step, picker);
      if (flag) setFlag(false);
      const tempDate = new Date(dates);
      setDates(setDateByType(tempDate, newValue, picker));
    }
    if (e.key >= "0" && e.key <= "9") {
      const newValue = !flag
        ? "0" + e.key
        : calculatedValue.slice(1, 2) + e.key;
      if (flag) onRightFocus?.();
      setFlag((prev) => !prev);
      const tempDate = new Date(dates);
      setDates(setDateByType(tempDate, newValue, picker));
    }
  };

  return (
    <Input
      ref={ref}
      id={id || picker}
      name={name || picker}
      className={cn(
        "w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none",
        className
      )}
      value={value || calculatedValue}
      onChange={(e) => {
        e.preventDefault();
        onChange?.(e);
      }}
      type={type}
      inputMode="decimal"
      onKeyDown={(e) => {
        onKeyDown?.(e);
        handleKeyDown(e);
      }}
      {...props}
    />
  );
});

TimePickerInput.displayName = "TimePickerInput";

export { TimePickerInput };