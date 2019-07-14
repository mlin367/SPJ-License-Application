import generateKey from './mainFunctions/generateKey.js';
import decodeKey from './mainFunctions/decodeKey.js';

const allocation = document.getElementById('allocation');
const expiry = document.getElementById('expiry');
const customer = document.getElementById('customer');
const submit = document.getElementById('submit');
const retrieve = document.getElementById('retrieve');

let allocationString;
let expiryString;
let customerString;

allocation.oninput = () => {
  console.log(allocation.value)
  allocationString = allocation.value;
}
expiry.oninput = () => expiryString = expiry.value;
customer.oninput = () => customerString = customer.value.toUpperCase();
submit.onclick = () => {
  if (!allocationString || !expiryString || !customerString) {
    alert('all fields must be filled out!'); 
  } else if (!/^[a-zA-Z]+$/.test(customerString) || customerString.length !== 13) {
    alert('customer name has to be 13 characters long and only include letters!')
  } else {
    const key = generateKey(allocationString, expiryString, customerString);
    document.getElementById('license').innerHTML = `Your License key is ${key}`;
    sessionStorage.setItem('key', key);
  }
}

retrieve.onclick = () => {
  if (sessionStorage.getItem('key') === null) {
    alert('No license key in session storage!');
  } else {
    const infoNode = document.getElementById('info');
    infoNode.innerHTML = '';
    const decodeObject = decodeKey(sessionStorage.getItem('key'));
    for (let key in decodeObject) {
      let node = document.createElement('li');
      node.innerHTML = `${key}: ${decodeObject[key]}`;
      infoNode.appendChild(node);
    }
  }
}

