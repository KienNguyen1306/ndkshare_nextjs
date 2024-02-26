import { NextResponse } from "next/server";
import connection from "@/app/db/db";

export async function GET(request, params) {
  try {
    let id = params.params.coursesID;
    const { searchParams } = new URL(request.url);
    let page = parseInt(searchParams.get("page")) || 1;
    let perPage = 1;
    let offset = (page - 1) * perPage;
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
      { data: results, totalPages, totalCount, resultsNameLessons },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
