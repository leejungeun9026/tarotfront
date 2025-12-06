export const getToday = new Date();
export const getTodayDate = getToday.toLocaleDateString();
export const weeks = ["일", "월", "화", "수", "목", "금", "토"];
export const getTodayDay = weeks[getToday.getDay()];
export const todayDate = `${getTodayDate}(${getTodayDay})`;