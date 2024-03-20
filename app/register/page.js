"use client";

import { IconLoading } from "@/components/Icon";
import "../login/login.css";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "@/lib/schema/schema";
import Link from "next/link";

function Page() {
  const [mesError, setMesError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("next");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });
  const onSubmit = async (data) => {
    setLoading(true);
    const res = await axios.post("/api/user/register", data);
    if (res.data.status === 201) {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (result.ok) {
        setLoading(false);
        if (search) {
          router.push(search);
        } else {
          router.push("/");
        }
      }
    } else {
      setLoading(false);
      setMesError(res.data.error);
    }
  };
  return (
    <div className="h-auto bg-gradient-to-r from-cyan-500">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-7">
        <Link href='/' className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-150 w-500"
            src="/image/ndk.png"
            alt="Your Company"
          />
        </Link>
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
            onSubmit={handleSubmit(onSubmit)}
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
                  {...register("fullname")}
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.fullname && (
                  <p className="text-red-500 text-xs italic pt-2">
                    {errors.fullname.message}
                  </p>
                )}
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
                  {...register("username")}
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs italic pt-2">
                    {errors.username.message}
                  </p>
                )}
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
                  {...register("email")}
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                {errors.email && (
                  <p className="text-red-500 text-xs italic pt-2">
                    {errors.email.message}
                  </p>
                )}
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
                  {...register("password")}
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic pt-2">
                    {errors.password.message}
                  </p>
                )}
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
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
