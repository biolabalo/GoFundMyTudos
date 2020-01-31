const validationHelper = (() => {
  const checkAllFields = (input, field, errors) => {
    switch (field) {
      case "email":
        return checkEmail(input, errors);
      case "password":
        return checkPassword(input, errors);
      default:
        break;
    }
  };

  const checkEmail = (input, errors) => {
    const regexEmailCheck = new RegExp(/\S+@\S+\.\S+/);
    if (!regexEmailCheck.test(input.trim())) {
      errors = {
        email: "Please enter a valid email address"
      };
      return errors;
    }
    delete errors.email;
  };

  const checkPassword = (input, errors) => {
    if (input.length <= 5) {
      errors = {
        password: "Please enter a password with at least 5 characters"
      };
      return errors;
    }
    delete errors.password;
  };

  return {
    checkAllFields,
    checkEmail,
    checkPassword
  };
})();

export default validationHelper;
