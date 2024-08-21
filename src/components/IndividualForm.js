// src/components/IndividualForm.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Input from './common/Input';
import Select from './common/Select';
import Button from './common/Button';
import FoodPreferencesForm from './FoodPreferencesForm';

const IndividualForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    preferences: {vf: true, gr: true, mi: true, me: true}
  });

  useEffect(() => {
    console.log('Form data updated:', formData);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    onSubmit(formData);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Individual Information</h2>
        <Input 
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input 
          label="Age"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
        />
        <Select 
          label="Gender"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          options={[
            { value: 'Female', label: 'Female' },
            { value: 'Male', label: 'Male' }
          ]}
          required
        />
        <FoodPreferencesForm 
          preferences={formData.preferences}
          setPreferences={(newPreferences) => setFormData({ ...formData, preferences: newPreferences })}
        />
        <Button 
          type="submit" 
          className="bg-red-600 hover:bg-red-700 w-full mt-4"
        >
          Generate Food Guide
        </Button>
      </div>
    </motion.form>
  );
};

export default IndividualForm;
