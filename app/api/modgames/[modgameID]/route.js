import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import connection from "@/app/db/db";

export async function GET(request,params) {
    try {
        let id = params.params.modgameID
        const [results] = await connection.execute(
          `SELECT * FROM modgames WHERE id = ${id}`
        );
        return NextResponse.json({ data: results[0] }, { status: 200 });
      } catch (err) {
        return NextResponse.error('Error message', 500);
      }
}
