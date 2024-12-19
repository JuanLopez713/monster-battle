import React from 'react';

export const MonsterUIList = ({ monsters }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-bold mb-4">Available Monsters</h2>
    <div className="space-y-4">
      {monsters?.map(monster => (
        <div key={monster?.id || Math.random()} className="p-4 bg-gray-50 rounded">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="text-xl">{monster?.monsterIcon || '🦁'}</span>
              <h3 className="font-bold">{monster?.monsterName || 'Unnamed Monster'}</h3>
            </div>
            <span className="px-2 py-1 bg-gray-200 rounded text-sm">{monster?.type || 'Unknown'}</span>
            <div className="mt-1 text-sm text-green-600 font-bold">
              Wins: {monster?.wins || 0}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div>HP: {monster?.stats?.health || 0}</div>
            <div>ATK: {monster?.stats?.attack || 0}</div>
            <div>DEF: {monster?.stats?.defense || 0}</div>
            <div>SPD: {monster?.stats?.speed || 0}</div>
          </div>
          <div className="mt-2 text-sm">
            <div>
              Regular: {monster?.abilities?.regular?.name || 'None'} 
              ({monster?.abilities?.regular?.power || 0} PWR, {monster?.abilities?.regular?.energyCost || 0} Energy)
            </div>
            <div>
              Special: {monster?.abilities?.special?.name || 'None'} 
              ({monster?.abilities?.special?.power || 0} PWR, {monster?.abilities?.special?.energyCost || 0} Energy)
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);