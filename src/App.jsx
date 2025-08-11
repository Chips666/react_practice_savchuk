/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

export const App = () => {
  return (
    <div className="app">
      <h1 className="title">React Practice</h1>
      <div className="content">
        <p>Users:</p>
        <ul>
          {usersFromServer.map(user => (
            <li key={user.id}>
              {user.name} <span className="emoji">👤</span>
            </li>
          ))}
        </ul>
        <p>Categories:</p>
        <ul>
          {categoriesFromServer.map(category => (
            <li key={category.id}>
              {category.title} <span className="emoji">📂</span>
            </li>
          ))}
        </ul>
        <p>Products:</p>
        <ul>
          {productsFromServer.map(product => (
            <li key={product.id}>
              {product.title} <span className="emoji">📦</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
