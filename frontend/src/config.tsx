export const BACKEND_URL = "http://localhost:8787"
export const readFromISOFormat = (date: string)=>{
    const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const isoDate = new Date(date);
    const year = isoDate.getFullYear();
    const month = isoDate.getMonth(); // Month is zero-based, so add 1
    const day = isoDate.getDate();
    const formattedDate = `${day} ${mon[month]}, ${year}`;
// Result: "2013-03-10"
return formattedDate;
}