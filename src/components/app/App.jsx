/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import './App.scss';

 import usersFromServer from './api/users';
 import categoriesFromServer from './api/categories';
 import productsFromServer from './api/products.js';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

export const App = () => {
  return (
     <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>;
);
