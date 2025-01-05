// src/utils/formatDate.ts
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() is zero-based
    const day = date.getDate();
  
    // Format month and day to ensure two digits (e.g., '02' for February)
    const formattedMonth = month < 10 ? `0${month}` : month.toString();
    const formattedDay = day < 10 ? `0${day}` : day.toString();
  
    return `${year}-${formattedMonth}-${formattedDay}`;
  };
  
  export default formatDate;