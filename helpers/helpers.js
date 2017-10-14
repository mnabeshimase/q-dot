const request = require('request');

const changeCase = (name) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
};

const nameFormatter = (name) => {
  if (name.includes(' ')) {
    return name.split(' ').map(changeCase).join(' ');
  } else {
    return changeCase(name);
  }
};

const phoneNumberFormatter = (number) => {
  return number.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
};

const EMACalc = (mArray, mRange) => {
  var k = 2 / (mRange + 1);
  // first item is just the same as the first item in the input
  emaArray = [mArray[0]];
  // for the rest of the items, they are computed with the previous one
  for (var i = 1; i < mArray.length; i++) {
    emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
  }
  return emaArray[emaArray.length - 1];
};

module.exports = {
  nameFormatter: nameFormatter,
  phoneNumberFormatter: phoneNumberFormatter,
  EMACalc: EMACalc
};

