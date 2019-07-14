const decodeForAllocation = dateString => {
  let decodedString = '';
  for (let i = 0; i < dateString.length; i++) {
    if (dateString[i] === 'Y') decodedString += '0';
    else if (dateString[i] === 'X') decodedString += '9';
    else decodedString += parseInt(dateString[i]) - 1;
    if (i === 1 || i === 3) decodedString += '/';
  }
  return decodedString;
}

const decodeForExpiry = dateString => {
  let decodedString = '';
  for (let i = 0; i < dateString.length; i++) {
    if (dateString[i] === 'Z') decodedString += '0';
    else if (dateString[i] === 'X') decodedString += '8';
    else if (dateString[i] === 'Y') decodedString += '9';
    else decodedString += parseInt(dateString[i]) - 2;
    if (i === 1 || i === 3) decodedString += '/';
  }
  return decodedString;
}

const decodeForCustomer = string => {
  let decodedString = '';
  for (let char of string) {
    let charcode = char.charCodeAt();
    if (charcode <= 67) {
      charcode += 23;
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
  return {'Date of Allocation': allocationDate, 'Date of Expiry' :expiryDate, 'Customer Name': customerName};
}

export default decodeKey;