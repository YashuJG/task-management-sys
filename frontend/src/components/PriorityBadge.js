// PriorityBadge.js
import React from 'react';

const PriorityBadge = ({ priority }) => {
  const styles = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <span className={`badge ${styles[priority] || styles.Low}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;