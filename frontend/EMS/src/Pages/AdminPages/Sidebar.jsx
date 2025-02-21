import React, { useEffect } from 'react';
import profile from '../../assets/Images/Profile.jpeg';
import { NavLink, useParams } from 'react-router-dom';
import '../../assets/styles/sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, resetadminname } from '../../redux/authSlice';
import { resetEmployee } from '../../redux/employeeSlice';
import { resetadmin } from '../../redux/adminSlice';
import {  toast } from 'react-toastify';
const Sidebar = () => {
  const { id: employeeId } = useParams(); 
  const dispatch = useDispatch();

  
  const employee = useSelector((state) => state.employee.employeeData);
  const adminname = useSelector((state) => state.auth.adminname);
  const organization_logo=useSelector((state)=>state.admin.organizationLogo);
  useEffect(() => {
    
    console.log('Employee Data:', employee);
    console.log('Admin Name:', adminname);
  }, [employee, adminname]);

  const handleLogOut = () => {
    dispatch(setLoading(true));
    dispatch(resetEmployee());
    dispatch(resetadminname());
    dispatch(resetadmin());
    toast.success("Logout succesfull");
    setTimeout(() => {
      dispatch(setLoading(false));
      window.location.href = '/';
    }, 1000);
  };


  const isManager = employee.Employeestatus === 'Manager';
  const isAdmin = employee.Employeestatus === 'Admin';

  return (
    <div className="sidebar-container">
      <div className="sidebar-top">
        <div className="profilepic">
          {organization_logo ? (
            <img src={organization_logo} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-image-placeholder">No Image</div>
          )}
        </div>
        <h2 className="profile-name">{employee.empname || 'Unknown Admin'}</h2>
      </div>
      <div className="sidebar-bottom">
        <nav className="sidebar-nav">
          {/* Admin-only options */}
          {isAdmin && (
            <>
              <NavLink
                to={`/adminHome/add-employee/${employeeId}`}
                className={({ isActive }) => (isActive ? 'active-link sidebar-link' : 'sidebar-link')}
              >
                Add Employee
              </NavLink>
              <NavLink
                to={`/adminHome/delete-employee/${employeeId}`}
                className={({ isActive }) => (isActive ? 'active-link sidebar-link' : 'sidebar-link')}
              >
                Delete Employee
              </NavLink>
              <NavLink
                to={`/adminHome/promote-employee/${employeeId}`}
                className={({ isActive }) => (isActive ? 'active-link sidebar-link' : 'sidebar-link')}
              >
                Promote Employee
              </NavLink>
            </>
          )}
          {/* Options for both Admin and Manager */}
          {(isAdmin || isManager) && (
            <>
              <NavLink
                to={`/adminHome/add-work/${employeeId}`}
                className={({ isActive }) => (isActive ? 'active-link sidebar-link' : 'sidebar-link')}
              >
                Add Work
              </NavLink>
              <NavLink
                to={`/adminHome/review-work/${employeeId}`}
                className={({ isActive }) => (isActive ? 'active-link sidebar-link' : 'sidebar-link')}
              >
                Review Work
              </NavLink>
            </>
          )}
          {/* Logout option */}
          <NavLink to="#" onClick={handleLogOut} className="sidebar-link">
            Logout
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
