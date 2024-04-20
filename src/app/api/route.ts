export const dynamic = "force-dynamic";
import { middleWare } from "@/middleware/middleware";

export async function GET(request: Request) {
  return new Response("Hello, Next.js!", middleWare);
}
