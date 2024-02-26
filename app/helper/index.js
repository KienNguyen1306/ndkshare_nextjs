function formatUrl(initialUrl, page) {
  let url = `${initialUrl}?page=${page}`;
  if (initialUrl.includes("?")) {
    url = `${initialUrl}&page=${page}`;
  }
  return url;
}

export { formatUrl };
