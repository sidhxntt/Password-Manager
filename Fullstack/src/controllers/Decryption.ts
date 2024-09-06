import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET as string;

export function decryptJWT(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1]; // Getting the token from the header

    if (!token) {
      return NextResponse.json({ message: "UNAUTHENTICATED" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, secretKey) as JwtPayload;
      (req as NextRequest & { user: JwtPayload }).user = decoded; // Attach the decoded payload to req.user
      return handler(req); // Proceed to the handler if successful
    } catch (err) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
    }
  };
}
