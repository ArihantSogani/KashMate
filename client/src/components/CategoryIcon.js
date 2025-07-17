import React from 'react';
import { FaUtensils, FaBus, FaShoppingCart, FaHome, FaMoneyBillWave, FaHeartbeat, FaBook, FaBolt, FaQuestionCircle } from 'react-icons/fa';

const categoryMap = {
  food: FaUtensils,
  transport: FaBus,
  shopping: FaShoppingCart,
  housing: FaHome,
  salary: FaMoneyBillWave,
  health: FaHeartbeat,
  education: FaBook,
  utilities: FaBolt,
};

function CategoryIcon({ category, size = 24 }) {
  if (!category) return <FaQuestionCircle size={size} className="text-gray-400" />;
  const key = category.trim().toLowerCase();
  const Icon = categoryMap[key] || FaQuestionCircle;
  return <Icon size={size} className="text-primary" title={category} />;
}

export default CategoryIcon; 