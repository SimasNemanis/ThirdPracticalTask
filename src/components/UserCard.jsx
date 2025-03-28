import React from 'react';

// React.memo ensures that UserCard only re-renders when props change
const UserCard = React.memo(({ user }) => {
  return (
    <div>
      <h3>{`${user.name.first} ${user.name.last}`}</h3>
      <p>Email: {user.email}</p>
      <p>City: {user.location.city}</p>
    </div>
  );
});

export default UserCard;
