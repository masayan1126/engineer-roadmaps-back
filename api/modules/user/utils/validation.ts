import { Response } from "express";

export const buildValidationErrorResponse = (
  email: string,
  name: string,
  res: Response
): [res: Response, data: { statusCode: number; error: string }] => {
  if (!email) {
    return [
      res.status(400),
      {
        statusCode: 400,
        error: "メールアドレスは必須です",
      },
    ];
  }

  if (!name) {
    return [
      res.status(400),
      {
        statusCode: 400,
        error: "名前は必須です",
      },
    ];
  }

  return [res, { statusCode: 200, error: "" }];
};
