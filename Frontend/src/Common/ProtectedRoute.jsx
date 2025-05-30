import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
    const token = Cookies.get('token');
    const location = useLocation();

    if (!token) {
        console.log('No token found, redirecting to login');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    console.log('Token found, rendering protected content');
    return <Outlet />;
};

export default ProtectedRoute;