import BASE_URL from "../constans/baseUrl";
const callAPI = async (
  url,
  setDatas,
  setTalPages,
  settotalItem,
  setNameLessonsCourses,
 
) => {
  try {
    let typeUrl = `${BASE_URL}/${url}`;
    const res = await fetch(typeUrl);
    const data = await res.json();
    setDatas(data.data);
    setTalPages(data.totalPages);
    settotalItem(data.totalCount);
    setNameLessonsCourses(data.resultsNameLessons);
  } catch (err) {
    console.log(err);
  }
};


export { callAPI };
