import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
	isAuthenticated: string | null; // You can use the appropriate type for your authentication state
	path: string;
	element: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({
	isAuthenticated,
	...props
}) => {
	if (isAuthenticated) {
		return <Route {...props} />;
	} else {
		return <Navigate to={'/login'} />;
	}
};

export default ProtectedRoutes;
