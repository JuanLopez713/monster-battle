
// Components/BackButton.js
export const BackButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
    >
      ← Back to Home
    </button>
  );