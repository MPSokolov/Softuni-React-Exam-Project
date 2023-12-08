import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import * as recipeService from "../services/recipeService"
// import AuthContext from "../contexts/authContext";
import { Form, Button, Container } from 'react-bootstrap';
import styles from './assets/RecipeAdd.module.css';

export default function RecipeAdd() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [pictureUrl, setPictureUrl] = useState('');
  // const { userId } = useContext(AuthContext);

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
    <Container className="mt-5">
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Form.Group controlId="formRecipeTitle">
          <Form.Label>Recipe Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipe title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRecipeIngredients" className={styles.group}>
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter ingredients (comma-separated)"
            value={ingredients}
            onChange={handleIngredientsChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRecipeInstructions" className={styles.group}>
          <Form.Label>Recipe Instructions</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter recipe instructions"
            value={instructions}
            onChange={handleInstructionsChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRecipePictureUrl" className={styles.group}>
          <Form.Label>Picture URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter picture URL"
            value={pictureUrl}
            onChange={handlePictureUrlChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Recipe
        </Button>
      </Form>
    </Container>
  );
}
