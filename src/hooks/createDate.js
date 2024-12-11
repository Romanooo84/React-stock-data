export function createDate(date) {
    if (date instanceof Date && !isNaN(date)){
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2); 
    date = `${year}-${month}-${day}`;
    return date
  }
  else{return null}
  }