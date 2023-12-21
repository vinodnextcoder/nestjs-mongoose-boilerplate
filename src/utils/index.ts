import { HttpException } from "@nestjs/common";

export const errorHandler = (
  res = null,
  statusCode = 500,
  message = "Internal Server Error."
) => {
  throw new HttpException(message, statusCode);
};



export const sendResponse = (
  res = null,
  statusCode = 200,
  message = "Success",
  isSuccess = true,
  data = null
) => {
  return res.json({
    statusCode,
    isSuccess,
    message,
    data ,
  })
};