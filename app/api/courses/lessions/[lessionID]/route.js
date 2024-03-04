import { NextResponse } from "next/server";
import connection from "@/db/db";


export async function DELETE(request,params) {
  try {
    // Lấy id từ query parameter
    const id = params.params.lessionID;

    if (!id) {
      return NextResponse.error("Missing id parameter", 400);
    }

    // Thực hiện truy vấn để xóa bản ghi với id tương ứng
    const [result] = await connection.execute(
      `DELETE FROM lessonscourses WHERE id = ${id}`
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


