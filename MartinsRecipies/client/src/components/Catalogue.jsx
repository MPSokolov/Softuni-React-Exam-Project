import { useState, useEffect } from "react";

import * as recipeService from "../services/recipeService"

export default function Catalogue() {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const recipes = await recipeService.getAll();
        setAllRecipes(recipes);
      } catch (error) {
        console.error('Error fetching all recipes:', error);
      }
    };

    fetchAllRecipes();
  }, []); 

  return (
    <div>
      <h2>Recipe Catalog</h2>
      <p>Explore a variety of delicious recipes from our community.</p>

      {allRecipes.length > 0 ? (
        <ul>
          {allRecipes.map(recipe => <li key={recipe._id}>{recipe.title}</li>)}
        </ul>
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
}
