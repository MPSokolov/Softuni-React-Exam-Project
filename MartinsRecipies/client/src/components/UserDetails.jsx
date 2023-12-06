
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../contexts/authContext'; // Import your authentication context
import * as authService from "../services/authService"
import * as recipeService from "../services/recipeService"
import RecipeCard from './RecipeCard';

function UserProfile() {
  const {username, userId} = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    // Fetch user details and recipes when the component mounts
    const fetchUserData = async () => {
      try {
        // Replace this with your actual API call to fetch user details
        const userData = await authService.userDetails()

        setUserDetails(userData);

        // Replace this with your actual API call to fetch user recipes
        const recipesData = await recipeService.getUserRecipes(userId);

        setUserRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching user details and recipes:', error);
      }
    };

    fetchUserData();
  }, [username]); // Update details when the username parameter changes

  return (
    <div>
      {userDetails ? (
        <div>
          <h2>{userDetails.username}'s Profile</h2>
          <p>Email: {userDetails.email}</p>
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      <h3>{userDetails ? `${userDetails.username}'s Recipes` : 'Recipes'}</h3>
      {userRecipes.length > 0 ? (
        <div>
          {userRecipes.map(recipe => <RecipeCard key={recipe._id} {...recipe} />)}
        </div>
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
}

export default UserProfile;
