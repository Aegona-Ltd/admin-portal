export const capitalizeString = (str: string): string => {
  if (!str) return '';

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark: number): string => {
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';
  
  return 'red';
};

export const encodeBase64 = (str: string) => {
  try {
    if (typeof window !== 'undefined') {
      return window.btoa(encodeURIComponent(str));
    }
  } catch (err) {
    return '';
  }
};

export const decodeBase64 = (str: string) => {
  try {
    if (typeof window !== 'undefined') {
      return decodeURIComponent(window.atob(str));
    }
  } catch (err) {
    return '';
  }
};

export function formatMoney(money: number, character?: string) {
  return String(money)
    .split('')
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + `${character ? character : ','}`) + prev;
    });
}
