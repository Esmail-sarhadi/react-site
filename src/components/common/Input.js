// src/components/common/Input.js
import React from 'react';

const Input = ({ label, value, onChange, type = "text", required = false }) => (
  <div className="flex flex-col mb-4">
    <label className="text-lg font-medium mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
      required={required}
    />
  </div>
);

export default Input;
