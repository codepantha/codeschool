import React from 'react';

const Input = (props) => {
  const { name, type, value, handleChange, placeholder, required } = props;
  return (
    <input
      className="w-full p-4 mb-4 border rounded-md outline-none"
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default Input;
