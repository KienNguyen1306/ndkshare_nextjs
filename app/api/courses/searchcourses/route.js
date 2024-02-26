import { NextResponse } from "next/server";
import connection from "@/app/db/db";

export async function GET(request) {
  const searchParams  = request.nextUrl.searchParams
  try {


    const page = parseInt(searchParams.get('page')) || 1;
    const perPage = 3; // Số mục trên mỗi trang
    const offset = (page - 1) * perPage;
    const searchName = searchParams.get('k'); // Lấy tên cần tìm kiếm

    let totalCountQuery = "SELECT COUNT(*) as totalCount FROM `courses`";
    let dataQuery = "SELECT * FROM `courses`";

    const whereClause = []; // Danh sách điều kiện WHERE

    // Nếu có tên cần tìm kiếm, thêm điều kiện WHERE vào truy vấn
    if (searchName) {
      whereClause.push("name LIKE '%" + searchName + "%'");
    }

    // Nếu có điều kiện WHERE được xác định, thêm vào truy vấn chính
    if (whereClause.length > 0) {
      totalCountQuery += " WHERE " + whereClause.join(" AND ");
      dataQuery += " WHERE " + whereClause.join(" AND ");
    }

    // Truy vấn để lấy tổng số mục
    const [countResults] = await connection.execute(totalCountQuery);
    const totalCount = countResults[0].totalCount;
    const totalPages = Math.ceil(totalCount / perPage);

    // Thực hiện truy vấn để lấy dữ liệu cho trang hiện tại
    dataQuery += `LIMIT ${offset}, ${perPage}`;
    const [results] = await connection.execute(
      dataQuery
    );
    // Trả về kết quả bao gồm cả tổng số trang và số mục trên mỗi trang
    return NextResponse.json({ data: results, totalPages, totalCount }, { status: 200 });
  } catch (err) {
  return NextResponse.error('Error message', 500);
  }
}
