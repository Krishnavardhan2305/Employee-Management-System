import React from 'react';
import { useNavigate } from 'react-router-dom';
import UseGetAllOrganizations from '../../hooks/UseGetAllOrganizations';
import '../../assets/styles/SuperAdmin.css';

const SuperAdmin = () => {
  const { organizationData, loading, error } = UseGetAllOrganizations();
  console.log(organizationData);
  
  const navigate = useNavigate();

  const handleRevenueClick = () => {
    navigate(`/superadmin/dashboard/revenue`);
  };

  return (
    <div className="super-admin-container">
      <h2>Organization Overview</h2>
      <button className="revenue-button" onClick={() => handleRevenueClick()}>
        Show Revenue Status
      </button>
      <button onClick={()=>navigate('/')}>
        Home
      </button>
      {loading && <p>Loading data...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && !error && organizationData.length > 0 ? (
        <div className="organization-list">
          {organizationData.map((org, index) => (
            <div key={index} className="organization-box">
              <div className="logo-container">
                {org.Organization_Logo ? (
                  <img
                    src={org.Organization_Logo}
                    alt={`${org.organization_name || 'Organization'} Logo`}
                    className="organization-logo"
                  />
                ) : (
                  <div className="no-logo">No Logo Available</div>
                )}
              </div>
              <div className="organization-details">
                <h3>{org.organization_name || 'No Name Available'}</h3>
                <p><strong>Admin Name:</strong> {org.adminname || 'N/A'}</p>
                <p><strong>Email:</strong> {org.mail || 'N/A'}</p>
                <p><strong>Employees:</strong> {org.employees ? org.employees.length : 0}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No organizations found.</p>
      )}
    </div>
  );
};

export default SuperAdmin;
