import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

router.get("/road-maps", async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  // TODO: 実装
});
export default router;
