import '../css/NotFound.css'
import { FaRobot } from 'react-icons/fa';

function NotFound() {
    return(
        <div className="not-found-container">
        <div className="robot-icon">
            <FaRobot size={100} color="#555" />
        </div>
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-text">
            Oops! The page you're looking for doesn't exist. <br />
            Our robot is working hard to get you back on track!
        </p>
        <button
            className="home-button"
            onClick={() => window.location.href = '/'}
        >
            Go to Home
        </button>
        </div>
    );
}
export default NotFound