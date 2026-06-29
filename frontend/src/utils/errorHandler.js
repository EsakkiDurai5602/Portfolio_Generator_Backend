export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.errors?.length > 0) {
    return error.response.data.errors[0];
  }
  if (error.message) {
    return error.message;
  }
  return "An unexpected error occurred";
};

export const getErrorMessages = (error) => {
  if (Array.isArray(error.response?.data?.errors)) {
    return error.response.data.errors;
  }
  if (error.response?.data?.message) {
    return [error.response.data.message];
  }
  return ["An unexpected error occurred"];
};
