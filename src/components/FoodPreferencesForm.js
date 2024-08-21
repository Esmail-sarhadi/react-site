// src/components/FoodPreferencesForm.js
import React from 'react';
import { foodGroups } from '../data/foodData';

const FoodPreferencesForm = ({ preferences, setPreferences }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Food Preferences</h3>
      {foodGroups.map((group) => (
        <div key={group.fgid} className="mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences[group.fgid]}
              onChange={() => setPreferences({...preferences, [group.fgid]: !preferences[group.fgid]})}
              className="mr-2"
            />
            {group.foodgroup}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FoodPreferencesForm;
