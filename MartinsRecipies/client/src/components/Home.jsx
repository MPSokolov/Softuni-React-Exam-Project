import { useState, useEffect } from "react";

import { get3MostRecent } from "../services/recipeService";

import RecipeCard from "./RecipeCard";
import styles from "./assets/Home.module.css";
import { Container } from "react-bootstrap";

export default function Home() {
  const [recentRecipes, setRecentRecipes] = useState([]);

  useEffect(() => {
    // Fetch most recent recipes when the component mounts
    const fetchRecentRecipes = async () => {
      try {
        // Assuming you have an API service function to get recent recipes
        const recipes = await get3MostRecent();
        setRecentRecipes(recipes);
      } catch (error) {
        console.error("Error fetching recent recipes:", error);
      }
    };

    fetchRecentRecipes();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className={styles.homeContainer}>
      <h2>Welcome to My Recipe App!</h2>
      <p>Discover and share delicious recipes created by this community.</p>

      <Container className="mt-5">
        <div>
          <p>
            Welcome to my Recipe App! We are passionate about sharing and
            discovering delicious recipes. Our community is dedicated to
            exploring the world of cooking and making delightful dishes.
          </p>
          <p>
            Whether you're a seasoned chef or a cooking enthusiast, our platform
            provides a space for you to share your favorite recipes and connect
            with others who share the same culinary interests.
          </p>
          <p>
            Join us on this culinary journey, explore amazing recipes, and be
            part of a vibrant cooking community. Happy cooking!
          </p>
        </div>
      </Container>
      <br />

      <h3>Most Recent Recipes</h3>
      {recentRecipes.length > 0 ? (
        <div className={styles.cardHolder}>
          {recentRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} {...recipe} />
          ))}
        </div>
      ) : (
        <p>No recent recipes available.</p>
      )}
    </div>
  );
}
