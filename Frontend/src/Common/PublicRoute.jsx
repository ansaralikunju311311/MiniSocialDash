import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicRoute = () => {
    const token = Cookies.get('token');

    if (token) {
        console.log('User already authenticated, redirecting to dashboard');
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};  

export default PublicRoute;
