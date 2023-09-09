import { NextRequest, NextResponse } from "next/server";
import { ratelimiter } from "./lib/rate-limiter";

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";
  console.log(req.ip);
  console.log(ip);

  try {
    const { success } = await ratelimiter.limit(ip);

    if (!success) return new NextResponse("Please don't ask me too fast.");

    return NextResponse.next();
  } catch (error) {
    return new NextResponse(
      "Sorry, something went wrong processing your message. Please try again later."
    );
  }
}

export const config = {
  matcher: "/api/message/:path*",
};
