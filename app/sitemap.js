export default async function sitemap() {
  try {
    const responseGames = await fetch(
      `${process.env.NEXT_BASE_URL}/api/modgames?page=1&limit=99999999`
    );
    if (!responseGames.ok) {
      throw new Error('Failed to fetch games data');
    }
    const gamesData = await responseGames.json();
    const games = gamesData.data.map((item) => ({
      url: `${process.env.NEXT_BASE_URL}/modgame/${item.id}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    }));

    const responseCourses = await fetch(
      `${process.env.NEXT_BASE_URL}/api/courses?page=1&limit=999999999`
    );
    if (!responseCourses.ok) {
      throw new Error('Failed to fetch courses data');
    }
    const coursesData = await responseCourses.json();
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

    return [
      ...routes,
      ...games,
      ...courses,
    ];
  } catch (error) {
    console.error('Error fetching data:', error);
    // Xử lý lỗi ở đây, có thể trả về một mảng rỗng hoặc thông báo lỗi
    return [];
  }
}
