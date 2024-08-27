// src/utils/utils.js

export const getRandomServingSize = (foodGroup) => {
  const servings = {
    vf: ['125 mL, ½ cup', '250 mL, 1 cup', '1 medium', '½ fruit', '1 fruit'],
    gr: ['1 slice, 35 g', '½ cup cooked', '30 g', '½ bagel, 45 g'],
    mi: ['250 mL, 1 cup', '50 g, 1½ oz', '175 g, ¾ cup'],
    me: ['75 g (2½ oz)', '150 g, ¾ cup', '2 eggs', '30 mL, 2 Tbsp']
  };

  const group = foodGroup.slice(0, 2).toLowerCase();
  const options = servings[group] || servings.vf; // Default to vegetables and fruits if unknown
  return options[Math.floor(Math.random() * options.length)];
};
