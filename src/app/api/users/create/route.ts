import getQuery from "@/utils/getQuery";
import Auth from "@/middleware/auth";
import bcrypt from "bcrypt";
import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { trimmedData } from "@/utils/trimmed";
import { validateEmail } from "@/utils/emailValidation";

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const { user, email, password } = await req.json();
  if (Auth(getQuery(req))) {
    return Response.json({ status: 403, msg: "Invalid Api Key" });
  }
  try {
    if (
      trimmedData(user) &&
      trimmedData(email) &&
      trimmedData(password) &&
      validateEmail(email)
    ) {
      const hashPassword = await bcrypt.hash(password, 10);
      const createData = await prisma.users.create({
        data: {
          user: user,
          email: email,
          password: hashPassword,
        },
        select: {
          id: true,
          user: true,
          email: true,
          created: true,
        },
      });
      console.log(createData);
      return Response.json({ isLogin: true, data: createData });
    }
  } catch (err) {
    return Response.json(err);
  }
}
