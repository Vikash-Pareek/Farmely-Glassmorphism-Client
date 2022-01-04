import React, { useState } from 'react';

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map((p, i) => (
    <div key={i} style={{ marginBottom: '0.5rem' }}>
      <input type="radio"
        checked={value === `${p._id}`}
        onChange={handleChange}
        value={`${p._id}`}
        name={p}
      />
      <label>{p.name}</label>
    </div>
  ));
};

export default RadioBox;
