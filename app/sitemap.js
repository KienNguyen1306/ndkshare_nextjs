export default async function sitemap() {
  try {
    const responseGames = await fetch(
      `${process.env.NEXT_BASE_URL}/api/modgames?page=1&limit=99`
    );
    if (!responseGames.ok) {
      console.error('Error fetching data:', responseCourses);

    }
    const gamesData = await responseGames.json();
    const games = gamesData.data.map((item) => ({
      url: `${process.env.NEXT_BASE_URL}/modgame/${item.id}`,
      lastModified: new Date(),
      // changeFrequency: "yearly",
      // priority: 1,
    }));

    const responseCourses = await fetch(
      `${process.env.NEXT_BASE_URL}/api/courses?page=1&limit=99`
    );
    if (!responseCourses.ok) {
    console.error('Error fetching data:', responseCourses);
    }
    const coursesData = await responseCourses.json();
    const courses = coursesData.data.map((item) => ({
      url: `${process.env.NEXT_BASE_URL}/shareCourse/${item.id}`,
      lastModified: new Date(),
      // changeFrequency: "yearly",
      // priority: 1,
    }));

    const routes = ["", "/sharecourse", "/contact", "/login"].map((route) => ({
      url: `${process.env.NEXT_BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    }));

    return [
      ...routes,
      ...games,
      ...courses,
    ];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
