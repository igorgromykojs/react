import React from 'react';

interface SearchPanelProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchClick: () => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
  searchTerm,
  onSearchChange,
  onSearchClick,
}) => {
  return (
    <div className="search-panel">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button type="button" onClick={onSearchClick}>
        Search
      </button>
    </div>
  );
};

export default SearchPanel;
