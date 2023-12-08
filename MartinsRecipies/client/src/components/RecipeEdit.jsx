import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as recipeService from "../services/recipeService";

import AuthContext from '../contexts/authContext';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import styles from './assets/RecipeCRUD.module.css';

export default function EditRecipe() {
  const {userId} = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await recipeService.getOne(id);

        if (userId !== data._ownerId) {navigate(`/recipe/${id}`)}

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

  const isValidURL = (url) => {
    // Regular expression for a simple URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  
    return urlRegex.test(url);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !ingredients || !instructions || !pictureUrl) {
      setError('All fields are required.');
      return;
    }

    if (!isValidURL(pictureUrl)) {
      setError('Invalid picture URL');
      return;
    }

    // Update the recipe with the edited details
    try {
      
      await recipeService.updateOne(id, {
        title,
        ingredients,
        instructions,
        pictureUrl,
      });

      setError('');

      // Redirect to the recipe details page after successful update
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit} className={styles.form}>
      {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formRecipeTitle">
          <Form.Label>Recipe Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipe title"
            value={title}
            onChange={handleTitleChange}
            // required
          />
        </Form.Group>

        <Form.Group controlId="formRecipeIngredients" className={styles.group}>
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter ingredients (comma-separated)"
            value={ingredients}
            onChange={handleIngredientsChange}
            // required
          />
        </Form.Group>
        
        <Form.Group controlId="formRecipeInstructions" className={styles.group}>
          <Form.Label>Recipe Instructions</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter recipe instructions"
            value={instructions}
            onChange={handleInstructionsChange}
            // required
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
          Edit Recipe
        </Button>
      </Form>
    </Container>
  );
}
