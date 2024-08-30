const pwRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

const ValidateService = {
  validateUsername: function (values) {
    const unRegex = new RegExp(/^[a-zA-Z0-9]+$/);
    return unRegex.test(values.username);
  },
  validatePasswordsMatch: function (values) {
    if (values.password1 !== values.password2) {
      return false;
    }
    return true;
  },
  validatePassword1: function (values) {
    return pwRegex.test(values.password1);
  },
  validatePassword2: function (values) {
    return pwRegex.test(values.password2);
  },
};

export default ValidateService;
