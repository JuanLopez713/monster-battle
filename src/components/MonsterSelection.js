// Components/MonsterSelection.js
import React from 'react';

export const MonsterSelection = ({ title, monsters, selectedMonsterId, onSelect, otherSelectedId }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="space-y-2">
      {monsters.map(monster => {
        const isSelected = selectedMonsterId === monster.id;
        const isUnavailable = otherSelectedId === monster.id;
        
        return (
          <div
            key={monster.id}
            onClick={() => {
              if (isSelected) {
                onSelect(null); // Deselect if clicking the selected monster
              } else if (!isUnavailable) {
                onSelect(monster);
              }
            }}
            className={`p-3 rounded ${
              isSelected 
                ? 'bg-blue-100 border-2 border-blue-500 cursor-pointer hover:bg-blue-200'
                : isUnavailable
                  ? 'bg-gray-200 cursor-not-allowed opacity-50'
                  : 'bg-gray-50 hover:bg-gray-100 cursor-pointer'
            }`}
          >
            <div className="font-bold flex items-center gap-2">
              <span className="text-xl">{monster.monsterIcon || '🦁'}</span>
              {monster.monsterName}
              {isUnavailable && <span className="text-sm text-red-500 ml-2">(Already Selected)</span>}
              {isSelected && <span className="text-sm text-blue-500 ml-2">(Click to Deselect)</span>}
            </div>
            <div className="text-sm">Player: {monster.playerTag}</div>
            <div className="text-sm mt-1 grid grid-cols-2 gap-2">
              <div>HP: {monster.stats.health}</div>
              <div>ATK: {monster.stats.attack}</div>
              <div>DEF: {monster.stats.defense}</div>
              <div>SPD: {monster.stats.speed}</div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// // Components/BattleControls.js
// export const BattleControls = ({ onStartBattle, canStart, isBattling }) => (
//   <div className="text-center mb-4">
//     <button
//       onClick={onStartBattle}
//       disabled={!canStart || isBattling}
//       className={`px-8 py-3 rounded-lg text-lg font-bold ${
//         !canStart || isBattling
//           ? 'bg-gray-400 cursor-not-allowed'
//           : 'bg-red-600 text-white hover:bg-red-700'
//       }`}
//     >
//       Start Battle!
//     </button>
//   </div>
// );
