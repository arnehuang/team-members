export const getErrorMessage = (error: any): string => {
  if (error.response?.data?.error?.email) {
    return String(error.response.data.error.email[0]);
  } else if (
    error.response?.data?.error &&
    Array.isArray(error.response.data.error)
  ) {
    return String(error.response.data.error[0]);
  }
  return 'Unexpected error while adding team member!';
};
