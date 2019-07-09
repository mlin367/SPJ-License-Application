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
    if (char === '0') maskedString += 'Y';
    else if (char === '9') maskedString += 'X';
    else maskedString += parseInt(char) + 1;
  }
  return maskedString;
}

const maskForExpiry = dateString => {
  let maskedString = '';
  for (let char of dateString) {
    if (char === '0') maskedString += 'Z';
    else if (char === '9') maskedString += 'Y';
    else maskedString += parseInt(char) + 2;
  }
  return maskedString;
}

const maskForCustomer = string => {
  let maskedString = '';
  for (let char of string) {
    let charcode = char.charCodeAt();
    if (charcode >= 88) {
      charcode -= 25;
    } else {
      charcode += 3;
    }
    maskedString += String.fromCharCode(charcode);
  }
  return maskedString;
}