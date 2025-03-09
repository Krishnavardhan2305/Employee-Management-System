import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import UseGetAllOrganizations from "../../hooks/UseGetAllOrganizations";
import { useNavigate } from "react-router-dom";

const SuperAdminRevenue = () => {
  const { organizationData, loading, error } = UseGetAllOrganizations();
  const navigate=useNavigate();

  const monthlyData = useMemo(() => {
    if (!organizationData || organizationData.length === 0) return [];

    const monthMap = {};

    organizationData.forEach((org) => {
      const date = new Date(org.createdAt); 
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format as YYYY-MM

      if (!monthMap[month]) {
        monthMap[month] = { month, organizations: 0, revenue: 0 };
      }
      monthMap[month].organizations += 1;
      monthMap[month].revenue += 20; 
    });

    return Object.values(monthMap).sort((a, b) => new Date(a.month) - new Date(b.month));
  }, [organizationData]);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Super Admin Revenue</h2>
        <button onClick={()=>navigate(-1)}>Home</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="organizations" fill="#4F46E5" name="Organizations" />
            <Bar dataKey="revenue" fill="#10B981" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SuperAdminRevenue;
