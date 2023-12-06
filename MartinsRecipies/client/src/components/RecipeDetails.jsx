import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as recipeService from "../services/recipeService"

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    // Fetch recipe details when the component mounts
    const fetchRecipeDetails = async () => {
      try {
        const recipe = await recipeService.getOne(id)

        setRecipeDetails(recipe);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [id]); // Update details when the recipe ID parameter changes

  return (
    <div>
      {recipeDetails ? (
        <div>
          <h2>{recipeDetails.title}</h2>
          <p>Created on: {new Date(parseInt(recipeDetails._createdOn, 10)).toLocaleDateString()}</p>
          <p>{recipeDetails.ingredients}</p>
          <p>{recipeDetails.instructions}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
}
