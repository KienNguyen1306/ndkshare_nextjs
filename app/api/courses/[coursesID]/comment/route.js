import connection from "@/db/db";
import { getCurrentDateTime } from "@/helper";
import { NextResponse } from "next/server";

export async function GET(request, params) {
  const searchParams = request.nextUrl.searchParams;

  try {
    let id = params.params.coursesID;
    const page = parseInt(searchParams.get("page")) || 1;
    const perPage = parseInt(searchParams.get("limit")) || 10; // Số mục trên mỗi trang
    const offset = (page - 1) * perPage;
    // // Truy vấn để lấy tổng số mục
    const [countComments] = await connection.execute(
      `SELECT COUNT(*) as totalCount FROM comment_courese WHERE comment_courese.id_courese = ${id}`
    );
    const totalCountCmt = countComments[0].totalCount;
    const totalPagesCmt = Math.ceil(totalCountCmt / perPage);

    const [comments] = await connection.execute(
      `SELECT comment_courese.cmt,comment_courese.create_time, users.fullname,users.image
       FROM comment_courese
       INNER JOIN users ON comment_courese.id_user = users.id 
       WHERE comment_courese.id_courese = ${id} 
       ORDER BY comment_courese.id DESC
       LIMIT ${offset},${perPage}`
    );
    return NextResponse.json(
      { comments, totalPagesCmt, totalCountCmt, perPage },
      { status: 200 }
    );
  } catch (err) {
    console.log("sdddddd", err);
    return NextResponse.error("Error message", 500);
  }
}

export async function POST(request) {
  try {
    const requestBody = await request.json();

    // Extract data from the request body
    const { cmt, id_courese, id_user } = requestBody;

    // Your validation logic here
    if (!cmt || !id_courese || !id_user) {
      return NextResponse.error("Missing fields", 400);
    }

    // Your database insertion logic here
    let formatted_time = getCurrentDateTime();

    const [data] = await connection.execute(
      `INSERT INTO comment_courese ( id_courese, id_user, cmt, active, create_time) VALUES ("${id_courese}", "${id_user}", "${cmt}", '0', '${formatted_time}')`
    );

    return NextResponse.json({ data: data, status: 201 }, { status: 201 });
  } catch (error) {
    return NextResponse.error("Internal Server Error", 500);
  }
}

// export async function DELETE(request, params) {
//   try {
//     // Lấy id từ query parameter
//     const id = params.params.modgameID;

//     if (!id) {
//       return NextResponse.error("Missing id parameter", 400);
//     }

//     // Thực hiện truy vấn để xóa bản ghi với id tương ứng
//     const [result] = await connection.execute(
//       `DELETE FROM modgames WHERE id = ${id}`
//     );

//     // Kiểm tra xem bản ghi đã được xóa thành công hay không
//     if (result.affectedRows === 0) {
//       return NextResponse.error("Record not found", 404);
//     }

//     return NextResponse.json(
//       { message: "Record deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.error("Internal Server Error", 500);
//   }
// }
