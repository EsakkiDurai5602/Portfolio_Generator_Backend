export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateForm = (data, fields) => {
  const errors = {};

  fields.forEach((field) => {
    if (!data[field]) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  if (data.email && !validateEmail(data.email)) {
    errors.email = "Invalid email format";
  }

  if (data.password && !validatePassword(data.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  if (data.confirmPassword && data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const getFieldError = (errors, field) => {
  return errors[field] || null;
};

export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};
