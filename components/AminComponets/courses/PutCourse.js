"use client";
import { IconLoading } from "@/components/Icon";
import { putCoures } from "@/fechApi";
import { getDetailCourses } from "@/lib/shareCouresSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function PutCourse() {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const courseid = useParams().courseid;
  async function handlePostGame(e) {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.currentTarget);
    const image = formData.get("image");
    const name = formData.get("name");
    const sub = formData.get("sub");
    let credentials = { image, name, sub };
    putCoures(credentials,courseid).then((res) => {
      if (res.status===200) {
        router.push('/admin/sharecourse')
      }
      setLoading(false);
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };

  useEffect(() => {
    dispatch(getDetailCourses({id:courseid,page:1})).then((res)=>{
      console.log('rédsdfsd',res)
      setDetail(res.payload.dataCoures[0])
    });
  }, [dispatch, courseid]);

  return (
    <div className="my-20">
      <h1 className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
        Post Game Mod
      </h1>
      <form className=" w-full shadow-2xl p-10" onSubmit={handlePostGame}>
        <div className="mb-5">
          <label
            htmlFor="image"
            className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image Link
          </label>
          <input
            type="text"
            id="image"
            name="image"
            className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Link image"
            required=""
            value={detail?.image || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name Game
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name Game"
            required=""
            value={detail?.name || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sub"
            className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Thông tin game
          </label>
          <input
            type="text"
            id="sub"
            name="sub"
            className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Thông tin game"
            required=""
            value={detail?.sub || ''}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? (
            <div role="status">
              <IconLoading />
            </div>
          ) : (
            "Thêm game"
          )}
        </button>
      </form>
    </div>
  );
}

export default PutCourse;
