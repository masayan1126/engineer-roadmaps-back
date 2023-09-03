import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const handleError = (e: Error) => {
  if (e instanceof PrismaClientKnownRequestError) {
    if (e.code === "P2002") {
      return [400, "そのメールアドレスはすでに使用されています"];
    }
  }

  return [
    500,
    "システムエラーが発生しました。しばらく時間をおいて再試行してください",
  ];
};
