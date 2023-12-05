import { useState } from "react";

export default function Home() {
  const [recentRecipes, setRecentRecipes] = useState([]);

  // useEffect(() => {
  //   // Fetch most recent recipes when the component mounts
  //   const fetchRecentRecipes = async () => {
  //     try {
  //       // Assuming you have an API service function to get recent recipes
  //       const recipes = await getRecentRecipes();
  //       setRecentRecipes(recipes);
  //     } catch (error) {
  //       console.error('Error fetching recent recipes:', error);
  //     }
  //   };

  //   fetchRecentRecipes();
  // }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h2>Welcome to Our Recipe App!</h2>
      <p>Discover and share delicious recipes created by our community.</p>

      <h3>Most Recent Recipes</h3>
      {recentRecipes.length > 0 ? (
        <RecipeList recipes={recentRecipes} />
      ) : (
        <p>No recent recipes available.</p>
      )}
    </div>
  );
}
