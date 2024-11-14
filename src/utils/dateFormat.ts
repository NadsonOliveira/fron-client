export const dateFormat = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return '';
  }

  const day = String(date.getDate()).padStart(2, 'dd');
  const month = String(date.getMonth() + 1).padStart(2, 'MM');  
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};