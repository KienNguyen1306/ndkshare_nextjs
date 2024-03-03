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
      "SELECT COUNT(*) as totalCount FROM `courses`"
    );

    const totalCount = countResults[0].totalCount;
    const totalPages = Math.ceil(totalCount / perPage);

    // Thực hiện truy vấn để lấy dữ liệu cho trang hiện tại
    const [results] = await connection.execute(
      `SELECT * FROM courses ORDER BY id DESC LIMIT ${offset}, ${perPage}`
    );

    // Trả về kết quả bao gồm cả tổng số trang và số mục trên mỗi trang
    return NextResponse.json(
      { data: results, totalPages, totalCount,perPage },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.error("Error message", 500);
  }
}





export async function POST(request) {
  try {
    const requestBody = await request.json();

    // Extract data from the request body
    const { image, name, sub} = requestBody;

    // Your validation logic here
    if (!image || !name || !sub ) {
      return NextResponse.error("Missing fields", 400);
    }

    // Your database insertion logic here
    const [data] = await connection.execute(
      `INSERT INTO courses (image, name, sub) VALUES ('${image}', '${name}','${sub}')`
    );

    const [insertedData] = await connection.execute(
      `SELECT * FROM courses WHERE id = ${data.insertId}`
    );
    return NextResponse.json({ data: insertedData[0] , status: 201}, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}