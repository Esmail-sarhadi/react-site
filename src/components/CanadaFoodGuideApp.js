// src/components/CanadaFoodGuideApp.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, Loader } from 'lucide-react';
import FoodGuideTable from './FoodGuideTable';
import IndividualForm from './IndividualForm';
import FamilyForm from './FamilyForm';
import Button from './common/Button';
import { generateMenu } from '../utils/menuGenerator';

const CanadaFoodGuideApp = () => {
  const [mode, setMode] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setMenu([]);
  };

  const handleIndividualSubmit = (formData) => {
    setLoading(true);
    console.log('Received form data in CanadaFoodGuideApp:', formData);
    setTimeout(() => {
      const generatedMenu = generateMenu(parseInt(formData.age), formData.gender, formData.preferences);
      setMenu([{ 
        name: formData.name, 
        age: formData.age,
        gender: formData.gender,
        preferences: formData.preferences,
        menu: generatedMenu 
      }]);
      setLoading(false);
    }, 1000);
  };

  const handleFamilySubmit = (familyData) => {
    setLoading(true);
    console.log('Received family data in CanadaFoodGuideApp:', familyData);
    setTimeout(() => {
      const familyMenu = familyData.map(member => ({
        name: member.name,
        age: member.age,
        gender: member.gender,
        preferences: member.preferences,
        menu: generateMenu(parseInt(member.age), member.gender, member.preferences)
      }));
      setMenu(familyMenu);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white py-6 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto px-4 py-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-red-600">Canada Food Guide App 🍁</h1>
        <div className="flex justify-center mb-6 space-x-4">
          <Button 
            onClick={() => handleModeSelect('individual')} 
            className={`${mode === 'individual' ? 'bg-red-600 shadow-lg' : 'bg-gray-300'}`}
          >
            <User className="inline-block mr-2" /> Individual
          </Button>
          <Button 
            onClick={() => handleModeSelect('family')} 
            className={`${mode === 'family' ? 'bg-red-600 shadow-lg' : 'bg-gray-300'}`}
          >
            <Users className="inline-block mr-2" /> Family
          </Button>
        </div>

        <AnimatePresence>
          {mode === 'individual' && (
            <IndividualForm onSubmit={handleIndividualSubmit} />
          )}

          {mode === 'family' && (
            <FamilyForm onSubmit={handleFamilySubmit} />
          )}
        </AnimatePresence>

        {loading && (
          <div className="text-center mt-6">
            <Loader className="animate-spin inline-block mr-2" />
            <p className="text-lg font-semibold">Generating your personalized menu...</p>
          </div>
        )}

        <AnimatePresence>
          {menu.length > 0 && !loading && (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {menu.map((member, index) => (
                member && member.menu ? (
                  <FoodGuideTable key={index} member={member} />
                ) : (
                  <div key={index}>Invalid data for member {index + 1}</div>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CanadaFoodGuideApp;
