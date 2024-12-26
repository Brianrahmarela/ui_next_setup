/**
 * regular expression to check for valid hour format (01-23)
 */
export function isValidHour(value) {
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);
}

/**
 * regular expression to check for valid 12 hour format (01-12)
 */
export function isValid12Hour(value) {
  return /^(0[1-9]|1[0-2])$/.test(value);
}

/**
 * regular expression to check for valid minute format (00-59)
 */
export function isValidMinuteOrSecond(value) {
  return /^[0-5][0-9]$/.test(value);
}

export function getValidNumber(
  value,
  { max, min = 0, loop = false }
) {
  let numericValue = parseInt(value, 10);

  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max;
      if (numericValue < min) numericValue = min;
    } else {
      if (numericValue > max) numericValue = min;
      if (numericValue < min) numericValue = max;
    }
    return numericValue.toString().padStart(2, "0");
  }

  return "00";
}

export function getValidHour(value) {
  if (isValidHour(value)) return value;
  return getValidNumber(value, { max: 23 });
}

export function getValid12Hour(value) {
  if (isValid12Hour(value)) return value;
  return getValidNumber(value, { max: 12 });
}

export function getValidMinuteOrSecond(value) {
  if (isValidMinuteOrSecond(value)) return value;
  return getValidNumber(value, { max: 59 });
}

export function getValidArrowNumber(
  value,
  { min, max, step }
) {
  let numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    numericValue += step;
    return getValidNumber(String(numericValue), { min, max, loop: true });
  }
  return "00";
}

export function getValidArrowHour(value, step) {
  return getValidArrowNumber(value, { min: 0, max: 23, step });
}

export function getValidArrowMinuteOrSecond(value, step) {
  return getValidArrowNumber(value, { min: 0, max: 59, step });
}

export function setMinutes(dates, value) {
  const minutes = getValidMinuteOrSecond(value);
  dates.setMinutes(parseInt(minutes, 10));
  return dates;
}

export function setSeconds(dates, value) {
  const seconds = getValidMinuteOrSecond(value);
  dates.setSeconds(parseInt(seconds, 10));
  return dates;
}

export function setHours(dates, value) {
  const hours = getValidHour(value);
  dates.setHours(parseInt(hours, 10));
  return dates;
}

export function setDateByType(dates, value, type) {
  switch (type) {
    case "minutes":
      return setMinutes(dates, value);
    case "seconds":
      return setSeconds(dates, value);
    case "hours":
      return setHours(dates, value);
    default:
      return dates;
  }
}

export function getDateByType(dates, type) {
  switch (type) {
    case "minutes":
      return getValidMinuteOrSecond(String(dates.getMinutes()));
    case "seconds":
      return getValidMinuteOrSecond(String(dates.getSeconds()));
    case "hours":
      return getValidHour(String(dates.getHours()));
    default:
      return "00";
  }
}

export function getArrowByType(
  value,
  step,
  type
) {
  switch (type) {
    case "minutes":
      return getValidArrowMinuteOrSecond(value, step);
    case "seconds":
      return getValidArrowMinuteOrSecond(value, step);
    case "hours":
      return getValidArrowHour(value, step);
    default:
      return "00";
  }
}
