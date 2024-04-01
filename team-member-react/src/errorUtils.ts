interface ErrorResponse {
  response?: {
    data?: {
      error?:
        | {
            email?: string[];
          }
        | string[];
    };
  };
}

export const getErrorMessage = (error: ErrorResponse): string => {
  if (error.response && error.response.data) {
    const errorData = error.response.data.error;

    if (errorData && typeof errorData === 'object' && 'email' in errorData) {
      // Error has a specific 'email' field
      return String(errorData.email?.[0]);
    } else if (Array.isArray(errorData)) {
      // Error is a generic array of messages
      return String(errorData[0]);
    }
  }

  return 'Unexpected error while adding team member!';
};
