export function TimeFormat(start: number, end: number) {
  const result = {
    start: "",
    end: "",
  };
  result.start = String(start) + ":00";
  result.end = String(end) + ":00";

  if (start < 10) { result.start = "0" + result.start; }
  if (end < 10) { result.end = "0" + result.end; }

  return result;
}
