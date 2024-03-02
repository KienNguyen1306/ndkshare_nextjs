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
    if (setDatas && typeof setDatas === 'function') setDatas(data.data);
    if (setTalPages && typeof setTalPages === 'function')setTalPages(data.totalPages);
    if (settotalItem && typeof settotalItem === 'function') settotalItem(data.totalCount);
    if (setNameLessonsCourses && typeof setNameLessonsCourses === 'function') setNameLessonsCourses(data.resultsNameLessons);
  } catch (err) {
    console.log(err);
  }
};

async function getUser(setUser) {
  try {
    const response = await fetch(`${BASE_URL_API}/login`);
    const data = await response.json();
    setUser(data);
  } catch (error) {
    console.log(error);
  }
}

async function loginUser({ username: userName, password }) {
  try {
    const response = await fetch(`${BASE_URL_API}/login`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ username: userName, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function postModGame(datas) {
  try {
    const response = await fetch(`${BASE_URL_API}/modgames`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(datas),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteModGame(id) {
  try {
    const response = await fetch(`${BASE_URL_API}/modgames/${id}`, {
      method: "DELETE",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function putModGame(data,id) {
  try {
    const response = await fetch(`${BASE_URL_API}/modgames/${id}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}


async function putCoures(data,id) {
  try {
    const response = await fetch(`${BASE_URL_API}/courses/${id}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}


export { callAPI, getUser, loginUser, postModGame, deleteModGame,putModGame ,putCoures};
