export default function numberToRoman(num: number) {
  if (num <= 0 || num >= 4000) return String(num); // 보통 1~3999까지만 로마숫자

  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

  let result = "";
  let i = 0;

  while (num > 0) {
    if (num >= values[i]) {
      result += symbols[i];
      num -= values[i];
    } else {
      i++;
    }
  }

  return result;
}