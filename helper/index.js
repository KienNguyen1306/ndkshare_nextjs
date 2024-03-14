import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Cookies from "js-cookie";

function formatUrl(initialUrl, page) {
  let url = `${initialUrl}?page=${page}`;
  if (initialUrl.includes("?")) {
    url = `${initialUrl}&page=${page}`;
  }
  return url;
}

function saveCookie({ assetToken, resetToken }) {
  try {
    var expirationDays = 30;

    // Tính toán ngày hết hạn
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    // Lưu vào cookie bằng js-cookie
    Cookies.set("assetToken", assetToken, {
      expires: expirationDays,
      path: "/",
    });
    Cookies.set("resetToken", resetToken, {
      expires: expirationDays,
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
}

function getCookie(name) {
  const cookieValue = Cookies.get(name);
  if (cookieValue === undefined) {
    return null;
  }
  return cookieValue;
}
function deleteCookie(name) {
  Cookies.remove(name);
}

function mergeLists(list1, list2) {
  return list1.map((item1, index) => {
    let open = index === 0 ? true : false;
    let children = list2.filter((item2) => item2.titlecourses_id === item1.id);
    children.sort((a, b) => a.practice - b.practice);
    return { ...item1, children, open };
  });
}

function updateListOpen(list, idToUpdate) {
  return list.map((item) => {
    if (item.id === idToUpdate) {
      return { ...item, open: true };
    } else {
      return { ...item, open: false };
    }
  });
}

function findObjectById(list, id) {
  return list.find((item) => item.id === id);
}

function formatDateTime(date) {
  return dayjs(date).locale("vi").fromNow(); // 3 năm trước
}
function getCurrentDateTime() {
  let current_time = new Date();
  let year = current_time.getFullYear();
  let month = String(current_time.getMonth() + 1).padStart(2, "0");
  let day = String(current_time.getDate()).padStart(2, "0");
  let hours = String(current_time.getHours()).padStart(2, "0");
  let minutes = String(current_time.getMinutes()).padStart(2, "0");
  let seconds = String(current_time.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export {
  formatUrl,
  saveCookie,
  getCookie,
  deleteCookie,
  mergeLists,
  updateListOpen,
  findObjectById,
  formatDateTime,
  getCurrentDateTime,
};
