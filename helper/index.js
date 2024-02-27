import Cookies from "js-cookie";

function formatUrl(initialUrl, page) {
  let url = `${initialUrl}?page=${page}`;
  if (initialUrl.includes("?")) {
    url = `${initialUrl}&page=${page}`;
  }
  return url;
}

function saveCookie({ assetToken, resetToken }) {
  var expirationDays = 30;

  // Tính toán ngày hết hạn
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);

  // Lưu vào cookie bằng js-cookie
  Cookies.set("assetToken", assetToken, { expires: expirationDays, path: "/" });
  Cookies.set("resetToken", resetToken, { expires: expirationDays, path: "/" });
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
export { formatUrl, saveCookie, getCookie, deleteCookie };
