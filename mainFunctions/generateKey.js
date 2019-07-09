const generateKey = (allocation, expiry, customer) => {
  const keyArray = ['', '', '', '', '', '-', '', '', '', '', '', '-', '', '', '', '', '', '-', '', '', '', '', '', '-', '', '', '', '', ''];

}

const parseDate = date => {
  const dateArray = date.split('-');
  dateArray[0] = dateArray[0].slice(2);
  return dateArray.join('');
}

const maskForAllocation = dateString => {
  let maskedString = '';
  for (let char of dateString) {
    if (char === '0') maskedString += 'T';
    else if (char === '9') maskedString += 'X';
    else maskedString += parseInt(char) + 1;
  }
  return maskedString;
}