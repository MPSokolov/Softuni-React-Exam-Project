import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as recipeService from "../services/recipeService";

export default function EditRecipe() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await recipeService.getOne(id);

        setTitle(data.title);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
        setPictureUrl(data.pictureUrl);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]); // Update details when the recipe ID parameter changes

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleIngredientsChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  const handlePictureUrlChange = (e) => {
    setPictureUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update the recipe with the edited details
    try {
      
      await recipeService.updateOne(id, {
        title,
        ingredients,
        instructions,
        pictureUrl,
      });

      // Redirect to the recipe details page after successful update
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </label>
        <br />
        <label>
          Ingredients:
          <textarea
            value={ingredients}
            onChange={handleIngredientsChange}
            required
          />
        </label>
        <br />
        <label>
          Instructions:
          <textarea
            value={instructions}
            onChange={handleInstructionsChange}
            required
          />
        </label>
        <br />
        <label>
          Picture URL:
          <input
            type="url"
            value={pictureUrl}
            onChange={handlePictureUrlChange}
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
