// src/components/common/Button.js
import React from 'react';

const Button = ({ onClick, className, children, type = "button" }) => (
  <button
    onClick={onClick}
    type={type}
    className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${className}`}
  >
    {children}
  </button>
);

export default Button;
