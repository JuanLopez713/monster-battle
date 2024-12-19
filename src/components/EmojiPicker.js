import React, { useState } from 'react';

const commonEmojis = [
  '🦁', '🐯', '🐉', '🐲', '🦕', '🦖', '🐊', '🐅', '🐆', '🦂', '🦎',
  '🐍', '🦅', '🦇', '🦋', '🐢', '🐙', '🦑', '🦀', '🐋', '🦈', '🐬',
  '🐜', '🕷️', '🦂', '🦗', '🦟', '🐌', '🐛', '🦋', '🐞'
];

export const EmojiPicker = ({ selectedEmoji, onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 text-2xl border rounded-lg hover:bg-gray-100 flex items-center justify-center"
      >
        {selectedEmoji}
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg p-2 grid grid-cols-6 gap-1 w-64">
          {commonEmojis.map((emoji, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onEmojiSelect(emoji);
                setIsOpen(false);
              }}
              className="w-10 h-10 text-xl hover:bg-gray-100 rounded flex items-center justify-center"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 