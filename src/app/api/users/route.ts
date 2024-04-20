import getQuery from "@/utils/getQuery";
import Auth from "@/middleware/auth";
import bcrypt from "bcrypt";
import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { trimmedData } from "@/utils/trimmed";
import { validateEmail } from "@/utils/emailValidation";

// GET login
export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const { email, password } = await req.json();
  try {
    const userDatas = await prisma.users.findUnique({
      where: { email },
    });
    if (Auth(getQuery(req))) {
      return Response.json({ status: 403, msg: "Invalid Api Key" });
    }
    if (!userDatas) {
      return Response.json({
        status: 404,
        msg: "Email not Found",
      });
    } else {
      if (await bcrypt.compare(password, userDatas.password)) {
        return Response.json({
          data: {
            id: userDatas.id,
            user: userDatas.user,
            email: userDatas.email,
            created: userDatas.created,
          },
        });
      }
    }
  } catch (err) {
    return Response.json(err);
  }
}
