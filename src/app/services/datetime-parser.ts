

export function parseLocalDateTime(date : string) {
  let parsedDate = '';
  let hours = parseInt(date.slice(11,13));
  let minutes = parseInt(date.slice(14,16));
  if(hours > 12) {
    hours -= 12;
    parsedDate += (hours < 10   ? ("0" + hours) : hours) + ":"; 
    parsedDate += ((minutes == 0) ?  "00 " :  (minutes < 10 ? "0" + minutes : minutes)) + " PM ";
  }
  else {
    (hours == 0) ? hours = 12 : '';
    parsedDate += (hours < 10   ? ("0" + hours) : hours) + ":";
    parsedDate += ((minutes == 0) ?  "00 " :  (minutes < 10 ? "0" + minutes : minutes)) + " AM ";
  }
  parsedDate += getMonth(date.slice(5, 7));
  parsedDate += ' ' + date.slice(8, 10) + ', ' // day
  parsedDate += date.slice(0,4);
  return parsedDate;
}

export function getMonth(month : string) {
    switch(month) {
      case('01'): return "January";
      case('02'): return "February";
      case('03'): return "March";
      case('04'): return "April";
      case('05'): return "May";
      case('06'): return "June";
      case('07'): return "July";
      case('08'): return "August";
      case('09'): return "September";
      case('10'): return "October";
      case('11'): return "November";
      case('12'): return "December";
      default: return "Null";
    }
  }

