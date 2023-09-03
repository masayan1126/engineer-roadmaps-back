import express, { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { FindUserUseCase } from "../useCase/FindUserUseCase";
import { CreateUserUseCase } from "../useCase/CreateUserUseCase";
import { buildValidationErrorResponse } from "../utils/validation";
import { handleError } from "../utils/errorHandler";

const router = express.Router();

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

/**
 * ユーザー新規作成
 */
router.post("", async (req: Request, res: Response) => {
  const { email, name } = parseReqBody(req);

  const resTuple = buildValidationErrorResponse(email, name, res);
  if (resTuple[1].statusCode !== 200) {
    const _res = resTuple[0];
    return _res.json(resTuple[1]);
  }

  try {
    const useCase = new CreateUserUseCase();
    const user = await useCase.create(email, name);

    return res.status(200).json({
      user,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      const [statusCode, message] = handleError(e);

      return res.status(400).json({
        statusCode,
        error: message,
      });
    }
  }
});

/**
 * ユーザー一覧取得
 */
router.get("", async (req: Request, res: Response) => {
  // T0D0: ユースケースに切り出す
  const users = await prisma.user.findMany();

  return res.status(200).json({
    users,
  });
});

/**
 * ユーザー取得
 */
router.get("/:id", async (req: Request, res: Response) => {
  const useCase = new FindUserUseCase();
  const user = await useCase.find(req.params.id);

  return res.status(200).json({
    data: user,
  });
});

/**
 * ユーザー更新
 */
router.patch("", async (req: Request, res: Response) => {
  const { id, email, name } = parseReqBody(req);

  const resTuple = buildValidationErrorResponse(email, name, res);
  if (resTuple[1].statusCode !== 200) {
    const _res = resTuple[0];
    return _res.json(resTuple[1]);
  }

  // T0D0: ユースケースに切り出す
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
      },
    });

    return res.status(200).json({
      user,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(500).json({
        statusCode: 500,
        error: e.message,
      });
    }
  }
});

router.delete("", async (req: Request, res: Response) => {
  const { id } = req.body;

  // T0D0: ユースケースに切り出す
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return res.status(200).json({
    user,
  });
});

function parseReqBody(req: Request): User {
  return req.body.data;
}

export default router;
