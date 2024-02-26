import BASE_URL from "../constans/baseUrl";
const callAPI = async (
  url,
  setDatas,
  setTalPages,
  settotalItem,
  setNameLessonsCourses,
  type
) => {
  try {
    let typeUrl = `${BASE_URL}/${url}`;
    if(type ===1){
      typeUrl='http://localhost:3000/api/modgames/searchgame?name=2&page=1'
    }
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
