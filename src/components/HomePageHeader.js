import React from 'react';

export const Header = ({ onBattleClick }) => (
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-2">Monster Battle Arena</h1>
    <p className="text-gray-600">Create your monster and battle against others!</p>
    <button
      onClick={onBattleClick}
      className="mt-4 px-8 py-3 bg-red-600 text-white rounded-lg text-lg font-bold hover:bg-red-700 transform hover:scale-105 transition-all"
    >
      BATTLE!
    </button>
  </div>
);