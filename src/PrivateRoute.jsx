import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from './components/Layouts/Footer';
import Header from './components/Layouts/Header';
import { Container } from 'react-bootstrap';

const PrivateRoute = ({allowedRoles}) => {  
  const { user } = useSelector(state => state.auth);
  
  const hasRequiredRole = () => {    
    if (!allowedRoles) return true;    
   
    return user?.roles?.some(role => 
      allowedRoles.includes(role)
    ) || false;
  };
   
    if (allowedRoles && !hasRequiredRole()) {
    // Redirect ke halaman unauthorized jika role tidak sesuai
    return <Navigate to="/login" />;
  }
 

  return user ? 
   <Container>    
      <Header />   
      <Outlet />   
      <Footer/>      
    </Container> 
    : <Navigate to="/login" replace />;
};

export default PrivateRoute;