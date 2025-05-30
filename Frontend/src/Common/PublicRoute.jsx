import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicRoute = () => {
    const token = Cookies.get('token');

    // If user is authenticated, redirect to profile
    if (token) {
        console.log('User already authenticated, redirecting to profile');
        return <Navigate to="/profile" replace />;
    }

    // If not authenticated, render the public routes
    return <Outlet />;
};

export default PublicRoute;
