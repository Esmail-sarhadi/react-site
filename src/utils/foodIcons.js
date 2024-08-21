// src/utils/foodIcons.js

export const getFoodGroupEmoji = (groupName) => {
  const emojiMap = {
    'Vegetables and Fruit': '🍎',
    'Grain Products': '🍞',
    'Milk and Alternatives': '🥛',
    'Meat and Alternatives': '🥩'
  };
  
  return emojiMap[groupName] || getDefaultEmoji(groupName);
};

const getDefaultEmoji = (groupName) => {
  const lowerGroupName = groupName.toLowerCase();
  if (lowerGroupName.includes('vegetable') || lowerGroupName.includes('fruit')) {
    return '🥗';
  }
  if (lowerGroupName.includes('grain')) {
    return '🌾';
  }
  if (lowerGroupName.includes('milk') || lowerGroupName.includes('dairy')) {
    return '🥛';
  }
  if (lowerGroupName.includes('meat')) {
    return '🍖';
  }
  return '🍽️';
};

export const getFoodIcon = (foodName) => {
  const iconMap = {
    // Vegetables and Fruits
    'Asparagus': '🥦',
    'Beans, green': '🫛',
    'Bok choy': '🥬',
    'Broccoli': '🥦',
    'Brussels sprouts': '🥬',
    'Carrots': '🥕',
    'Chard': '🥬',
    'Dandelion greens': '🥬',
    'Endive': '🥬',
    'Fiddleheads': '🌿',
    'Kale': '🥬',
    'Leeks': '🧅',
    'Lettuce': '🥬',
    'Mesclun mix': '🥬',
    'Mustard greens': '🥬',
    'Okra': '🫑',
    'Peas': '🫛',
    'Pumpkin': '🎃',
    'Seaweed': '🌿',
    'Snow peas': '🫛',
    'Spinach': '🥬',
    'Squash': '🎃',
    'Sweet potato': '🍠',
    'Yam': '🍠',
    'Apricot': '🍑',
    'Cantaloupe': '🍈',
    'Mango': '🥭',
    'Nectarine': '🍑',
    'Papaya': '🍈',
    'Peach': '🍑',
    'Apple': '🍎',
    'Avocado': '🥑',
    'Bamboo shoots': '🎍',
    'Banana': '🍌',
    'Beans, yellow': '🫛',
    'Beets': '🫐',
    'Berries': '🫐',
    'Bitter melon': '🥒',
    'Cabbage': '🥬',
    'Cauliflower': '🥦',
    'Celery': '🥬',
    'Chayote': '🥒',
    'Cherries': '🍒',
    'Corn': '🌽',
    'Cucumber': '🥒',
    'Dried fruit': '🍇',
    'Eggplant': '🍆',
    'Fig': '🫐',
    'Grapefruit': '🍊',
    'Grapes': '🍇',
    'Guava': '🫐',
    'Honeydew': '🍈',
    'Fruit juice': '🧃',
    'Kiwi': '🥝',
    'Kohlrabi': '🥔',
    'Lychee': '🫐',
    'Mixed vegetables': '🥗',
    'Mushrooms': '🍄',
    'Orange': '🍊',
    'Pear': '🍐',
    'Peppers': '🫑',
    'Pineapple': '🍍',
    'Plantain': '🍌',
    'Plum': '🫐',
    'Potato': '🥔',
    'Radishes': '🫒',
    'Rhubarb': '🥬',
    'Tomato': '🍅',
    'Tomato sauce': '🥫',
    'Turnip': '🥔',
    'Vegetable juice': '🥤',
    'Watermelon': '🍉',
    'Zucchini': '🥒',
    'Pepper, sweet': '🫑',
    'Edamame': '🫛',
    // Grain Products
    'Barley': '🌾',
    'Bagel': '🥯',
    'Bread': '🍞',
    'Bulgur': '🌾',
    'Cereal': '🥣',
    'Crackers': '🍘',
    'Muffin': '🧁',
    'Quinoa': '🌾',
    'Rice': '🍚',
    'Pasta': '🍝',
    'Pita': '🫓',
    'Tortilla': '🫓',
    'Bannock': '🫓',
    'Baguette': '🥖',
    'Congee': '🥣',
    'Cornbread': '🌽',
    'Couscous': '🌾',
    'Naan': '🫓',
    'Pancake': '🥞',
    'Polenta': '🌽',
    'Popcorn': '🍿',
    'Roll': '🥐',
    // Milk and Alternatives
    'Buttermilk': '🥛',
    'Fortified soy beverage': '🥛',
    'Milk': '🥛',
    'Cheese': '🧀',
    'Yogurt': '🥛',
    'Kefir': '🥛',
    'Paneer': '🧀',
    // Meat and Alternatives
    'Beans': '🫘',
    'Eggs': '🥚',
    'Lentils': '🫘',
    'Nuts': '🥜',
    'Peanut butter': '🥜',
    'Seeds': '🌰',
    'Tofu': '🧊',
    'Beef': '🥩',
    'Bison': '🥩',
    'Chicken': '🍗',
    'Deli meat': '🥓',
    'Duck': '🦆',
    'Fish': '🐟',
    'Game birds': '🦃',
    'Game meats': '🦌',
    'Goat': '🐐',
    'Ham': '🍖',
    'Lamb': '🍖',
    'Organ meat': '🫀',
    'Pork': '🥓',
    'Rabbit': '🐰',
    'Shellfish': '🦞',
    'Turkey': '🦃',
    'Veal': '🥩'
  };

  const cleanedFoodName = foodName.toLowerCase().replace(/\(.*?\)/g, '').trim();
  
  const foodWords = cleanedFoodName.split(/[,\s]+/);
  
  for (let word of foodWords) {
    if (iconMap[word]) {
      return iconMap[word];
    }
  }
  
  for (let word of foodWords) {
    for (let key in iconMap) {
      if (key.toLowerCase().includes(word) || word.includes(key.toLowerCase())) {
        return iconMap[key];
      }
    }
  }
  
  return '🍽️';
};
