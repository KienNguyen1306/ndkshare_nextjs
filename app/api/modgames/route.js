import { NextResponse } from "next/server";
import connection from "@/db/db";
export async function GET(request) {
  const searchParams  = request.nextUrl.searchParams
  try {

    const page = parseInt(searchParams.get("page")) || 1;
    const perPage = 5; // Số mục trên mỗi trang
    const offset = (page - 1) * perPage;

    // Truy vấn để lấy tổng số mục
    const [countResults] = await connection.execute(
      "SELECT COUNT(*) as totalCount FROM `modgames`"
    );

    const totalCount = countResults[0].totalCount;
    const totalPages = Math.ceil(totalCount / perPage);

    // Thực hiện truy vấn để lấy dữ liệu cho trang hiện tại
    const [results] = await connection.execute(
      `SELECT * FROM modgames LIMIT ${offset}, ${perPage}`
    );

    return NextResponse.json(
      { data: results, totalPages, totalCount },
      { status: 200 }
    );
  } catch (err) {
    console.log("err", err);
    return NextResponse.error("Error message", 500);
  }
}
