export async function fetchGamesData() {
  try {
    const responseGames = await fetch(
      `${process.env.NEXT_BASE_URL}/api/modgames?page=1&limit=99`
    );
    if (!responseGames.ok) {
      throw new Error("Error fetching games data");
    }
    const gamesData = await responseGames.json();
    return gamesData;
  } catch (error) {
    console.error("Error fetching games data:", error);
    return null;
  }
}

export async function fetchCoursesData() {
  try {
    const responseCourses = await fetch(
      `${process.env.NEXT_BASE_URL}/api/courses?page=1&limit=99`
    );
    if (!responseCourses.ok) {
      throw new Error("Error fetching courses data");
    }
    const coursesData = await responseCourses.json();
    return coursesData;
  } catch (error) {
    console.error("Error fetching courses data:", error);
    return null;
  }
}
