export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('27')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)}`;
  }
  return `0${cleaned.slice(1, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
  }).format(amount);
};

export const formatReference = (studentName: string, studentNumber: string): string => {
  const cleanName = studentName.replace(/\s+/g, '').toUpperCase();
  return `${cleanName}/${studentNumber}`;
};