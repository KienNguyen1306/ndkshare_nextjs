import connection from "@/db/db";
import { NextResponse } from "next/server";

export async function GET(request, params) {
  try {
    let id = params.params.modgameID;
    const [results] = await connection.execute(
      `SELECT * FROM modgames WHERE id = ${id}`
    );
    return NextResponse.json({ data: results[0] }, { status: 200 });
  } catch (err) {
    return NextResponse.error("Error message", 500);
  }
}

export async function DELETE(request,params) {
  try {
    // Lấy id từ query parameter
    const id = params.params.modgameID;

    if (!id) {
      return NextResponse.error("Missing id parameter", 400);
    }

    // Thực hiện truy vấn để xóa bản ghi với id tương ứng
    const [result] = await connection.execute(
      `DELETE FROM modgames WHERE id = ${id}`
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
    const id = params.params.modgameID;
    const requestData = await request.json();
    if (!id) {
      return NextResponse.error("Missing id parameter", 400);
    }

    // Lấy dữ liệu cập nhật từ body của yêu cầu
    const { image,name ,sub,link,version,mods} = requestData; // Đây là giả sử dữ liệu cần cập nhật là `newData`

    // Kiểm tra xem có dữ liệu cần cập nhật không
    if (!image || !name || !sub || !link || !version || !mods) {
      return NextResponse.error("Missing fields", 400);
    }

    // Thực hiện truy vấn để cập nhật bản ghi với id tương ứng
    const [result] = await connection.execute(
      `UPDATE modgames 
       SET 
         image = ?, 
         name = ?, 
         sub = ?, 
         link = ?, 
         version = ?, 
         mods = ? 
       WHERE id = ?`,
      [image, name, sub, link, version, mods, id]
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
