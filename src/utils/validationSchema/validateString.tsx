export function validateString(input:string) {
    if (!input) {
      return 'Input is required';
    }
    const trimmedInput = input.trim();
  if (!/^[a-zA-Z]+$/.test(trimmedInput)) {
    return 'String must contain only letters';
  }
    return 'Valid';
  }