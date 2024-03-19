import connection from "@/db/db";
import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Xử lý yêu cầu POST
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

      // Lấy thời gian hết hạn của token
      const assetTokenExpireTime = new Date(
        Date.now() + 60 * 60 * 1000 // 1 hour in milliseconds
      );
      const resetTokenExpireTime = new Date(
        Date.now() + 24 * 60 * 60 * 1000 // 1 day in milliseconds
      );
      // Thiết lập cookie với AccessToken và RefreshToken
      cookies().set({
        assetToken,
        resetToken,
      });

      return NextResponse.json(
        { assetToken, resetToken ,assetTokenExpireTime,resetTokenExpireTime},
        {
          status: 200,
          headers: {
            "Set-Cookie": `token=${assetToken}; resetToken=${resetToken}; Max-Age=${
              3600 * 24 * 1
            }`,
          },
        }
      );
    } else {
      return NextResponse.json({ message: "Unauthorized" });
    }
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

// Xử lý yêu cầu GET
export async function GET(request) {
  try {
    // Lấy AccessToken từ cookie hoặc request header
    const assetToken =
      request.cookies?.token ||
      request.headers?.authorization?.replace("Bearer ", "");

    if (!assetToken) {
      return NextResponse.json(
        { message: "Missing AccessToken" },
        { status: 401 }
      );
    }

    try {
      // Kiểm tra và giải mã AccessToken
      const decoded = jwt.verify(assetToken, `${process.env.SECRET_KEY}`);

      // AccessToken hợp lệ, tiếp tục xử lý yêu cầu
      return NextResponse.json({ message: "Authorized" });
    } catch (error) {
      // AccessToken hết hạn, thực hiện làm mới
      if (error.name === "TokenExpiredError") {
        // Lấy RefreshToken từ cookie hoặc request header
        const resetToken =
          request.cookies?.resetToken || request.headers?.reset_token;

        if (!resetToken) {
          return NextResponse.json(
            { message: "Missing RefreshToken" },
            { status: 401 }
          );
        }

        try {
          // Kiểm tra và giải mã RefreshToken
          const decodedReset = jwt.verify(
            resetToken,
            `${process.env.SECRET_KEY}`
          );

          // RefreshToken hợp lệ, tạo AccessToken mới và trả về cho client
          const newAssetToken = jwt.sign(
            { username: decoded.username },
            `${process.env.SECRET_KEY}`,
            {
              expiresIn: "1h", // Đặt lại thời gian hết hạn của AccessToken
            }
          );

          // Cập nhật cookie với AccessToken mới
          cookies().set({
            token: newAssetToken,
            resetToken,
          });

          // Trả về AccessToken mới
          return NextResponse.json(
            { assetToken: newAssetToken },
            { status: 200 }
          );
        } catch (error) {
          // RefreshToken không hợp lệ
          return NextResponse.json(
            { message: "Invalid RefreshToken" },
            { status: 401 }
          );
        }
      } else {
        // Lỗi khác liên quan đến AccessToken
        return NextResponse.json(
          { message: "Invalid AccessToken" },
          { status: 401 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
