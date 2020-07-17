export const validate = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.trim().length >=  rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.trim().length <=  rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      isValid = value.trim().match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/g) && isValid;
    }
    return isValid;
  }
