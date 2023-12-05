import { useState } from "react";

export default function Catalogue() {
  const [allRecipes, setAllRecipes] = useState([]);

  // useEffect(() => {
  //   // Fetch all recipes when the component mounts
  //   const fetchAllRecipes = async () => {
  //     try {
  //       // Assuming you have an API service function to get all recipes
  //       const recipes = await getAllRecipes();
  //       setAllRecipes(recipes);
  //     } catch (error) {
  //       console.error('Error fetching all recipes:', error);
  //     }
  //   };

  //   fetchAllRecipes();
  // }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h2>Recipe Catalog</h2>
      <p>Explore a variety of delicious recipes from our community.</p>

      {allRecipes.length > 0 ? (
        <RecipeList recipes={allRecipes} />
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
}
