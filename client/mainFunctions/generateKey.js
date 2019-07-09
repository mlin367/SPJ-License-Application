const parseDate = date => {
  const dateArray = date.split('-');
  dateArray.push(dateArray.shift().slice(2));
  return dateArray.join('');
}

const maskForAllocation = dateString => {
  dateString = parseDate(dateString);
  let maskedString = '';
  for (let char of dateString) {
    if (char === '0') maskedString += 'Y';
    else if (char === '9') maskedString += 'X';
    else maskedString += parseInt(char) + 1;
  }
  return maskedString;
}

const maskForExpiry = dateString => {
  dateString = parseDate(dateString);
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

const generateKey = (allocation, expiry, customer) => {
  const keyArray = ['', '', '', '', '', '-', '', '', '', '', '', '-', '', '', '', '', '', '-', '', '', '', '', '', '-', '', '', '', '', ''];
  const allocationIndices = { 0:22, 1:28, 2:16, 3:10, 4:4, 5:19 };
  const expiryIndices = { 0:26, 1:20, 2:14, 3:8, 4:2, 5:13 };
  const customerIndices = { 0:27, 1:21, 2:15, 3:9, 4:3, 5:25, 6:7, 7:1, 8:24, 9:18, 10:12, 11:6, 12:0 };
  const maskAllocation = maskForAllocation(allocation);
  console.log(maskAllocation)
  const maskExpiry = maskForExpiry(expiry);
  console.log(maskExpiry)
  const maskCustomer = maskForCustomer(customer);
  console.log(maskCustomer)
  for (let index in allocationIndices) {
    keyArray[allocationIndices[index]] = maskAllocation[index];
  }
  console.log(keyArray)
  for (let index in expiryIndices) {
    keyArray[expiryIndices[index]] = maskExpiry[index];
  }
  console.log(keyArray)
  for (let index in customerIndices) {
    keyArray[customerIndices[index]] = maskCustomer[index];
  }
  console.log(keyArray)
  return keyArray.join('');
}

export default generateKey;