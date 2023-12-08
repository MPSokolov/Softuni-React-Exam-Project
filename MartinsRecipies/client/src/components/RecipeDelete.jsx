import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as recipeService from "../services/recipeService";

import AuthContext from "../contexts/authContext";
import styles from "./assets/RecipeCRUD.module.css";
import { Form, Button, Container } from "react-bootstrap";

export default function DeleteRecipe() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  useEffect(() => {
    // Fetch recipe details when the component mounts
    const fetchRecipeDetails = async () => {
      try {
        // Replace this with your actual API call to fetch recipe details

        const data = await recipeService.getOne(id);

        if (userId !== data._ownerId) {
          navigate(`/recipe/${id}`);
        }

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
    <Container className="mt-5">
      <Form className={styles.form}>
        <Form.Group controlId="formRecipeTitle">
          <Form.Label>Recipe Title</Form.Label>
          <Form.Control type="text" value={title} disabled />
        </Form.Group>

        <Form.Group controlId="formRecipeIngredients" className={styles.group}>
          <Form.Label>Ingredients</Form.Label>
          <Form.Control as="textarea" value={ingredients} disabled />
        </Form.Group>

        <Form.Group controlId="formRecipeInstructions" className={styles.group}>
          <Form.Label>Recipe Instructions</Form.Label>
          <Form.Control as="textarea" value={instructions} disabled />
        </Form.Group>

        <Form.Group controlId="formRecipePictureUrl" className={styles.group}>
          <Form.Label>Picture URL</Form.Label>
          <Form.Control type="text" value={pictureUrl} disabled />
        </Form.Group>

        <Button variant="danger" type="button" onClick={handleDelete}>
          Confirm Deletion
        </Button>
      </Form>
    </Container>
  );
}
