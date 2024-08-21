// src/utils/menuGenerator.js
import { foods, foodCategories, servingsPerDay, foodGroups } from '../data/foodData';

export const generateMenu = (age, gender, preferences) => {
  const ageGroup = getAgeGroup(age);
  let menu = [];

  foodGroups.forEach(fg => {
    if (!preferences[fg.fgid]) return; // Skip if food group is not selected

    const serving = servingsPerDay.find(s => s.fgid === fg.fgid && s.gender === gender && s.ages === ageGroup);
    if (!serving) return;

    const servingCount = parseInt(serving.servings.split(' to ')[0]);
    let foodItems = new Set(); // Use a Set to prevent duplicates
    let darkGreenCount = 0;
    let orangeCount = 0;

    const categoryFoods = foods.filter(f => f.fgid === fg.fgid);
    
    while (foodItems.size < servingCount) {
      let selectedFood;
      
      if (fg.fgid === 'vf') {
        if (darkGreenCount === 0) {
          const darkGreenFoods = categoryFoods.filter(f => f.fgcat_id === 1);
          selectedFood = darkGreenFoods[Math.floor(Math.random() * darkGreenFoods.length)];
          darkGreenCount++;
        } else if (orangeCount === 0) {
          const orangeFoods = categoryFoods.filter(f => f.fgcat_id === 2);
          selectedFood = orangeFoods[Math.floor(Math.random() * orangeFoods.length)];
          orangeCount++;
        } else {
          selectedFood = categoryFoods[Math.floor(Math.random() * categoryFoods.length)];
        }
      } else if (fg.fgid === 'gr') {
        const wholeGrainFoods = categoryFoods.filter(f => f.fgcat_id === 3);
        const nonWholeGrainFoods = categoryFoods.filter(f => f.fgcat_id === 4);
        if (foodItems.size < Math.ceil(servingCount / 2)) {
          selectedFood = wholeGrainFoods[Math.floor(Math.random() * wholeGrainFoods.length)];
        } else {
          selectedFood = nonWholeGrainFoods[Math.floor(Math.random() * nonWholeGrainFoods.length)];
        }
      } else {
        selectedFood = categoryFoods[Math.floor(Math.random() * categoryFoods.length)];
      }

      // Only add the food if it's not already in the set
      if (!foodItems.has(selectedFood.food)) {
        foodItems.add(selectedFood.food);
      }
    }

    menu.push({
      group: fg.foodgroup,
      foods: Array.from(foodItems).map(food => {
        const foodItem = categoryFoods.find(f => f.food === food);
        return `${foodItem.food} (${foodItem.srvg_sz})`;
      }),
      servings: serving.servings
    });
  });

  return menu;
};

export const getAgeGroup = (age) => {
  if (age >= 2 && age <= 3) return '2 to 3';
  if (age >= 4 && age <= 8) return '4 to 8';
  if (age >= 9 && age <= 13) return '9 to 13';
  if (age >= 14 && age <= 18) return '14 to 18';
  if (age >= 19 && age <= 30) return '19 to 30';
  if (age >= 31 && age <= 50) return '31 to 50';
  if (age >= 51 && age <= 70) return '51 to 70';
  if (age >= 71) return '71+';
  return '19 to 30'; // Default age group
};
