import { useContext, useEffect, useState } from 'react';

export default function UserDetails() {
//   const authContext = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Retrieve the username from the authentication context
//         const { username } = authContext.user;

//         // Assuming you have API service functions to get user details and recipes
//         const details = await getUserDetails(username);
//         const recipes = await getUserRecipes(username);

//         setUserDetails(details);
//         setUserRecipes(recipes);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     fetchUserData();
//   }, [authContext.user]); // Update data when the user context changes

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

      <h3>{userDetails ? `${userDetails.username}'s Recipes` : "Recipes"}</h3>
      {userRecipes.length > 0 ? (
        <RecipeList recipes={userRecipes} />
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
}
