// utils/energyCalculations.js

export const calculateEnergyCost = (power, type) => {
    if (type === 'regular') {
      return Math.floor(10 + (power / 120) * 40);
    }
    return Math.max(40, Math.floor((power / 200) * 90));
  };
  
  // Helper function if we need to calculate both costs at once
  export const calculateAbilityCosts = (regularPower, specialPower) => {
    return {
      regularCost: calculateEnergyCost(regularPower, 'regular'),
      specialCost: calculateEnergyCost(specialPower, 'special')
    };
  };