import connection from "@/db/db";
import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

let avata = [
  "https://i.ibb.co/WpZdk8j/download-2.jpg",
  "https://i.ibb.co/3TQfNrr/download-1.jpg",
  "https://i.ibb.co/gMNXXFn/download-3.jpg",
  "https://i.ibb.co/x2PBrns/download.jpg",
];

export async function POST(request) {
  try {
    const { username, password, email, fullname } = await request.json();

    if (!username || !password || !email || !fullname) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Kiểm tra xem username đã tồn tại hay chưa
    const [existingUser] = await connection.execute(
      `SELECT username FROM users WHERE username = ?`,
      [username]
    );

    if (existingUser.length > 0) {
      return NextResponse.json({
        status: 400,
        error: "Username already exists",
      });
    }

    // Kiểm tra xem username đã tồn tại hay chưa
    const [existingEmail] = await connection.execute(
      `SELECT username FROM users WHERE email = ?`,
      [email]
    );

    if (existingEmail.length > 0) {
      return NextResponse.json({
        status: 400,
        error: "Email already exists",
      });
    }

    let image = avata[Math.floor(Math.random() * avata.length)];
    const [result, fields] = await connection.execute(
      `INSERT INTO users (username, password, email, fullname,image) VALUES (?, ?, ?, ?,?)`,
      [username, password, email, fullname, image]
    );

    // Trả về phản hồi thành công nếu không có lỗi
    return NextResponse.json(
      { status: 201, fields: fields, result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json({ status: 500, error: error });
  }
}
