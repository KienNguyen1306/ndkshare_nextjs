import { NextResponse } from "next/server";
import connection from "@/app/db/db";

export async function GET(request, params) {
  try {
    let id = params.params.coursesID;
    const { searchParams } = new URL(request.url);
    let page = parseInt(searchParams.get('page')) || 1;
    let perPage = 1;

    let offset = (page - 1) * perPage;

    // Truy vấn để lấy tổng số mục
    const [countResult, countFields] = await connection.execute(
      "SELECT COUNT(*) AS total FROM `lessonscourses` WHERE id_counrse = ?",
      [id]
    );
    const totalCount = countResult[0].total;

    // Truy vấn để lấy dữ liệu của trang hiện tại
    const [results, fields] = await connection.execute(
      "SELECT * FROM `lessonscourses` WHERE id_counrse = ? LIMIT ? OFFSET ?",
      [id, perPage, offset]
    );

    // Tính toán tổng số trang
    const totalPages = Math.ceil(totalCount / perPage);

    // Trả về dữ liệu kèm theo thông tin về tổng số trang và tổng số mục

    const [resultsNameLessons, fieldsName] = await connection.execute(
      "SELECT name  FROM `lessonscourses` WHERE id_counrse  = ?",
      [id]
    );
    return NextResponse.json({ data: results, totalPages, totalCount,resultsNameLessons }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
