import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal, setWorkData, clearWorkData } from '../../redux/WorkSlice';
import Sidebar from './Sidebar';
import UseGetAllEmployees from '../../hooks/UseGetAllEmployees';
import '../../assets/styles/Addwork.css';
import axios from 'axios';
import { ADMIN_API_ENDPOINT } from '../../utils/constant';
import { useParams,useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
const AddWork = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { employees, loading, error } = UseGetAllEmployees();
  const { id: adminId } = useParams();
  const { isModalOpen, selectedEmployeeId, work } = useSelector((state) => state.work);
  
  const handleFormData = (e) => {
      const { name, value } = e.target;
      dispatch(setWorkData({ [name]: value }));
    };
    
    const workdata = useSelector((state) => state.work.work);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Assigning work to employee ${selectedEmployeeId}:`, workdata);
    try {
      const response = await axios.post(`${ADMIN_API_ENDPOINT}/addwork/${adminId}/${selectedEmployeeId}`, workdata);
      console.log(response.data);
      dispatch(clearWorkData()); 
      toast.success("Work added successfully");
      navigate(`/adminhome/${adminId}`);
    } catch (error) {
      toast.error("Error in adding work");
      console.log(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading employees.</p>;

  return (
    <div className="add-work-container">
      <Sidebar />
      <div className="add-work-table-container">
      <button className="back-button" onClick={() => navigate(`/adminhome/${adminId}`)}>
          Back to Dashboard
        </button>
        <h1>Employees</h1>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Sno</th>
              <th>Name</th>
              <th>Email</th>
              <th>Project's Pending</th>
              <th>Employee Status</th>
              <th>Add Work</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id}>
                <td>{index + 1}</td>
                <td>{employee.empname}</td>
                <td>{employee.mail}</td>
                <td>{employee.projectspending}</td>
                <td>{employee.Employeestatus}</td>
                {
                  employee.Employeestatus!=='Admin'&&employee._id!==adminId&&
                  <td className="select">
                    <button className="button" onClick={() => dispatch(openModal(employee._id))}>
                      Add Work
                    </button>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button className="close" onClick={() => dispatch(closeModal())}>×</button>
              <h2>Assign Work</h2>
              <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={work.title}
                  onChange={handleFormData}
                  required
                />
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={work.description}
                  onChange={handleFormData}
                  required
                />
                <label>Due Date:</label>
                <input
                  type="date"
                  name="due_date"
                  value={work.due_date}
                  onChange={handleFormData}
                  required
                />

                <button type="submit">Add Work</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddWork;
