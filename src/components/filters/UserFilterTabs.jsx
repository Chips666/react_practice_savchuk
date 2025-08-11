import React from 'react';

export const UserFilterTabs = ({ users, selectedUserId, onUserSelect }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      data-cy="FilterAllUsers"
      href="#/"
      className={selectedUserId === null ? 'is-active' : ''}
      onClick={e => {
        e.preventDefault();
        onUserSelect(null);
      }}
    >
      All
    </a>

    {users.map(user => (
      <a
        key={user.id}
        data-cy="FilterUser"
        href="#/"
        className={selectedUserId === user.id ? 'is-active' : ''}
        onClick={e => {
          e.preventDefault();
          onUserSelect(user.id);
        }}
      >
        {user.name}
      </a>
    ))}
  </p>
);
