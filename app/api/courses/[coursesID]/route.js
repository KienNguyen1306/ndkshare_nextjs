import { NextResponse } from "next/server";
import connection from "@/db/db";

export async function GET(request, params) {
  const searchParams  = request.nextUrl.searchParams
  try {
    let id = params.params.coursesID;

    let page = parseInt(searchParams.get("page")) || 1;
    let perPage = 1;
    let offset = (page - 1) * perPage;
    const [dataCoures] = await connection.execute(
      `SELECT * FROM courses WHERE id= ${id}`
    );
    const [countResult] = await connection.execute(
      `SELECT COUNT(*) AS total FROM lessonscourses WHERE id_counrse = ${id}`
    );
    const totalCount = countResult[0].total;
    const [results] = await connection.execute(
      `SELECT * FROM lessonscourses WHERE id_counrse = ${id} LIMIT ${perPage} OFFSET ${offset}`
    );

    const totalPages = Math.ceil(totalCount / perPage);
    const [resultsNameLessons] = await connection.execute(
      `SELECT name  FROM lessonscourses WHERE id_counrse  = ${id}`
    );
    return NextResponse.json(
      {dataCoures:dataCoures, data: results, totalPages, totalCount, resultsNameLessons },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(request,params) {
  try {
    // Lấy id từ query parameter
    const id = params.params.coursesID;

    if (!id) {
      return NextResponse.error("Missing id parameter", 400);
    }

    // Thực hiện truy vấn để xóa bản ghi với id tương ứng
    const [result] = await connection.execute(
      `DELETE FROM courses WHERE id = ${id}`
    );

    // Kiểm tra xem bản ghi đã được xóa thành công hay không
    if (result.affectedRows === 0) {
      return NextResponse.error("Record not found", 404);
    }

    return NextResponse.json(
      { message: "Record deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}




export async function PUT(request, params) {
  try {
    // Lấy id từ query parameter
    const id = params.params.coursesID;
    const requestData = await request.json();
    if (!id) {
      return NextResponse.error("Missing id parameter", 400);
    }

    // Lấy dữ liệu cập nhật từ body của yêu cầu
    const { image,name ,sub} = requestData; // Đây là giả sử dữ liệu cần cập nhật là `newData`

    // Kiểm tra xem có dữ liệu cần cập nhật không
    if (!image || !name || !sub ) {
      return NextResponse.error("Missing fields", 400);
    }

    // Thực hiện truy vấn để cập nhật bản ghi với id tương ứng
    const [result] = await connection.execute(
      `UPDATE courses 
       SET 
         image = ?, 
         name = ?, 
         sub = ?
       WHERE id = ?`,
      [image, name, sub, id]
    );

    // Kiểm tra xem bản ghi đã được cập nhật thành công hay không
    if (result.affectedRows === 0) {
      return NextResponse.error("Record not found", 404);
    }

    return NextResponse.json(
      { message: "Record updated successfully",status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}