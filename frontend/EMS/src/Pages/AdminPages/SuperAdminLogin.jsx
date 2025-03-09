import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/SuperAdminLogin.css'; 
import { ADMIN_API_ENDPOINT } from '../../utils/constant'; 

const SuperAdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        try 
        {  
            const url = `${ADMIN_API_ENDPOINT}/SuperAdminLogin`;
            // console.log("Making request to URL:", url);  
            // console.log({email,password});
            const response = await axios.post(url, { superadminmail: email, superadminpassword: password });

            if (response.status === 200) {
               
                navigate('/SuperAdmin/dashboard', { state: { superAdminId: response.data.superAdminId } });
            }
        } catch (err) {
            
            setError(err.response?.data?.message || 'Something went wrong!');
        }
    };
    return (
        <div className="superadmin-login-container">
            <form onSubmit={handleSubmit} className="superadmin-login-form">
                <h2>SuperAdmin Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Login</button>
            </form>
        </div>
    );
};

export default SuperAdminLogin;
