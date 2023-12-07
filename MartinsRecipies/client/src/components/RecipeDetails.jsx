import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import * as recipeService from "../services/recipeService"
import AuthContext from '../contexts/authContext';

export default function RecipeDetails() {
  const {userId, isAuthenticated} = useContext(AuthContext);
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
          <p>Created on: {new Date(parseInt(recipeDetails._createdOn, 10)).toLocaleDateString()}</p>
          <p>{recipeDetails.ingredients}</p>
          <p>{recipeDetails.instructions}</p>
          {renderEditDeleteButtons()}
        </div>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
}
