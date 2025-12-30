// StatusLabel.js
import React from 'react';

const StatusLabel = ({ status }) => {
  const styles = {
    Completed: 'bg-green-100 text-green-700 border-green-200',
    'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
    Pending: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span className={`badge ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
};

export default StatusLabel;