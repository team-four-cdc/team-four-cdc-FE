interface FormatCurrency {
  value: number | string;
  symbol?: boolean;
}

export const formatCurrency = ({
  value = 0,
  symbol = true,
}: FormatCurrency) => {
  const formatter = new Intl.NumberFormat('id-ID');
  const formattedValue = formatter.format(Number(value));
  return symbol ? `Rp.${formattedValue}` : formattedValue;
};

export function dateFormat(date: string) {
  return new Date(date).toLocaleDateString('id-ID', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
}

export function capitalize(str: string) {
  const arr = str.split(' ');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(' ');
}


