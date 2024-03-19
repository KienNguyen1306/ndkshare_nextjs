import connection from "@/db/db";
import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

let avata =[
    'https://i.ibb.co/WpZdk8j/download-2.jpg',
    'https://i.ibb.co/3TQfNrr/download-1.jpg',
    'https://i.ibb.co/gMNXXFn/download-3.jpg',
    'https://i.ibb.co/x2PBrns/download.jpg',
]

export async function POST(request) {
    try {
        const { username, password,email,fullname } = await request.json();
      
        if (!username || !password || !email || !fullname ) {
          return res.status(400).json({ error: 'Missing fields' });
        }
        let image =avata[Math.floor(Math.random() * avata.length)];
        const [result,fields] = await connection.execute(
          `INSERT INTO users (username, password, email, fullname,image) VALUES (?, ?, ?, ?,?)`,
          [ username, password,email,fullname,image]
        );
  
        // Trả về phản hồi thành công nếu không có lỗi
        return NextResponse.json({ fields: fields ,result});
      } catch (error) {
        console.error('Error inserting data:', error);
        return  NextResponse.json({ error: error });
      }
}
