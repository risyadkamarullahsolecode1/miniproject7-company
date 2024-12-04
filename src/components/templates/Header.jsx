import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector(state => state.auth);

  // Menu items definition
  const menuItems = [
    { 
      label: 'Dashboard', path: '/', visibleForAll: true 
    },
    {
      label: "Department Manager Dashboard",
      path: "/department-manager-dashboard",
      visibleForRoles: ["Department Manager"],
    },
    {
      label: "Employee  Dashboard",
      path: "/employees-dashboard",
      visibleForRoles: ["Employee"],
    },
    {
      label: "Employee Supervisor Dashboard",
      path: "/employee-supervisor-dashboard",
      visibleForRoles: ["Employee Supervisor"],
    },    
    { 
      label: 'Profil', path: '/profile', 
      visibleForRoles: ['Administrator', 'HR Manager', 'Department Manager' , 'Employee Supervisor' ,'Employee'] 
    },
    { 
      label: 'Employee', path: '/employees', visibleForRoles: ['Administrator', 'HR Manager',] 
    },
    { 
      label: 'Leave Request List', path: '/request', visibleForRoles: ['Employee', 'HR Manager', 'Employee Supervisor'] 
    },
    { 
      label: 'Leave Request', path: '/request/new', visibleForRoles: ['Employee'] 
    },
    { 
      label: 'Department', path: '/departments', visibleForRoles: ['Administrator', 'Department Manager'] 
    },
    { 
      label: 'Project', path: '/projects', visibleForRoles: ['Administrator','Department Manager'] 
    },
    // { 
    //   label: 'Project Details', path: '/projects/:projNo', visibleForRoles: ['HR Manager'] 
    // },
    { 
      label: 'Workson', path: '/workson', visibleForRoles: ['Administrator','Department Manager'] 
    },
    // { 
    //   label: 'Project Details', path: '/projects/:projNo', visibleForRoles: ['Employee'] 
    // },
    { 
      label: 'Location', path: '/location', visibleForRoles: ['Administrator'] 
    },
    { 
      label: 'Login', path: '/login', isAuthenticated: false 
    },
    { 
      label: 'Register', path: '/register', visibleForRoles: ['Administrator']  
    },
    { 
      label: 'Logout'
    },
  ];

  // Check if the menu item should be visible
  const isMenuVisible = (item) => {
    // Always show menu for all users
    if (item.visibleForAll) return true;

    // If user is not logged in, show menus with isAuthenticated: false
    if (item.isAuthenticated === false && !currentUser) {
      return true;
    }

    // If user is logged in, show the logout option
    if (item.label === 'Logout' && currentUser) {
      return true;
    }

    // Check role-specific menus
    if (item.visibleForRoles && currentUser?.roles) {
      return item.visibleForRoles.some(role => 
        currentUser.roles.includes(role)
      );
    }

    return false;
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to the home page after logging out
  };

  return (
    <header>  
      <Navbar expand="lg" bg="primary" sticky="top" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">Company App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {menuItems.filter(isMenuVisible).map((item, index) => (       
              <Nav.Link key={index} href={item.path}
                onClick={item.label === 'Logout' ? handleLogout : null}>
                {item.label}
              </Nav.Link> 
            ))}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {currentUser && (
        <h6>
        </h6>
      )}
    </header>
  );
};

export default Header;