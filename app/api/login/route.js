import connection from "@/db/db";
import jwt from "jsonwebtoken";

import { getCsrfToken,getSession } from "next-auth/react";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/route";

export async function GET(request) {
  const headersList = headers();
  const authorizationHeader = headersList.get("authorization");

  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    //   if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    //   }
    //   const token = authorizationHeader.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decodedToken = jwt.verify(token.value, `${process.env.SECRET_KEY}`);
    const { username } = decodedToken;
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    if (rows.length > 0) {
      return NextResponse.json(rows[0], { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error getting user by token:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}


export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`
    );

    if (rows.length > 0) {
      const assetToken = jwt.sign({ username }, `${process.env.SECRET_KEY}`, {
        expiresIn: "1h",
      });

      // Tạo resetToken mới
      const resetToken = jwt.sign({ username }, `${process.env.SECRET_KEY}`, {
        expiresIn: "1d", // Ví dụ: reset token hết hạn sau 1 ngày
      });

      cookies().set({
        assetToken,
        resetToken,
      });
      return NextResponse.json(
        { assetToken, resetToken },
        { status: 200, headers: { "Set-Cookie": `token=${assetToken}` } }
      );
    } else {
      return NextResponse.json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
