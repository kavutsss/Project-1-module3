import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full px-6 py-4 text-lg rounded-xl shadow-sm transition-colors focus:outline-none focus:shadow-md bg-white focus:ring-1 focus:ring-green-500 focus:border-green-500 border border-gray-300"
      />
    </div>
  );
}

export default SearchBar;
