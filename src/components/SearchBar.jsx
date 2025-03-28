import React from 'react';

function SearchBar({ searchQuery, onSearchQueryChange, selectedFilter, setSelectedFilter }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="city">City</option>
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={onSearchQueryChange}
          placeholder="Search"
        />
      </div>
    </div>
  );
}

export default SearchBar;
