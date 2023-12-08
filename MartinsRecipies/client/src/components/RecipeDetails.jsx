import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import * as recipeService from "../services/recipeService";
import * as commentService from "../services/commentService";
import AuthContext from "../contexts/authContext";

import { Button, Alert } from 'react-bootstrap';
import styles from "./assets/RecipeDetails.module.css";

export default function RecipeDetails() {
  const { userId, isAuthenticated, username } = useContext(AuthContext);
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch recipe details when the component mounts
    const fetchRecipeDetails = async () => {
      try {
        const recipe = await recipeService.getOne(id);
        const recipeComments = await commentService.getRecipeComments(id);

        setRecipeDetails(recipe);
        setComments(recipeComments);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setError(error.message);
        // setError('');
        // return
      }
    };

    fetchRecipeDetails();
  }, [id]); // Update details when the recipe ID parameter changes

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    // Add the new comment
    try {
      const newComment = await commentService.create({
        text: commentText,
        recipeId: id,
        username,
      });
      // Update the comments state to include the new comment
      setComments((prevComments) => [...prevComments, newComment]);
      // Clear the comment input
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const renderEditDeleteButtons = () => {
    if (isAuthenticated && userId === recipeDetails._ownerId) {
      return (
        <div className={styles.btnsHolder}>
          <Link to={`/recipe/${id}/edit`}>
            <Button variant="warning">Edit</Button>
          </Link>
          <Link to={`/recipe/${id}/delete`}>
            <Button variant="danger" className={styles.deleteBtn}>
              Delete
            </Button>
          </Link>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className={styles.recipeDetailsContainer}>
        {recipeDetails ? (
          <div className={styles.recipeCard}>
            <h2>{recipeDetails.title}</h2>
            <p>
              Created on:{" "}
              {new Date(
                parseInt(recipeDetails._createdOn, 10)
              ).toLocaleDateString()}
            </p>
            <img
              src={recipeDetails.pictureUrl}
              alt="Image"
              className={styles.recipeImage}
            />
            <h3>Ingredients</h3>
            <p>{recipeDetails.ingredients}</p>
            <h3>Instructions</h3>
            <p>{recipeDetails.instructions}</p>
            {renderEditDeleteButtons()}
            {/* Comment Form */}
            {isAuthenticated && (
              <form
                onSubmit={handleCommentSubmit}
                className={styles.commentForm}
              >
                <label>
                  Add a Comment:
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                </label>
                {/* <button type="submit">Submit Comment</button> */}
                <Button variant="primary" type="submit">
                  Submit Comment
                </Button>
              </form>
            )}
            {/* Display Comments */}
            <div>
              <h3 className={styles.commentsTitle}>Comments</h3>
              {comments.map((comment) => (
                <>
                  <div key={comment._id}>
                    <p>
                      <strong>{comment.username}:</strong> {comment.text}
                    </p>
                    <p>
                      Posted on:{" "}
                      {new Date(
                        parseInt(comment._createdOn, 10)
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <hr />
                </>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading recipe details...</p>
        )}
      </div>
    </>
  );
}
