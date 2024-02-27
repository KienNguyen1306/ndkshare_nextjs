import BASE_URL_API from "../constans/baseUrl";
const callAPI = async (
  url,
  setDatas,
  setTalPages,
  settotalItem,
  setNameLessonsCourses
) => {
  try {
    const res = await fetch(`${BASE_URL_API}${url}`);
    const data = await res.json();
    setDatas(data.data);
    setTalPages(data.totalPages);
    settotalItem(data.totalCount);
    setNameLessonsCourses(data.resultsNameLessons);
  } catch (err) {
    console.log(err)
  }
};

async function getUser(setUser) {
  try {
    const response = await fetch(`${BASE_URL_API}/auth`);
    const data = await response.json();
    setUser(data);
  } catch (error) {
    console.log(error)
  }
}


async function loginUser({ username: userName, password }) {
  try {
    const response = await fetch(`${BASE_URL_API}/auth`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ username: userName, password }),
    });
    const data = await response.json();
   return data
  } catch (error) {
    console.log(error)
  }
}




export { callAPI, getUser ,loginUser};
