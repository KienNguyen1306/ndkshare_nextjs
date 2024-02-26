import { NextResponse } from "next/server";
import connection from "@/app/db/db";
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const perPage = 5; // Số mục trên mỗi trang
    const offset = (page - 1) * perPage;

    // Truy vấn để lấy tổng số mục
    const [countResults] = await connection.execute(
      "SELECT COUNT(*) as totalCount FROM `courses`"
    );

    const totalCount = countResults[0].totalCount;
    const totalPages = Math.ceil(totalCount / perPage);

    // Thực hiện truy vấn để lấy dữ liệu cho trang hiện tại
    const [results] = await connection.execute(
      `SELECT * FROM courses LIMIT ${offset}, ${perPage}`
    );

    // Trả về kết quả bao gồm cả tổng số trang và số mục trên mỗi trang
    return NextResponse.json(
      { data: results, totalPages, totalCount },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.error("Error message", 500);
  }
}
