import React from 'react';
import { API } from '../config';

const ShowImage = ({ item, url }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      style={{ maxHeight: '100%', maxWidth: '100%' }}
    />
  </div>
);

export default ShowImage;
