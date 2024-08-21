// src/components/FamilyForm.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, PlusCircle } from 'lucide-react';
import Input from './common/Input';
import Select from './common/Select';
import Button from './common/Button';
import FoodPreferencesForm from './FoodPreferencesForm';

const FamilyForm = ({ onSubmit }) => {
  const [familyMembers, setFamilyMembers] = useState([{ 
    age: '', 
    gender: '', 
    name: '',
    preferences: {vf: true, gr: true, mi: true, me: true}
  }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(familyMembers);
  };

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { 
      age: '', 
      gender: '', 
      name: '',
      preferences: {vf: true, gr: true, mi: true, me: true}
    }]);
  };

  const removeFamilyMember = (index) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== index));
  };

  const updateFamilyMember = (index, field, value) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFamilyMembers(updatedMembers);
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
        <h2 className="text-2xl font-bold mb-4 text-red-600">Family Information</h2>
        {familyMembers.map((member, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-red-500">Family Member {index + 1}</h3>
            <Input 
              label="Name"
              value={member.name}
              onChange={(e) => updateFamilyMember(index, 'name', e.target.value)}
              required
            />
            <Input 
              label="Age"
              type="number"
              value={member.age}
              onChange={(e) => updateFamilyMember(index, 'age', e.target.value)}
              required
            />
            <Select 
              label="Gender"
              value={member.gender}
              onChange={(e) => updateFamilyMember(index, 'gender', e.target.value)}
              options={[
                { value: 'Female', label: 'Female' },
                { value: 'Male', label: 'Male' }
              ]}
              required
            />
            <FoodPreferencesForm 
              preferences={member.preferences}
              setPreferences={(newPreferences) => updateFamilyMember(index, 'preferences', newPreferences)}
            />
            <Button 
              type="button" 
              onClick={() => removeFamilyMember(index)} 
              className="bg-red-600 hover:bg-red-700 mt-2"
            >
              <Trash2 className="inline-block mr-2" /> Remove Member
            </Button>
          </div>
        ))}
        <div className="flex justify-between items-center">
          <Button 
            type="button" 
            onClick={addFamilyMember} 
            className="bg-green-600 hover:bg-green-700"
          >
            <PlusCircle className="inline-block mr-2" /> Add Family Member
          </Button>
          <Button 
            type="submit" 
            className="bg-red-600 hover:bg-red-700"
          >
            Generate Food Guide
          </Button>
        </div>
      </div>
    </motion.form>
  );
};

export default FamilyForm;
