import { NextResponse } from "next/server";
import connection from "@/db/db";

export async function GET(request, params) {
  try {
    let id = params.params.coursesID;
    const [dataCoures] = await connection.execute(
      `SELECT * FROM courses WHERE id= ${id}`
    );
    const [titleCoures] = await connection.execute(
      `SELECT * FROM titlecourses WHERE courses_id= ${id}`
    );

    const [dataLission] = await connection.execute(
      `SELECT * FROM lessonscourses WHERE id_counrse = ${id}`
    );

    return NextResponse.json(
      { dataCoures, titleCoures, dataLission },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, params) {
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
    const { image, name, sub } = requestData; // Đây là giả sử dữ liệu cần cập nhật là `newData`

    // Kiểm tra xem có dữ liệu cần cập nhật không
    if (!image || !name || !sub) {
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
      { message: "Record updated successfully", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
