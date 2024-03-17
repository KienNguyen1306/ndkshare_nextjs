import { fetchCoursesData, fetchGamesData } from "@/lib/fetch";

export default async function sitemap() {
  const gamesData = await fetchGamesData();
  const games = gamesData.data.map((item) => ({
    url: `${process.env.NEXT_BASE_URL}/modgame/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  }));

  const coursesData = await fetchCoursesData();
  const courses = coursesData.data.map((item) => ({
    url: `${process.env.NEXT_BASE_URL}/shareCourse/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  }));

  const routes = ["", "/sharecourse", "/contact", "/login"].map((route) => ({
    url: `${process.env.NEXT_BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  }));

  return [...routes, ...games, ...courses];
}
