import { AxiosError } from "axios";

export const errorMapping: (error: Error) => string = (
  error: Error
): string => {
  if (error instanceof AxiosError) {
    return error.response?.data.message;
  } else {
    return "Some error occurs";
  }
};
