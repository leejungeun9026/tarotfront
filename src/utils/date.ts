// utils/date.ts
export const toYMD = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`; // KST 로컬 기준
};

export const monthRangeYMD = (month: Date) => {
  const from = new Date(month.getFullYear(), month.getMonth(), 1);
  const to = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  return { from: toYMD(from), to: toYMD(to) };
};
