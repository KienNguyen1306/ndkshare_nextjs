

export default async function sitemap() {
  const response = await fetch(
    `${process.env.NEXT_BASE_URL}/api/modgames?page=1&limit=99999999`
  );
  let res = await response.json();
  let game = res.data.map((item) => ({
    url: `${process.env.NEXT_BASE_URL}/modgame/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  }));

  const responseCoures = await fetch(
    `${process.env.NEXT_BASE_URL}/api/courses?page=1&limit=999999999`
  );
  let resCoures = await responseCoures.json();
  let courses = resCoures.data.map((item) => ({
    url: `${process.env.NEXT_BASE_URL}/shareCourse/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  }));

  const routes = ["", "/sharecourse", "/contact","/login"].map((route) => ({
    url: `${process.env.NEXT_BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  }));

  return [
    ...routes,
    ...game,
    ...courses,
  ];
}
