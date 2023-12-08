import { useState, useEffect } from "react";

import * as recipeService from "../services/recipeService";

import RecipeCard from "./RecipeCard";
import styles from "./assets/Catalogue.module.css";

export default function Catalogue() {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const recipes = await recipeService.getAll();
        setAllRecipes(recipes);
      } catch (error) {
        console.error("Error fetching all recipes:", error);
      }
    };

    fetchAllRecipes();
  }, []);

  return (
    <div>
      <div className={styles.text}>
        <h2>Recipe Catalog</h2>
        <p>Explore a variety of delicious recipes from our community.</p>
      </div>

      {allRecipes.length > 0 ? (
        <div className={styles.cardHolder}>
          {allRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} {...recipe} />
          ))}
        </div>
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
}
