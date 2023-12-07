import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import * as recipeService from "../services/recipeService";
import * as commentService from "../services/commentService";
import AuthContext from "../contexts/authContext";

export default function RecipeDetails() {
  const { userId, isAuthenticated, username } = useContext(AuthContext);
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

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
        <div>
          <Link to={`/recipe/${id}/edit`}>
            <button>Edit</button>
          </Link>
          <Link to={`/recipe/${id}/delete`}>
            <button>Delete</button>
          </Link>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {recipeDetails ? (
        <div>
          <h2>{recipeDetails.title}</h2>
          <p>
            Created on:{" "}
            {new Date(
              parseInt(recipeDetails._createdOn, 10)
            ).toLocaleDateString()}
          </p>
          <p>{recipeDetails.ingredients}</p>
          <p>{recipeDetails.instructions}</p>
          {renderEditDeleteButtons()}
          {/* Comment Form */}
          {isAuthenticated && (
            <form onSubmit={handleCommentSubmit}>
              <label>
                Add a Comment:
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
              </label>
              <button type="submit">Submit Comment</button>
            </form>
          )}
          {/* Display Comments */}
          <div>
            <h3>Comments</h3>
            {comments.map((comment) => (
              <div key={comment._id}>
                <p>
                  <strong>{comment.username}:</strong> {comment.text}
                </p>
                <p>
                  Created on:{" "}
                  {new Date(
                    parseInt(comment._createdOn, 10)
                  ).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
}
