import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import * as recipeService from "../services/recipeService"
import AuthContext from "../contexts/authContext";

export default function RecipeAdd() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [pictureUrl, setPictureUrl] = useState('');
  const { userId } = useContext(AuthContext);

  const navigate = useNavigate();

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

    // Add logic to send the new recipe data to the server
    const newRecipe = {
      title,
      ingredients,
      instructions,
      pictureUrl,
      // ownerId: userId
      // Add more fields as needed
    };

    await recipeService.create(newRecipe)

    navigate("/user")

    // Clear the form fields after submission
    setTitle("");
    setIngredients("");
    setInstructions("");
    setPictureUrl('');
  };

  return (
    <div>
      <h2>Add New Recipe</h2>
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
          <input type="url" value={pictureUrl} onChange={handlePictureUrlChange} />
        </label>
        <br />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}
