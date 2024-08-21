import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import Button from './common/Button';
import { getFoodIcon, getFoodGroupEmoji } from '../utils/foodIcons';

const FoodGuideTable = ({ member }) => {
  const tableRef = useRef(null);
  const contentRef = useRef(null);

  const saveAsImage = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: true,
        windowWidth: 1200,
        windowHeight: 1600
      });
      
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement('a');
      link.download = `${member.name}_food_guide.png`;
      link.href = image;
      link.click();
    }
  };

  if (!member || !member.menu) {
    return <div>No data available</div>;
  }

  const foodGroups = [
    { id: 'vf', name: 'Vegetables and Fruit' },
    { id: 'gr', name: 'Grain Products' },
    { id: 'mi', name: 'Milk and Alternatives' },
    { id: 'me', name: 'Meat and Alternatives' }
  ];

  return (
    <motion.div 
      ref={tableRef}
      className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={contentRef}>
        <div className="bg-red-600 text-white p-6">
          <h2 className="text-3xl font-bold mb-2">My Food Guide 🍽️</h2>
          <p className="text-xl">{member.name} - {member.gender}, Age: {member.age}</p>
          {member.preferences && (
            <p className="text-lg mt-2">
              Preferred Food Groups: {foodGroups
                .filter(group => member.preferences[group.id])
                .map(group => getFoodGroupEmoji(group.name))
                .join(' ')}
            </p>
          )}
        </div>
        <div className="p-6">
          {member.menu.map((item, index) => {
            const group = foodGroups.find(g => g.id === item.group);
            const groupName = group ? group.name : item.group;
            const groupEmoji = getFoodGroupEmoji(groupName);
            return (
              <div key={index} className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="mr-2 text-3xl">{groupEmoji}</span>
                  {groupName}
                  <span className="ml-auto text-lg font-normal bg-red-100 text-red-800 px-3 py-1 rounded-full">
                    {item.servings} servings
                  </span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {item.foods.map((food, foodIndex) => {
                    const [foodName, servingSize] = food.split(' (');
                    return (
                      <motion.div 
                        key={foodIndex} 
                        className="bg-gray-100 p-4 rounded-lg text-center shadow-md cursor-pointer"
                        whileHover={{ 
                          scale: 1.1, 
                          boxShadow: "0px 0px 8px rgba(0,0,0,0.2)",
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.75 }}
                      >
                        <span className="text-4xl mb-2 block">{getFoodIcon(foodName)}</span>
                        <p className="font-medium text-sm mb-1">{foodName}</p>
                        <p className="text-xs text-gray-600">Serving: {servingSize}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-6 bg-gray-100">
        <Button 
          onClick={saveAsImage}
          className="bg-green-600 hover:bg-green-700 w-full"
        >
          Save as Image
        </Button>
      </div>
    </motion.div>
  );
};

export default FoodGuideTable;
