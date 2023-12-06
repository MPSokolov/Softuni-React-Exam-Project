import { Link } from "react-router-dom"

function RecipeCard({ title, _createdOn, pictureUrl, _id }) {
    return (
        <Link to={`/recipe/${_id}`} style={styles.link}>
            <div style={styles.card}>
                {pictureUrl && <img src={pictureUrl} alt={title} style={styles.image} />}
                <div style={styles.details}>
                    <h3>{title}</h3>
                    <p>Created on: {new Date(parseInt(_createdOn, 10)).toLocaleDateString()}</p>
                    {/* Add more details as needed */}
                </div>
            </div>
        </Link>
    );
}

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '200px',
        width: '100%',
        boxSizing: 'border-box',
    },
    image: {
        maxWidth: '100%',
        borderRadius: '8px',
    },
    details: {
        marginTop: '12px',
    },
    link: {
        textDecoration: 'none', // Remove default link styling
        color: 'inherit', // Inherit text color
    }
};

export default RecipeCard;