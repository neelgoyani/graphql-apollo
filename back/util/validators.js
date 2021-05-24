module.exports.validateUserInput = ({
  userName,
  email,
  password,
  confirmPassword,
}) => {
  const errors = {};
  if (userName.trim() === "") {
    errors.userName = "Username must be not empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must be not empty";
  } else {
    const emailFormat =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(emailFormat)) {
      errors.email = "Email must be valid email address";
    }
  }
  if (password == "") {
    errors.password = "Password must be not null";
  } else {
    if (password != confirmPassword) {
      errors.confirmPassword = "password not matched";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.loginValidation = ({ userName, password }) => {
  const errors = {};
  if (userName.trim() == "") {
    errors.userName = "Username must contain some value";
  }
  if (password == "") {
    errors.password = "Password must be not null";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
