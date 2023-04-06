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
