import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { 
  Download 
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const foodGroups = [
  { fgid: 'vf', foodgroup: 'Vegetables and Fruit ' },
  { fgid: 'gr', foodgroup: 'Grain Products ' },
  { fgid: 'mi', foodgroup: 'Milk and Alternatives' },
  { fgid: 'me', foodgroup: 'Meat and Alternatives' }
];

const directionalStatements = [
  "Eat at least one dark green and one orange vegetable each day.",
  "Choose vegetables and fruit prepared with little or no added fat, sugar or salt.",
  "Have vegetables and fruit more often than juice.",
  "Make at least half of your grain products whole grain each day.",
  "Choose grain products that are lower in fat, sugar or salt.",
  "Drink skim, 1%, or 2% milk each day.",
  "Select lower fat milk alternatives.",
  "Have meat alternatives such as beans, lentils and tofu often.",
  "Eat at least two Food Guide Servings of fish each week.",
  "Select lean meat and alternatives prepared with little or no added fat or salt."
];

const foodCategories = [
  { fgid: 'vf', fgcat_id: 0, fgcat: 'Non dark green or orange vegetable' },
  { fgid: 'vf', fgcat_id: 1, fgcat: 'Dark green vegetable' },
  { fgid: 'vf', fgcat_id: 2, fgcat: 'Orange vegetable' },
  { fgid: 'gr', fgcat_id: 4, fgcat: 'Non whole grain' },
  { fgid: 'gr', fgcat_id: 3, fgcat: 'Whole grain' },
  { fgid: 'mi', fgcat_id: 5, fgcat: 'Milk' },
  { fgid: 'mi', fgcat_id: 6, fgcat: 'Milk Alternatives' },
  { fgid: 'me', fgcat_id: 7, fgcat: 'Meat Alternatives' },
  { fgid: 'me', fgcat_id: 8, fgcat: 'Meat, fish, poultry and shellfish' }
];

const foods = [
 { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup, 6 spears', food: 'Asparagus' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup', food: 'Beans, green' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup cooked', food: 'Bok choy/Chinese cabbage (Choi sum)' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup', food: 'Broccoli' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup, 4 sprouts', food: 'Brussels sprouts' },
  { fgid: 'vf', fgcat_id: 2, srvg_sz: '125 mL, ½ cup, 1 large', food: 'Carrots' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup', food: 'Chard' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '250 mL, 1 cup raw', food: 'Dandelion greens' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '250 mL, 1 cup', food: 'Endive' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup', food: 'Fiddleheads' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '250 mL, 1 cup raw', food: 'Kale/collards' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup, ½ leek', food: 'Leeks' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '250 mL, 1 cup raw', food: 'Lettuce, romaine' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '250 mL, 1 cup raw', food: 'Mesclun mix' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '250 mL, 1 cup raw', food: 'Mustard greens' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup', food: 'Okra' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup', food: 'Peas' },
  { fgid: 'vf', fgcat_id: 2, srvg_sz: '125 mL, ½ cup', food: 'Pumpkin' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup', food: 'Seaweed' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup', food: 'Snow peas' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '250 mL, 1 cup raw', food: 'Spinach' },
  { fgid: 'vf', fgcat_id: 2, srvg_sz: '125 mL, ½ cup', food: 'Squash' },
  { fgid: 'vf', fgcat_id: 2, srvg_sz: '125 mL, ½ cup', food: 'Sweet potato' },
  { fgid: 'vf', fgcat_id: 2, srvg_sz: '125 mL, ½ cup', food: 'Yam' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '3 fruits', food: 'Apricot, fresh' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Cantaloupe' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup, ½ fruit', food: 'Mango' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '1 fruit', food: 'Nectarine' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '½ fruit', food: 'Papaya' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '1 medium', food: 'Peach' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '1 medium', food: 'Apple' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '½ fruit', food: 'Avocado' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Bamboo shoots' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '1 medium', food: 'Banana' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Beans, yellow' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Beets' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Berries' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup, ½ pod', food: 'Bitter melon' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Cabbage' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup, 4 flowerets', food: 'Cauliflower' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '1 medium stalk', food: 'Celery' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Chayote' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '20', food: 'Cherries' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '1 ear, 125 mL, ½ cup', food: 'Corn' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Cucumber' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '60 mL, ¼ cup', food: 'Dried fruit' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Eggplant' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '2 medium', food: 'Fig, fresh' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '½ fruit', food: 'Grapefruit' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '20 fruits', food: 'Grapes' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup, 1 fruit', food: 'Guava' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Honeydew' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, 1/2 cup', food: '100% fruit juice' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '1 large fruit', food: 'Kiwi' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Kohlrabi' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '250 mL, 1 cup raw', food: 'Lettuce (example: iceberg or butterhead)' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '10 fruits', food: 'Lychee' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Mixed vegetables' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Mushrooms' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '1 medium', food: 'Orange' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '1 medium', food: 'Pear' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup, ½ medium', food: 'Peppers, bell' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup, 1 slice', food: 'Pineapple' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Plantain' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '1 fruit', food: 'Plum' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup, ½ medium', food: 'Potato' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Radishes' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Rhubarb' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Tomato' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Tomato sauce' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Turnip' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Vegetable juice, lower sodium' },
  { fgid: 'vf', fgcat_id: 0, srvg_sz: '125 mL, ½ cup', food: 'Watermelon' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup', food: 'Zucchini' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup, ½ medium', food: 'Pepper, sweet, green' },
  { fgid: 'vf', fgcat_id: 1, srvg_sz: '125 mL, ½ cup', food: 'Edemame (soy beans)' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '125 mL, ½ cup cooked', food: 'Barley' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '½ bagel, 45 g', food: 'Bagel, whole grain' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '1 slice, 35 g', food: 'Bread, pumpernickel or rye' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '1 slice, 35 g', food: 'Bread, whole grain' },
  { fgid: 'gr', fgcat_id: 1, srvg_sz: '125 mL, ½ cup cooked', food: 'Bulgur' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '30 g', food: 'Cereal, cold, whole grain' },
   { fgid: 'gr', fgcat_id: 3, srvg_sz: '150 g, 175 mL, ¾ cup cooked', food: 'Cereal, hot, whole grain (example: oatmeal)' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '30 g', food: 'Crackers, rye' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '½, 35 g', food: 'Muffin, whole grain' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '125 mL, ½ cup cooked', food: 'Quinoa' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '125 mL, ½ cup cooked', food: 'Rice, brown' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '125 mL, ½ cup cooked', food: 'Pasta/noodles, whole grain' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '½ pita, 35 g', food: 'Pita, whole wheat' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '½ piece, 35 g', food: 'Tortilla, corn' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '½ piece, 35 g', food: 'Tortilla, whole wheat' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '1 medium, 35 g', food: 'Bannock' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '1 slice, 35 g', food: 'Baguette, French' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '1 slice, 35 g', food: 'Bread, white' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '30 g', food: 'Cereal, cold' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '150 g, 175 mL, ¾ cup cooked', food: 'Cereal, hot, for example: cream of wheat' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '125 mL, ½ cup cooked', food: 'Congee' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '1 slice, 35 g', food: 'Cornbread' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '125 mL, ½ cup cooked', food: 'Couscous' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '10, 30 g', food: 'Cracker, saltines' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '½ muffin, 35 g', food: 'English muffin, white' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '¼ naan, 35 g', food: 'Naan' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '1 small, 35 g', food: 'Pancake' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '125 mL, ½ cup cooked', food: 'Pasta/noodles, white' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '½ pita, 35 g', food: 'Pita, white' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '125 mL, ½ cup cooked', food: 'Polenta' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '125 mL, ½ cup cooked', food: 'Rice, white' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '2 medium', food: 'Rice cake, plain' },
  { fgid: 'gr', fgcat_id: 4, srvg_sz: '1 roll, 35 g', food: 'Roll, white' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '30 g', food: 'Crackers, whole wheat' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '125 mL, ½ cup cooked', food: 'Rice, wild' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '1 roll, 35 g', food: 'Roll, whole wheat' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '125 mL, ½ cup - cooked', food: 'Couscous, whole wheat' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '500 mL, 2 cups', food: 'Popcorn, without added fat or salt' },
  { fgid: 'gr', fgcat_id: 3, srvg_sz: '½ muffin, 35 g', food: 'English muffin, whole grain' },
  { fgid: 'mi', fgcat_id: 6, srvg_sz: '250 mL, 1 cup', food: 'Buttermilk' },
  { fgid: 'mi', fgcat_id: 6, srvg_sz: '250 mL, 1 cup', food: 'Fortified soy beverage (unsweetened)' },
  { fgid: 'mi', fgcat_id: 5, srvg_sz: '250 mL, 1 cup', food: 'Milk, 1%, 2%, skim' },
  { fgid: 'mi', fgcat_id: 5, srvg_sz: '125 mL, ½ cup undiluted', food: 'Milk, evaporated, canned' },
  { fgid: 'mi', fgcat_id: 5, srvg_sz: '250 mL, 1 cup', food: 'Milk, goat, enriched' },
  { fgid: 'mi', fgcat_id: 5, srvg_sz: '250 mL, 1 cup', food: 'Milk, lactose reduced' },
  { fgid: 'mi', fgcat_id: 5, srvg_sz: '250 mL, 1 cup reconstitued', food: 'Milk, powdered' },
  { fgid: 'mi', fgcat_id: 5, srvg_sz: '25 g, 75 mL, 1/3 cup', food: 'Milk, powdered' },
  { fgid: 'mi', fgcat_id: 6, srvg_sz: '50 g, 1 ½ oz', food: 'Cheese, block (Cheddar, Mozzarella, Swiss, feta)' },
  { fgid: 'mi', fgcat_id: 6, srvg_sz: '250 ml, 1 cup', food: 'Cheese, cottage or quark' },
  { fgid: 'mi', fgcat_id: 6, srvg_sz: '50 g, 1 ½ oz', food: 'Cheese, goat' },
  { fgid: 'mi', fgcat_id: 6, srvg_sz: '50 g, 1 ½ oz', food: 'Paneer' },
  { fgid: 'mi', fgcat_id: 6, srvg_sz: '175 g, 175ml, ¾ cup', food: 'Yogurt, plain' },
  { fgid: 'mi', fgcat_id: 5, srvg_sz: '250 mL, 1 cup', food: 'Milk, whole' },
  { fgid: 'mi', fgcat_id: 6, srvg_sz: '175 g, 175 mL, ¾ cup', food: 'Kefir' },
  { fgid: 'me', fgcat_id: 7, srvg_sz: '175 mL, ¾ cup', food: 'Beans, cooked and canned' },
  { fgid: 'me', fgcat_id: 7, srvg_sz: '2', food: 'Eggs' },
  { fgid: 'me', fgcat_id: 7, srvg_sz: '175 mL, ¾ cup', food: 'Lentils' },
  { fgid: 'me', fgcat_id: 7, srvg_sz: '60 mL, ¼ cup', food: 'Nuts, shelled' },
  { fgid: 'me', fgcat_id: 7, srvg_sz: '30 mL, 2 Tbsp', food: 'Peanut butter or nut butters' },
  { fgid: 'me', fgcat_id: 7, srvg_sz: '60 mL, ¼ cup', food: 'Seeds, shelled' },
  { fgid: 'me', fgcat_id: 7, srvg_sz: '150 g, 175 mL, ¾ cup', food: 'Tofu' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Beef' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Bison/Buffalo' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Chicken' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Deli meat, low-fat, lower sodium' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Duck' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Fish and shellfish, canned (example: crab, salmon, tuna)' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Fish, fresh or frozen (example: herring, mackerel, trout, salmon, sardines, squid, tuna)' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Game birds (example: ptarmigan, partridge, grouse, goose)' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Game meats (example: deer, moose, caribou, elk)' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Goat' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Ham' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Lamb' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Organ meat (example: liver, kidney)' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Pork' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Rabbit /Hare' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Shellfish, fresh or frozen (example: clams, crab, lobster, mussels, scallops, shrimp, prawns)' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Turkey' },
  { fgid: 'me', fgcat_id: 8, srvg_sz: '75 g (2½ oz) / 125 mL (½ cup)', food: 'Veal' }
];

const servingsPerDay = [
  { fgid: 'vf', gender: 'Female', ages: '2 to 3', servings: '4' },
  { fgid: 'vf', gender: 'Male', ages: '2 to 3', servings: '4' },
  { fgid: 'vf', gender: 'Female', ages: '4 to 8', servings: '5' },
  { fgid: 'vf', gender: 'Male', ages: '4 to 8', servings: '5' },
  { fgid: 'vf', gender: 'Female', ages: '9 to 13', servings: '6' },
  { fgid: 'vf', gender: 'Male', ages: '9 to 13', servings: '6' },
  { fgid: 'vf', gender: 'Female', ages: '14 to 18', servings: '7' },
  { fgid: 'vf', gender: 'Male', ages: '14 to 18', servings: '8' },
  { fgid: 'vf', gender: 'Female', ages: '19 to 30', servings: '7 to 8' },
  { fgid: 'vf', gender: 'Male', ages: '19 to 30', servings: '8 to 10' },
  { fgid: 'vf', gender: 'Female', ages: '31 to 50', servings: '7 to 8' },
  { fgid: 'vf', gender: 'Male', ages: '31 to 50', servings: '8 to 10' },
  { fgid: 'vf', gender: 'Female', ages: '51 to 70', servings: '7' },
  { fgid: 'vf', gender: 'Male', ages: '51 to 70', servings: '7' },
  { fgid: 'vf', gender: 'Female', ages: '71+', servings: '7' },
  { fgid: 'vf', gender: 'Male', ages: '71+', servings: '7' },
  { fgid: 'gr', gender: 'Female', ages: '2 to 3', servings: '3' },
  { fgid: 'gr', gender: 'Male', ages: '2 to 3', servings: '3' },
  { fgid: 'gr', gender: 'Female', ages: '4 to 8', servings: '4' },
  { fgid: 'gr', gender: 'Male', ages: '4 to 8', servings: '4' },
  { fgid: 'gr', gender: 'Female', ages: '9 to 13', servings: '6' },
  { fgid: 'gr', gender: 'Male', ages: '9 to 13', servings: '6' },
  { fgid: 'gr', gender: 'Female', ages: '14 to 18', servings: '6' },
  { fgid: 'gr', gender: 'Male', ages: '14 to 18', servings: '7' },
  { fgid: 'gr', gender: 'Female', ages: '19 to 30', servings: '6 to 7' },
  { fgid: 'gr', gender: 'Male', ages: '19 to 30', servings: '8' },
  { fgid: 'gr', gender: 'Female', ages: '31 to 50', servings: '6 to 7' },
  { fgid: 'gr', gender: 'Male', ages: '31 to 50', servings: '8' },
  { fgid: 'gr', gender: 'Female', ages: '51 to 70', servings: '6' },
  { fgid: 'gr', gender: 'Male', ages: '51 to 70', servings: '7' },
  { fgid: 'gr', gender: 'Female', ages: '71+', servings: '6' },
  { fgid: 'gr', gender: 'Male', ages: '71+', servings: '7' },
  { fgid: 'mi', gender: 'Female', ages: '2 to 3', servings: '2' },
  { fgid: 'mi', gender: 'Male', ages: '2 to 3', servings: '2' },
  { fgid: 'mi', gender: 'Female', ages: '4 to 8', servings: '2' },
  { fgid: 'mi', gender: 'Male', ages: '4 to 8', servings: '2' },
  { fgid: 'mi', gender: 'Female', ages: '9 to 13', servings: '3 to 4' },
  { fgid: 'mi', gender: 'Male', ages: '9 to 13', servings: '3 to 4' },
  { fgid: 'mi', gender: 'Female', ages: '14 to 18', servings: '3 to 4' },
  { fgid: 'mi', gender: 'Male', ages: '14 to 18', servings: '3 to 4' },
  { fgid: 'mi', gender: 'Female', ages: '19 to 30', servings: '2' },
  { fgid: 'mi', gender: 'Male', ages: '19 to 30', servings: '2' },
  { fgid: 'mi', gender: 'Female', ages: '31 to 50', servings: '2' },
  { fgid: 'mi', gender: 'Male', ages: '31 to 50', servings: '2' },
  { fgid: 'mi', gender: 'Female', ages: '51 to 70', servings: '3' },
  { fgid: 'mi', gender: 'Male', ages: '51 to 70', servings: '3' },
  { fgid: 'mi', gender: 'Female', ages: '71+', servings: '3' },
  { fgid: 'mi', gender: 'Male', ages: '71+', servings: '3' },
  { fgid: 'me', gender: 'Female', ages: '2 to 3', servings: '1' },
  { fgid: 'me', gender: 'Male', ages: '2 to 3', servings: '1' },
  { fgid: 'me', gender: 'Female', ages: '4 to 8', servings: '1' },
  { fgid: 'me', gender: 'Male', ages: '4 to 8', servings: '1' },
  { fgid: 'me', gender: 'Female', ages: '9 to 13', servings: '1 to 2' },
  { fgid: 'me', gender: 'Male', ages: '9 to 13', servings: '1 to 2' },
  { fgid: 'me', gender: 'Female', ages: '14 to 18', servings: '2' },
  { fgid: 'me', gender: 'Male', ages: '14 to 18', servings: '3' },
  { fgid: 'me', gender: 'Female', ages: '19 to 30', servings: '2' },
  { fgid: 'me', gender: 'Male', ages: '19 to 30', servings: '3' },
  { fgid: 'me', gender: 'Female', ages: '31 to 50', servings: '2' },
  { fgid: 'me', gender: 'Male', ages: '31 to 50', servings: '3' },
  { fgid: 'me', gender: 'Female', ages: '51 to 70', servings: '2' },
  { fgid: 'me', gender: 'Male', ages: '51 to 70', servings: '3' },
  { fgid: 'me', gender: 'Female', ages: '71+', servings: '2' },
  { fgid: 'me', gender: 'Male', ages: '71+', servings: '3' }
];
const generateMenu = (age, gender) => {
  const ageGroup = getAgeGroup(age);
  let menu = [];

  foodGroups.forEach(fg => {
    const serving = servingsPerDay.find(s => s.fgid === fg.fgid && s.gender === gender && s.ages === ageGroup);
    if (!serving) return;

    const servingCount = parseInt(serving.servings.split(' to ')[0]);
    let foodItems = [];
    let darkGreenCount = 0;
    let orangeCount = 0;

    for (let i = 0; i < servingCount; i++) {
      const categoryFoods = foods.filter(f => f.fgid === fg.fgid);
      
      if (fg.fgid === 'vf') {
        if (darkGreenCount === 0) {
          const darkGreenFoods = categoryFoods.filter(f => f.fgcat_id === 1);
          foodItems.push(darkGreenFoods[Math.floor(Math.random() * darkGreenFoods.length)]);
          darkGreenCount++;
        } else if (orangeCount === 0) {
          const orangeFoods = categoryFoods.filter(f => f.fgcat_id === 2);
          foodItems.push(orangeFoods[Math.floor(Math.random() * orangeFoods.length)]);
          orangeCount++;
        } else {
          foodItems.push(categoryFoods[Math.floor(Math.random() * categoryFoods.length)]);
        }
      } else if (fg.fgid === 'gr') {
        const wholeGrainFoods = categoryFoods.filter(f => f.fgcat_id === 3);
        const nonWholeGrainFoods = categoryFoods.filter(f => f.fgcat_id === 4);
        if (i < Math.ceil(servingCount / 2)) {
          foodItems.push(wholeGrainFoods[Math.floor(Math.random() * wholeGrainFoods.length)]);
        } else {
          foodItems.push(nonWholeGrainFoods[Math.floor(Math.random() * nonWholeGrainFoods.length)]);
        }
      } else {
        foodItems.push(categoryFoods[Math.floor(Math.random() * categoryFoods.length)]);
      }
    }

    menu.push({
      group: fg.foodgroup,
      foods: foodItems.map(f => `${f.food} (${f.srvg_sz})`),
      servings: serving.servings
    });
  });

  return menu;
};

const getAgeGroup = (age) => {
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

const CanadaFoodGuideApp = () => {
  const [mode, setMode] = useState(null);
  const [individualForm, setIndividualForm] = useState({ age: '', gender: '', name: '' });
  const [familyMembers, setFamilyMembers] = useState([{ age: '', gender: '', name: '' }]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    setChartKey(prevKey => prevKey + 1);
  }, [menu]);

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setMenu([]);
  };

  const handleIndividualSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const generatedMenu = generateMenu(parseInt(individualForm.age), individualForm.gender);
      setMenu([{ name: individualForm.name, menu: generatedMenu }]);
      setLoading(false);
    }, 1000);
  };

  const handleFamilySubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const familyMenu = familyMembers.map(member => ({
        name: member.name,
        menu: generateMenu(parseInt(member.age), member.gender)
      }));
      setMenu(familyMenu);
      setLoading(false);
    }, 1500);
  };

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { age: '', gender: '', name: '' }]);
  };

  const removeFamilyMember = (index) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== index));
  };

  const handleDownloadPDF = () => {
  const doc = new jsPDF();
  
  doc.setFontSize(22);
  doc.setTextColor('#ff0000');
  doc.text("Your Personalized Menu", 105, 15, null, null, "center");
  
  doc.setFontSize(16);
  doc.setTextColor('#000000');
  let yPos = 30;
  
  menu.forEach((member, memberIndex) => {
    doc.setFontSize(18);
    doc.setTextColor('#ff6600');
    doc.text(`${member.name}'s Menu`, 20, yPos);
    yPos += 10;
    
    member.menu.forEach((item) => {
      doc.setFontSize(16);
      doc.setTextColor('#0066cc');
      doc.text(`${item.group} (${item.servings} servings)`, 20, yPos);
      yPos += 7;
      
      doc.setFontSize(14);
      doc.setTextColor('#000000');
      item.foods.forEach(food => {
        doc.text(`• ${food}`, 30, yPos);
        yPos += 7;
      });
      
      yPos += 5;
      
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
    });
    
    if (memberIndex < menu.length - 1) {
      doc.addPage();
      yPos = 20;
    }
  });

  doc.addPage();
  doc.setFontSize(18);
  doc.setTextColor('#ff0000');
  doc.text("Directional Statements", 105, 20, null, null, "center");
  yPos = 30;
  doc.setFontSize(14);
  doc.setTextColor('#000000');
  directionalStatements.forEach(statement => {
    doc.text(`• ${statement}`, 20, yPos);
    yPos += 10;
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
  });
  
  doc.save("personalized_menu.pdf");
};
const chartData = {
  labels: foodGroups.map(fg => fg.foodgroup),
  datasets: [
    {
      label: 'Female',
      data: servingsPerDay.filter(s => s.gender === 'Female' && s.ages === '19 to 30').map(s => parseInt(s.servings.split(' to ')[0])),
      backgroundColor: 'rgba(255, 99, 132, 0.6)', // تغییر به رنگ روشن‌تر
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2, // تغییر عرض حاشیه
      borderRadius: 5, // اضافه کردن شعاع برای گوشه‌های گرد
      hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)', // رنگ پس‌زمینه هنگام hover
      hoverBorderColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Male',
      data: servingsPerDay.filter(s => s.gender === 'Male' && s.ages === '19 to 30').map(s => parseInt(s.servings.split(' to ')[0])),
      backgroundColor: 'rgba(54, 162, 235, 0.6)', // تغییر به رنگ روشن‌تر
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2, // تغییر عرض حاشیه
      borderRadius: 5, // اضافه کردن شعاع برای گوشه‌های گرد
      hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)', // رنگ پس‌زمینه هنگام hover
      hoverBorderColor: 'rgb(54, 162, 235)',
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 20, // عرض جعبه در legend
        padding: 15, // فاصله بین آیتم‌های legend
        font: {
          size: 14, // اندازه فونت legend
          weight: 'bold', // ضخامت فونت legend
        },
      },
    },
    title: {
      display: true,
      text: 'Daily Serving Recommendations (Age 19-30)',
      font: {
        size: 18, // اندازه فونت عنوان
        weight: 'bold', // ضخامت فونت عنوان
      },
      padding: {
        bottom: 20, // فاصله زیر عنوان
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // رنگ پس‌زمینه tooltip
      titleColor: '#fff', // رنگ عنوان tooltip
      bodyColor: '#fff', // رنگ متن tooltip
      borderColor: 'rgba(255, 255, 255, 0.3)', // رنگ حاشیه tooltip
      borderWidth: 1, // عرض حاشیه tooltip
    },
  },
  scales: {
    x: {
      type: 'category',
      grid: {
        display: false, // عدم نمایش خطوط شبکه در محور X
      },
      ticks: {
        font: {
          size: 12, // اندازه فونت مقیاس محور X
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)', // رنگ خطوط شبکه محور Y
      },
      ticks: {
        font: {
          size: 12, // اندازه فونت مقیاس محور Y
        },
        stepSize: 1, // فاصله بین مقیاس‌ها
      },
    },
  },
  animations: {
    tension: {
      duration: 1000, // مدت زمان انیمیشن
      easing: 'easeOutBounce', // نوع انیمیشن
    },
  },
};

  return (
    <div className="min-h-screen bg-white py-6 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-4 py-6 bg-red-50 shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-red-600">Canada Food Guide App 🍁</h1>
        <div className="flex justify-center mb-6 space-x-4">
          <button 
            onClick={() => handleModeSelect('individual')} 
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${mode === 'individual' ? 'bg-red-600 shadow-lg' : 'bg-gray-300'}`}
          >
            Individual
          </button>
          <button 
            onClick={() => handleModeSelect('family')} 
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${mode === 'family' ? 'bg-red-600 shadow-lg' : 'bg-gray-300'}`}
          >
            Family
          </button>
        </div>

        {mode === 'individual' && (
          <motion.form 
            onSubmit={handleIndividualSubmit} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Individual Information</h2>
              <div className="flex flex-col mb-4">
                <label className="text-lg font-medium">Name</label>
                <input 
                  type="text" 
                  value={individualForm.name} 
                  onChange={(e) => setIndividualForm({ ...individualForm, name: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg shadow-sm"
                  required 
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-lg font-medium">Age</label>
                <input 
                  type="text" 
                  value={individualForm.age} 
                  onChange={(e) => setIndividualForm({ ...individualForm, age: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg shadow-sm"
                  required 
                />
              </div>
              <div className="flex flex-col mb-6">
                <label className="text-lg font-medium">Gender</label>
                <select 
                  value={individualForm.gender} 
                  onChange={(e) => setIndividualForm({ ...individualForm, gender: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg shadow-sm"
                  required 
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
              >
                Generate Menu
              </button>
            </div>
          </motion.form>
        )}

        {mode === 'family' && (
          <motion.form 
            onSubmit={handleFamilySubmit} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Family Information</h2>
              {familyMembers.map((member, index) => (
                <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Family Member {index + 1}</h3>
                  <div className="flex flex-col mb-4">
                    <label className="text-lg font-medium">Name</label>
                    <input 
                      type="text" 
                      value={member.name} 
                      onChange={(e) => {
                        const updatedMembers = [...familyMembers];
                        updatedMembers[index].name = e.target.value;
                        setFamilyMembers(updatedMembers);
                      }}
                      className="p-3 border border-gray-300 rounded-lg shadow-sm"
                      required 
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="text-lg font-medium">Age</label>
                    <input 
                      type="text" 
                      value={member.age} 
                      onChange={(e) => {
                        const updatedMembers = [...familyMembers];
                        updatedMembers[index].age = e.target.value;
                        setFamilyMembers(updatedMembers);
                      }}
                      className="p-3 border border-gray-300 rounded-lg shadow-sm"
                      required 
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="text-lg font-medium">Gender</label>
                    <select 
                      value={member.gender} 
                      onChange={(e) => {
                        const updatedMembers = [...familyMembers];
                        updatedMembers[index].gender = e.target.value;
                        setFamilyMembers(updatedMembers);
                      }}
                      className="p-3 border border-gray-300 rounded-lg shadow-sm"
                      required 
                    >
                      <option value="">Select Gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeFamilyMember(index)} 
                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors"
                  >
                    Remove Member
                  </button>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <button 
                  type="button" 
                  onClick={addFamilyMember} 
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
                >
                  Add Family Member
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
                >
                  Generate Menus
                </button>
              </div>
            </div>
          </motion.form>
        )}

        {loading && (
          <div className="text-center mt-6">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        )}

        {menu.length > 0 && !loading && (
          <div className="mt-6">
            <div className="flex justify-end mb-4">
              <button 
                onClick={handleDownloadPDF} 
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
              >
                <Download className="inline mr-2" /> Download PDF
              </button>
            </div>
          
          </div>
        )}
      </div>
    </div>
  );
};

export default CanadaFoodGuideApp;

