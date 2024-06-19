export function validatePhoneNumber(phoneNumber:string) {
    if (!phoneNumber) {
      return 'Phone number is required';
    }
    const trimmedPhoneNumber = phoneNumber.trim();
    if (trimmedPhoneNumber.length !== 10) {
      return 'Phone number must be exactly 10 digits long';
    }
    if (!/^\d{10}$/.test(trimmedPhoneNumber)) {
      return 'Phone number must contain only digits';
    }
    return 'Valid';
  }