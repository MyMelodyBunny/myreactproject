import React, { useState } from 'react';

const InfoItem = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{item.summary}</p>
        <button className="btn btn-link" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {showDetails && <p className="card-text">{item.details}</p>}
      </div>
    </div>
  );
};

export default InfoItem;
