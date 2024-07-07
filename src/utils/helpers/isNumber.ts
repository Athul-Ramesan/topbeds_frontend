export const isNumeric = (value: string): boolean => {
    const numericRegex = /^-?\d+(\.\d+)?(e[+-]?\d+)?$/i;
    return numericRegex.test(value);
  };
  