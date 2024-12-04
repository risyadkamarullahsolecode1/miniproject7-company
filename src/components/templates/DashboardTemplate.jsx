import React from 'react';

const DashboardTemplate = ({ children }) => {
    return (
        <div className="dashboard-template">
            <h1>Dashboard</h1>
            <div className="dashboard-content">{children}</div>
        </div>
    );
};

export default DashboardTemplate;