const decodeForAllocation = dateString => {
  let decodedString = '';
  for (let char of dateString) {
    if (char === 'Y') decodedString += '0';
    else if (char === 'X') decodedString += '9';
    else decodedString += parseInt(char) - 1;
  }
  return decodedString;
}

const decodeForExpiry = dateString => {
  let decodedString = '';
  for (let char of dateString) {
    if (char === 'Z') decodedString += '0';
    else if (char === 'Y') decodedString += '9';
    else decodedString += parseInt(char) - 2;
  }
  return decodedString;
}

const decodeForCustomer = string => {
  let decodedString = '';
  for (let char of string) {
    let charcode = char.charCodeAt();
    if (charcode <= 67) {
      charcode += 25;
    } else {
      charcode -= 3;
    }
    decodedString += String.fromCharCode(charcode);
  }
  return decodedString;
}

const decodeKey = key => {
  const allocationIndices = [22, 28, 16, 10, 4, 19];
  const expiryIndices = [26, 20, 14, 8, 2, 13];
  const customerIndices = [27, 21, 15, 9, 3, 25, 7, 1, 24, 18, 12, 6, 0];
  let allocationDate = '';
  let expiryDate = '';
  let customerName = '';
  for (let index of allocationIndices) {
    allocationDate += key[index];
  }
  for (let index of expiryIndices) {
    expiryDate += key[index];
  }
  for (let index of customerIndices) {
    customerName += key[index];
  }
  allocationDate = decodeForAllocation(allocationDate);
  expiryDate = decodeForExpiry(expiryDate);
  customerName = decodeForCustomer(customerName);
  return [allocationDate, expiryDate, customerName];
}