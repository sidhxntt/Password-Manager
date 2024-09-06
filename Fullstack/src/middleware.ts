import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// Wrap the Clerk middleware to handle authentication
const clerk = clerkMiddleware();

async function middleware(req: NextRequest) {
  // Call Clerk middleware first
  const clerkResponse = await clerk(req);
  if (clerkResponse) {
    return clerkResponse; // Return early if Clerk middleware decides the response
  }

  const secretKey = process.env.JWT_SECRET as string;

  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1]; // Getting the token from the header

  if (!token) {
    return NextResponse.json({ message: "UNAUTHENTICATED" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    (req as NextRequest & { user: JwtPayload }).user = decoded; // Attach the decoded payload to req.user
    // Proceed to the next handler if successful
    return NextResponse.next();
  } catch (err) {
    return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
  }
}

export default middleware;

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)","/api/add-account"],
};
