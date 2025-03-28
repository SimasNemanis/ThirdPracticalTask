import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);  // To store user data fetched from the API
  const [searchQuery, setSearchQuery] = useState('');  // To track the search query entered by the user
  const [loading, setLoading] = useState(true);  // To track whether the user data is being fetched
  const [searchResults, setSearchResults] = useState([]);  // To store the filtered search results
  const [selectedFilter, setSelectedFilter] = useState('name');  // To track the selected filter (name, city, or email)

  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        // Fetching data from the randomuser.me API (100 users)
        const response = await axios.get('https://randomuser.me/api/?results=100');
        setUsers(response.data.results);  // Storing the fetched users in state
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching users:', error);  
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []); 

  // useMemo to memoize the filtered users based on the search query and selected filter
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const field = `${user.name.first} ${user.name.last}`.toLowerCase(); 
      if (selectedFilter === 'name') {
        return field.includes(searchQuery.toLowerCase()); 
      } else if (selectedFilter === 'city') {
        return user.location.city.toLowerCase().includes(searchQuery.toLowerCase());  
      } else if (selectedFilter === 'email') {
        return user.email.toLowerCase().includes(searchQuery.toLowerCase()); 
      }
      return false;  
    });
  }, [users, searchQuery, selectedFilter]);  // Re-run the memoization when users, searchQuery, or selectedFilter change

  // handleSearch function to update search results when the search button is clicked
  const handleSearch = useCallback(() => {
    setSearchResults(filteredUsers); 
  }, [filteredUsers]);  

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value); 
  };

  // clearSearch function to clear the search query and search results
  const clearSearch = () => {
    setSearchQuery(''); 
    setSearchResults([]); 
  };

  return (
    <div>
      <h1>User Search</h1>
      <SearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
        selectedFilter={selectedFilter} 
        setSelectedFilter={setSelectedFilter}  
      />
      
      {/* Buttons for search and clear */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
        <button onClick={handleSearch}>Search</button> 
        <button onClick={clearSearch}>Clear</button>  
      </div>

      {/* Loading state */}
      {loading ? (
        <div>Loading users...</div> 
      ) : (
        <>
          {/* Display message if no search results are found */}
          {searchResults.length === 0 ? (
            <div>No results found</div>
          ) : (
            <UserList users={searchResults} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
