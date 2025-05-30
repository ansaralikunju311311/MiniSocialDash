import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicRoute = () => {
    const token = Cookies.get('token');

    // If user is authenticated, redirect to dashboard
    if (token) {
        console.log('User already authenticated, redirecting to dashboard');
        return <Navigate to="/dashboard" replace />;
    }

    // If not authenticated, render the public routes
    return <Outlet />;
};

export default PublicRoute;
