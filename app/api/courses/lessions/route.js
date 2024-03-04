import { NextResponse } from "next/server";
import connection from "@/db/db";

export async function POST(request) {
  try {
    const requestBody = await request.json();

    // Extract data from the request body
    const { linkvideo, name,id_counrse } = requestBody;

    // Your validation logic here
    if (!linkvideo || !name || !id_counrse ) {
      return NextResponse.error("Missing fields", 400);
    }

    // Your database insertion logic here
    const [data] = await connection.execute(
      `INSERT INTO lessonscourses (linkvideo, name, id_counrse) VALUES ('${linkvideo}', '${name}','${id_counrse}')`
    );

    const [insertedData] = await connection.execute(
      `SELECT * FROM lessonscourses WHERE id = ${data.insertId}`
    );
    return NextResponse.json({ data: insertedData[0] , status: 201}, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", 500);
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
