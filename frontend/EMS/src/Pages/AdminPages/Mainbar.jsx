import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UseGetAllEmployees from '../../hooks/UseGetAllEmployees';
import '../../assets/styles/AdminHome.css'; 
import axios from 'axios';
import Sidebar from './Sidebar';

const Mainbar = () => {
  // console.log("Hi from mainbar");
  const { employees, loading, error } = UseGetAllEmployees();
  const { id: adminId } = useParams(); 
  const organizationId = useSelector(store => store.admin.organizationId);
  const adminID = useSelector(store => store.employee.employeeId);
  const navigate = useNavigate();

  return (
    <div className='promote-employee-layout'>
      <Sidebar />
      <div className='employee-list-container'>
        {employees.map((employee) => (
          <div key={employee._id} className='employee-box'>
            <div className='profile' style={{ width: '30%' }}>
            {employee.profilePhoto ? (
              <img src={employee.profilePhoto} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-image-placeholder">No Image</div>
            )}
              <h3>{employee.empname}</h3>
            </div>
            <div className='details' style={{ width: '70%' }}>
              <div className='grid-container'>
                <p className='detail-heading'>Email:</p>
                <p>{employee.mail}</p>
                <p className='detail-heading'>Age:</p>
                <p>{employee.age}</p>
                <p className='detail-heading'>Status:</p>
                <p>{employee.Employeestatus}</p>
                <p className='detail-heading'>Rating:</p>
                <p>{employee.rating}</p>
                <p className='detail-heading'>Projects Pending:</p>
                <p>{employee.projectspending}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mainbar
