import { useState, useEffect } from "react";

import { get3MostRecent } from "../services/recipeService";

import RecipeCard from "./RecipeCard";

export default function Home() {
  const [recentRecipes, setRecentRecipes] = useState([]);

  useEffect(() => {
    // Fetch most recent recipes when the component mounts
    const fetchRecentRecipes = async () => {
      try {
        // Assuming you have an API service function to get recent recipes
        const recipes = await get3MostRecent();
        setRecentRecipes(recipes);
      } catch (error) {
        console.error('Error fetching recent recipes:', error);
      }
    };

    fetchRecentRecipes();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h2>Welcome to My Recipe App!</h2>
      <p>Discover and share delicious recipes created by this community.</p>

      <h3>Most Recent Recipes</h3>
      {recentRecipes.length > 0 ? (
        <div style={{"display": "flex"}}>
          {recentRecipes.map(recipe => <RecipeCard key={recipe._id} {...recipe} />)}
        </div>
      ) : (
        <p>No recent recipes available.</p>
      )}
    </div>
  );
}
