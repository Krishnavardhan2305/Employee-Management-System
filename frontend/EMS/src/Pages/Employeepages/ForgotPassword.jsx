import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/styles/ForgotPassword.css';
import { useNavigate, useParams } from 'react-router-dom';
import { EMPLOYEE_API_ENDPOINT } from '../../utils/constant';

const ForgotPassword = () => {
    const {organization_name,employeeId}=useParams();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${EMPLOYEE_API_ENDPOINT}/forgotpassword`, { email: formData.email, password: formData.password });
      setMessage('Password reset link sent to your email');
      setError('');
      setFormData({
        email: '',
        password: ''
      });
      navigate("/LoginasEmp");
    } catch (error) {
      console.error('Failed to send reset link:', error);
      setError('Failed to send reset link.');
      setMessage('');
    }
  };

  return (
    <div className='forgotPassword'>
        
      <form onSubmit={handleSubmit}>
        <div>
            <button onClick={() => navigate('/')}>Home</button>
          <label>Email</label>
          <input
            type="String"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder='email'
          />
          <label>Password</label>
          <input
            type="String"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder='password'
          />
        </div>
        <button type="submit">Reset Password</button>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
