const validate = (val, rules) => {
  //Object.keys returns and array with the name of the keys
  //Array.every iteratates to the array and return true only if all
  //items pass the callback test
  return Object.keys(rules).every(rule => {
    switch (rule) {
      case 'isEmail':
        return emailValidator(val);
      case 'minLength':
        return minLengthValidator(val, rules[rule]);
      case 'equalTo':
        return equalToValidator(val, rules[rule]);
      case 'notEmpty':
          return notEmpty(val);
      default:
        return false; //If there are no validator available for a rule return false
    }
  });
};

const emailValidator = (val) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(val);
};

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
};

const equalToValidator = (val, original) => {
  return val === original;
};

const notEmpty = (val) => {
  return val.trim() !== '';
};

export default validate;
