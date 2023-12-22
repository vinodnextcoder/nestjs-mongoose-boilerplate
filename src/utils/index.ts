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

export const userSuccessResponse = {
  status: 200,
  description: "Success! Returns the user data.",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          statusCode: { type: "number", example: 201 },
          isSuccess: { type: "boolean", example: true },
          message: { type: "string", example: "Record Created" },
          data: { type: "object", example: "Record Created" },
        },
      },
      example: {
        statusCode: 201,
        isSuccess: true,
        message: "Record Created",
        data: {
          username: "test username",
          first_name: "pradip",
          last_name: "patil",
          email: "pradip@test.com",
          email_code: "DAQJ1",
          password: "4xeuIuIK3XGXHX3xtMBAM4uYeWlWsOg8RC",
          password_reset_code: "122222",
          createdAt: "2023-12-22T04:45:45.710Z",
          updatedAt: "2023-12-22T04:45:45.710Z",
          _id: "6585147f97b06",
        },
      },
    },
  },
};

export const userErrorResponse = {
  status: 400,
  description: "Error : invalid inpur data.",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          statusCode: { type: "number", example: 400 },
          isSuccess: { type: "boolean", example: false },
          message: { type: "string", example: "Record Created" },
          data: { type: "object", example: null},
          timestamp: { type: "date", example: "2023-12-22T05:17:16.499Z" },
          error: { type: "array", example:  [
            "username should not be empty",
            "username must be a number string"
        ] }
        },
      },
      example: {
          "statusCode": 400,
          "message": "Bad Request Exception",
          "error": [
              "username should not be empty",
              "username must be a number string"
          ],
          "timestamp": "2023-12-22T05:17:16.499Z",
          "path": "/v1/users",
          "isSuccess": false,
          "data": null
      
      },
    },
  },
};