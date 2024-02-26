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
    
  }
};

export { callAPI };
