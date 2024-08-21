// src/components/common/Select.js
import React from 'react';

const Select = ({ label, value, onChange, options, required = false }) => (
  <div className="flex flex-col mb-4">
    <label className="text-lg font-medium mb-2">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
      required={required}
    >
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
