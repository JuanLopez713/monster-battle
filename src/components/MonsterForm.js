import React from 'react';
import { calculateAbilityCosts } from './utils/energyCalculations';
import { EmojiPicker } from './EmojiPicker';

export const MonsterForm = ({ formData, handleInputChange, handleSubmit, message }) => {
  const totalStats = () => {
    const health = parseInt(formData.health) || 0;
    const attack = parseInt(formData.attack) || 0;
    const defense = parseInt(formData.defense) || 0;
    const speed = parseInt(formData.speed) || 0;
    return health + attack + defense + speed;
  };

  const costs = calculateAbilityCosts(
    parseInt(formData.regularAbilityPower) || 0,
    parseInt(formData.specialAbilityPower) || 0
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Create Monster</h2>

      <div className="mb-4 p-3 bg-blue-50 rounded">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Stats:</span>
          <span className={`font-bold ${totalStats() === 255 ? 'text-green-600' : 'text-red-600'}`}>
            {totalStats()}/255
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Player Tag (3 letters)</label>
            <input
              type="text"
              name="playerTag"
              maxLength="3"
              value={formData.playerTag}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Monster Icon</label>
            <EmojiPicker
              selectedEmoji={formData.monsterIcon}
              onEmojiSelect={(emoji) => handleInputChange({
                target: { name: 'monsterIcon', value: emoji }
              })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Monster Name</label>
          <input
            type="text"
            name="monsterName"
            value={formData.monsterName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Type Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="FIRE">Fire</option>
            <option value="WATER">Water</option>
            <option value="EARTH">Earth</option>
            <option value="AIR">Air</option>
            <option value="LIGHT">Light</option>
            <option value="DARK">Dark</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Health</label>
            <input
              type="number"
              name="health"
              value={formData.health}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Attack</label>
            <input
              type="number"
              name="attack"
              value={formData.attack}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Defense</label>
            <input
              type="number"
              name="defense"
              value={formData.defense}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Speed</label>
            <input
              type="number"
              name="speed"
              value={formData.speed}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Regular Ability */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Regular Ability Name</label>
            <input
              type="text"
              name="regularAbilityName"
              value={formData.regularAbilityName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Regular Ability Power 
              {formData.regularAbilityPower && 
                <span className="text-gray-500 text-xs ml-2">
                  (Energy Cost: {costs.regularCost})
                </span>
              }
            </label>
            <input
              type="number"
              name="regularAbilityPower"
              value={formData.regularAbilityPower}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              min="0"
              max="120"
            />
          </div>
        </div>

        {/* Special Ability */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Special Ability Name</label>
            <input
              type="text"
              name="specialAbilityName"
              value={formData.specialAbilityName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Special Ability Power
              {formData.specialAbilityPower && 
                <span className="text-gray-500 text-xs ml-2">
                  (Energy Cost: {costs.specialCost})
                </span>
              }
            </label>
            <input
              type="number"
              name="specialAbilityPower"
              value={formData.specialAbilityPower}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              min="0"
              max="200"
            />
          </div>
        </div>

        {message && (
          <div className="p-3 bg-blue-50 text-blue-700 rounded">
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Monster
        </button>
      </form>
    </div>
  );
};