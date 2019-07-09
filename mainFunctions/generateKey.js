const generateKey = (allocation, expiry, customer) => {
  const keyArray = ['', '', '', '', '', '-', '', '', '', '', '', '-', '', '', '', '', '', '-', '', '', '', '', '', '-', '', '', '', '', ''];

}

const parseDate = date => {
  const dateArray = date.split('-');
  dateArray[0] = dateArray[0].slice(2);
  return dateArray.join('');
}

const maskForAllocation = 