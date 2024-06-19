import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{padding: "40px"}}>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/">Go back to home</Link>
        </div>
    );
};

export default NotFound;