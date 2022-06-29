//calculate age
export function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    console.log(birthDate)
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//calculate date interval
export function getDateInterval(dateString){

let date1 = new Date();
let date2 = new Date(dateString);
  
// To calculate the time difference of two dates
let Difference_In_Time = date2.getTime() - date1.getTime();
  
// To calculate the no. of days between two dates
let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  
//To display the final no. of days (result)
document.write("Total number of days between dates  <br>"
               + date1 + "<br> and <br>" 
               + date2 + " is: <br> " 
               + Difference_In_Days);    

return Difference_In_Days;
}

