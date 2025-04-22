import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-6 relative">
      <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
      <input
        type="text"
        placeholder="Search for services or domains..."
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
        onChange={handleChange}
      />
    </div>
  );
}; 

SearchBar.displayName = 'SearchBar';