import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as recipeService from "../services/recipeService";
import AuthContext from '../contexts/authContext';

export default function DeleteRecipe() {
  const navigate = useNavigate();
  const {userId} = useContext(AuthContext);
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    // Fetch recipe details when the component mounts
    const fetchRecipeDetails = async () => {
      try {
        // Replace this with your actual API call to fetch recipe details

        const data = await recipeService.getOne(id);

        if (userId !== data._ownerId) {navigate(`/recipe/${id}`)}

        setRecipeDetails(data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]); // Update details when the recipe ID parameter changes

  const handleDelete = async () => {
    // Delete the recipe
    try {
      // Replace this with your actual API call to delete the recipe
      await recipeService.deleteOne(id);

      // Redirect to the recipe list page after successful deletion
      navigate("/user");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div>
      <h2>Delete Recipe</h2>
      {recipeDetails ? (
        <form>
          <label>
            Title:
            <input type="text" value={recipeDetails.title} disabled />
          </label>
          <br />
          <label>
            Ingredients:
            <textarea value={recipeDetails.ingredients} disabled />
          </label>
          <br />
          <label>
            Instructions:
            <textarea value={recipeDetails.instructions} disabled />
          </label>
          <br />
          <label>
            Picture URL:
            <input type="url" value={recipeDetails.pictureUrl} disabled />
          </label>
          <br />
          <button type="button" onClick={handleDelete}>
            Confirm Deletion
          </button>
        </form>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
}
