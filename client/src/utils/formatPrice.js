export function formatDecimalsAndThousands(value, decimalLength = 2) {
  let [integerPart, decimalPart] = value.split('.');

  if (decimalPart === undefined) {
    decimalPart = ''
  }

  for (let i = decimalPart.length; i < decimalLength; i++) {
    decimalPart += '0'
  }

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${integerPart}.${decimalPart}`;
}