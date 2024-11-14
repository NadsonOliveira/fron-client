export const dateFormat = (dateString: string): string => {
  let date = new Date(dateString);

  
  if (isNaN(date.getTime())) {
    date = new Date(); 
  }

  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
