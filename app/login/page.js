"use client";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconLoading } from "../../components/Icon";
import './login.css'
function Admin() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username");
      const password = formData.get("password");
      let credentials = { username, password };
      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });
      if (result.ok) {
        const session = await getSession();
        setLoading(false);
        if (session && session.user) {
          const userRole = session.user.role;
          if (userRole === "admin") {
            router.push("/admin");
          } else {
            router.push("/");
          }
        }
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng nhập:", error);
      setLoading(false);
    }
  }

  return (
    <div className="h-screen">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-7">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-150 w-500"
            src="/image/ndk.png"
            alt="Your Company"
          />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-1.5 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">
                Tài khoản hoặc mật khẩu không chính xác.
              </span>
            </div>
          )}

          <form className="mt-10 form_login space-y-6 border rounded-md border-solid border-black p-10" onSubmit={handleSignIn}>
            <div>
              <label
                htmlFor="email"
                className="text-white block text-sm font-medium leading-6 text-gray-900"
              >
                Tên đăng nhập
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="username"
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
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
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
                  " Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
