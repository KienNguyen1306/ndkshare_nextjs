<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

 <div className="flex flex-col gap-5 m-3">
      {/* Comment Container */}
      <div>
        <div className="flex w-full justify-between border rounded-md">
          <div className="p-3">
            <div className="flex gap-3 items-center">
              <img
                src="https://avatars.githubusercontent.com/u/22263436?v=4"
                className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
              />
              <h3 className="font-bold">
                User 1
                <br />
                {/* <span className="text-sm text-gray-400 font-normal">Level 1</span> */}
              </h3>
            </div>
            <p className="text-gray-600 mt-2">this is sample commnent</p>
            <button className="text-right text-blue-500">Reply</button>
          </div>

        </div>
        {/* Reply Container  */}
        <div className="text-gray-300 font-bold pl-14">|</div>
        <div className="flex justify-between border ml-5  rounded-md">
          <div className="p-3">
            <div className="flex gap-3 items-center">
              <img
                src="https://avatars.githubusercontent.com/u/22263436?v=4"
                className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
              />
              <h3 className="font-bold">
                User 2
                <br />
                <span className="text-sm text-gray-400 font-normal">Level 1</span>
              </h3>
            </div>
            <p className="text-gray-600 mt-2">this is sample commnent</p>
          </div>
        </div>
      </div>


      {/*  Comment 2  */}
      <div className="flex w-full justify-between border rounded-md">
        <div className="p-3">
          <div className="flex gap-3 items-center">
            <img
              src="https://avatars.githubusercontent.com/u/22263436?v=4"
              className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
            />
            <h3 className="font-bold">
              User 4
              <br />
              <span className="text-sm text-gray-400 font-normal">Level 1</span>
            </h3>
          </div>
          <p className="text-gray-600 mt-2">this is sample commnent</p>
          <button className="text-right text-blue-500">Reply</button>
        </div>
      </div>
    </div>

class="z-10 flex items-center justify-center px-3 h-8 leading-tight hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"

# HOST= "sql.freedb.tech"

# USER= "freedb_bosschua"

# DATABASE="freedb_ndkshare"

# PASSWORD = "qkgBV52ZtnDz!UM"

# PASSWORD = ""

// Lấy thông tin người dùng từ token (ví dụ: username)
// const { username } = decodedToken;

    // // Truy vấn cơ sở dữ liệu để lấy thông tin người dùng
    // const [rows, fields] = await connection.execute(
    //   `SELECT * FROM users WHERE username = ${username}`
    // );

    // if (rows.length > 0) {
    //   // Trả về thông tin người dùng
    //   return new Response(JSON.stringify(rows[0]), { status: 200 });
    // } else {
    //   return new Response(JSON.stringify({ message: "User not found" }), {
    //     status: 404,
    //   });
    // }






        // const res = await fetch("http://localhost:3000/api/login", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const data = await res.json();

        // if (data.assetToken) {
        //   return data;
        // }
        // return null;






export async function GET(request) {
  const headersList = headers();
  const authorizationHeader = headersList.get("authorization");

  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    //   if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    //   }
    //   const token = authorizationHeader.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decodedToken = jwt.verify(token.value, `${process.env.SECRET_KEY}`);
    const { username } = decodedToken;
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    if (rows.length > 0) {
      return NextResponse.json(rows[0], { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error getting user by token:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}


===============================================
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    setLoading(true);
    loginUser({ username: username, password }).then((data) => {
      if (data.message) {
        setError(true);
        setLoading(false);
      } else {
        setError(false);
        getUser(setUser);
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    getUser(setUser);
  }, []);
  ============================================= -->



  
          // const { username, password } = credentials;
          // const [rows] = await connection.execute(
          //   `SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`
          // );
          // if (rows.length > 0) {
          //   const assetToken = jwt.sign(
          //     { username },
          //     `${process.env.SECRET_KEY}`,
          //     { expiresIn: "1h" }
          //   );
          //   const resetToken = jwt.sign(
          //     { username },
          //     `${process.env.SECRET_KEY}`,
          //     { expiresIn: "1d" }
          //   );
          //   return { assetToken, resetToken, rows };
          // } else {
          //   return null;
          // }
          console.log("res", response.status);




  =====================================
  "use client";

import { IconLoading } from "@/components/Icon";
import "../login/login.css";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
function Page() {
  const [mesError, setMesError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("next");

  async function register(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const fullname = formData.get("fullname");
    const email = formData.get("email");
    if (username.length < 2 || username.includes(" ")) {
      setMesError("Tên dăng nhập phải có ít nhất 7 ký tự.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMesError("Mật khẩu phải có ít nhất 6 ký tự.");
      setLoading(false);
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMesError("Vui lòng nhập địa chỉ email hợp lệ.");
      setLoading(false);
      return;
    }

    // Kiểm tra fullname có tồn tại không
    if (!fullname.trim()) {
      setMesError("Vui lòng nhập họ và tên.");
      setLoading(false);
      return;
    }
    let credentials = { username, password, email, fullname };
    const res = await axios.post("/api/user/register", credentials);
    if (!res.data?.error) {
      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });
      if (result.ok) {
        if (search) {
          router.push(search);
        } else {
          router.push("/");
        }
      }
    } else {
      setMesError(res.data.error.message);
      setLoading(false);
    }
  }
  return (
    <div className="h-auto bg-gradient-to-r from-cyan-500">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-7">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-150 w-500"
            src="/image/ndk.png"
            alt="Your Company"
          />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {mesError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-1.5 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{mesError}</span>
            </div>
          )}

          <form
            onSubmit={register}
            className="mt-10 form_login space-y-6 border rounded-md border-solid border-black p-10"
          >
            <div>
              <label
                htmlFor="fullname"
                className="text-white block text-sm font-medium leading-6 text-gray-900"
              >
                Họ và tên
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  autoComplete="email"
                  required=""
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="text-white block text-sm font-medium leading-6 text-gray-900"
              >
                Tên đăng nhập
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="email"
                  required=""
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-white block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required=""
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-white block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required=""
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (
                  <div role="status">
                    <IconLoading />
                  </div>
                ) : (
                  "Đăng kí"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
