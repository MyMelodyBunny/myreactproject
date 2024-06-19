import React from 'react';
import InfoItem from './InfoItem';

const InfoList = ({ data }) => {
  return (
    <div className="list-group">
      {data.map(item => (
        <InfoItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default InfoList;
