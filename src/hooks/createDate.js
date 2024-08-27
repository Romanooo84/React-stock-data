export function createDate(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Dodanie 1, bo getMonth() zwraca miesiące od 0 do 11, oraz formatowanie do dwóch cyfr
    const day = ('0' + date.getDate()).slice(-2); // Formatowanie do dwóch cyfr
    date = `${year}-${month}-${day}`;
    return date
  }