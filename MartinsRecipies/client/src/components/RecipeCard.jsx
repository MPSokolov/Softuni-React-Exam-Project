import { Link } from "react-router-dom"

import styles from './assets/RecipeCard.module.css';

function RecipeCard({ title, _createdOn, pictureUrl, _id }) {
    return (
        <Link to={`/recipe/${_id}`} className={styles.link}>
            <div className={styles.card}>
                {pictureUrl && <img src={pictureUrl} alt={title} className={styles.image} />}
                <div className={styles.details}>
                    <h3>{title}</h3>
                    <p>Created on: {new Date(parseInt(_createdOn, 10)).toLocaleDateString()}</p>
                    {/* Add more details as needed */}
                </div>
            </div>
        </Link>
    );
}

export default RecipeCard;