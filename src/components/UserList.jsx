import React from 'react';
import UserCard from './UserCard';

function UserList({ users }) {
  if (users.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.login.uuid} user={user} />
      ))}
    </div>
  );
}

export default UserList;
