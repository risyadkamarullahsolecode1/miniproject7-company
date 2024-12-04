import { createBrowserRouter } from "react-router-dom";
import Profile from "./components/pages/Profile";
import EmployeesList from "./components/pages/EmployeeList";
import AddEmployee from "./components/pages/AddEmployee";
import EmployeeDetails from "./components/pages/EmployeeDetails";
import DepartmentList from "./components/pages/DepartmentList";
import AddDepartment from "./components/pages/AddDepartment";
import DepartmentDetails from "./components/pages/DepartmentDetails";
import ProjectsList from "./components/pages/ProjectList";
import WorksOnList from "./components/pages/WorksOnList";
import LocationList from "./components/pages/LocationList";
import Dashboard from "./components/pages/Dashboard";
import EditEmployee from "./components/pages/EditEmployee";
import DependentForm from "./components/organisms/DependentForm";
import DepartmentManagerDashboard from "./components/pages/DepartmentManagerDashboard";
import EmployeeSupervisorDashboard from "./components/pages/EmployeeSupervisorDashboard";
import EmployeeProjects from "./components/pages/EmployeeProjects";
import DependentManagement from "./components/pages/DependentManagement";
import EmployeeProfiles from "./components/pages/EmployeeProfiles";
import EmployeeDashboard from "./components/pages/EmployeeDashboard";
import PublicInformation from "./components/pages/PublicInformation";

export const routers = createBrowserRouter([
    {   
     // {/* Route yang Membutuhkan Login (Semua User) */}
     element: <PrivateRoute allowedRoles={['Administrator', 'HR Manager', 'Department Manager', 'Employee Supervisor', 'Employee']}/>,
     children: [{
       path: "/profile",
       element: <Profile />,
     },
     {
      path: "/",
      element: <Dashboard />,
    }
    ]
    },     
    {   
     element: <PrivateRoute allowedRoles={['Administrator']}/>,            
     children: [
       {
          path: "/register",
          element: <Register />,
       },
       {
          path: "/employees",
          element: <EmployeesList />,
       },
       {
          path: "/employees/new",
          element: <AddEmployee />,
       },
       {
          path: "/employees/:empNo",
          element: <EmployeeDetails />,
       },
       {
          path: "/departments",
          element: <DepartmentList />,
       },
       {
          path: "/departments/:id",
          element: <AddDepartment />,
       },
       {
          path: "/departments/:deptNo",
          element: <DepartmentDetails />,
       },
       {
          path: "/projects",
          element: <ProjectsList />,
       },
       {
          path: "/workson",
          element: <WorksOnList />,
       },
       {
          path: "/location",
          element: <LocationList />,
       },
      ]
    },
    {   
      element: <PrivateRoute allowedRoles={['HR Manager']}/>,            
      children: [
        {
           path: "/employees",
           element: <EmployeesList />,
        },
        {
           path: "/employees/new",
           element: <AddEmployee />,
        },
        {
           path: "/employees/:empNo",
           element: <EmployeeDetails />,
        },{
           path: "/employees/:empNo",
           element: <EmployeeDetails />,
        },
        {
         path: "/employees/edit/:empNo",
         element: <EditEmployee />,
        },
        {
           path: "/projects",
           element: <ProjectsList />,
        },
       ]
     },     
     {
      element: <PrivateRoute allowedRoles={["Department Manager"]} />,
      children: [
        {
          path: "/department-manager-dashboard",
          element: <DepartmentManagerDashboard />,
        },
        {
          path: "/departments",
          element: <DepartmentList />,
        },
        {
          path: "/projects",
          element: <ProjectsList />,
        },
        {
          path: "/employees",
          element: <EmployeesList />,
        },
        {
          path: "/employees/:empNo",
          element: <EmployeeDetails />,
        },
      ],
    },
    // Route for Employee Supervisor
    {
      element: <PrivateRoute allowedRoles={["Employee Supervisor"]} />,
      children: [
        {
          path: "/employee-supervisor-dashboard",
          element: <EmployeeSupervisorDashboard />,
        },
        {
          path: "/employees",
          element: <EmployeesList />, // Filter to only show supervised employees
        },
        {
          path: "/employees/:empNo",
          element: <EmployeeDetails />,
        },
        {
          path: "/workson",
          element: <WorksOnList />,
        },
        {
          path: "/departments",
          element: <DepartmentList />,
        },
        {
          path: "/projects",
          element: <ProjectsList />,
        },
      ],
    },          
    {
      element: <PrivateRoute allowedRoles={['Employee']} />,
      children: [
        {
          path: "/employee-dashboard",
          element: <EmployeeDashboard />,
        },
        {
          path: '/employees/profile',
          element: <EmployeeProfiles />, // View & Update Profile
        },
        {
          path: '/employees/public-info',
          element: <PublicInformation />, // View Own Projects
        },
        {
          path: '/employees/dependents',
          element: <DependentManagement />, // Manage Dependents
        },
      ],
    },            
    {/* Rute Publik */
       element: <Layout />,
       children: [
         
         {
           path: "/login",
           element: <Login />,
         },
        //  {
        //     path: "/register",
        //     element: <Register />,
        //  },
         {
           path: "/logout",
           element: <Logout />,
         },    
         {/* Halaman Unauthorized */
           path: "/unauthorized",
           element: <Unauthorized />
         },
        ]   
    } 
])    