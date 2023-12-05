import { useState } from "react";

export default function RecipeAdd() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleIngredientsChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add logic to send the new recipe data to the server
    const newRecipe = {
      title,
      ingredients,
      instructions,
      // Add more fields as needed
    };

    console.log("New Recipe Submitted:", newRecipe);

    // Clear the form fields after submission
    setTitle("");
    setIngredients("");
    setInstructions("");
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
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}
