/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useMemo } from 'react';
import './App.scss';
import { FilterPanel } from '../components/filters/FilterPanel';
import { ProductsTable } from './components/table/ProductsTable';
import productsFromServer from './api/products';
import users from './api/users';
import categories from './api/categories';

export const App = () => {
  const enrichProducts = () => {
    return productsFromServer.map(product => {
      const category = categories.find(cat => cat.id === product.categoryId);
      const user = category ? users.find(u => u.id === category.ownerId) : null;

      return {
        ...product,
        category,
        user,
      };
    });
  };

  const products = useMemo(() => enrichProducts(), []);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter(product => {
      if (selectedUserId && product.user?.id !== selectedUserId) {
        return false;
      }

      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (
        selectedCategories.size > 0 &&
        !selectedCategories.has(product.categoryId)
      ) {
        return false;
      }

      return true;
    });

    if (sortConfig.key && sortConfig.direction) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'category') {
          aValue = a.category?.title || '';
          bValue = b.category?.title || '';
        } else if (sortConfig.key === 'user') {
          aValue = a.user?.name || '';
          bValue = b.user?.name || '';
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }

        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }

        return 0;
      });
    }

    return filtered;
  }, [products, selectedUserId, searchQuery, selectedCategories, sortConfig]);

  // Event handlers
  const handleUserSelect = userId => {
    setSelectedUserId(userId);
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleCategoryToggle = categoryId => {
    const newSelected = new Set(selectedCategories);

    if (newSelected.has(categoryId)) {
      newSelected.delete(categoryId);
    } else {
      newSelected.add(categoryId);
    }

    setSelectedCategories(newSelected);
  };

  const clearAllCategories = () => {
    setSelectedCategories(new Set());
  };

  const resetAllFilters = () => {
    setSelectedUserId(null);
    setSearchQuery('');
    setSelectedCategories(new Set());
    setSortConfig({ key: null, direction: null });
  };

  const handleSort = key => {
    setSortConfig(prevConfig => {
      if (prevConfig.key !== key) {
        return { key, direction: 'asc' };
      }

      if (prevConfig.direction === 'asc') {
        return { key, direction: 'desc' };
      }

      if (prevConfig.direction === 'desc') {
        return { key: null, direction: null };
      }

      return { key, direction: 'asc' };
    });
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <FilterPanel
          users={users}
          categories={categories}
          selectedUserId={selectedUserId}
          selectedCategories={selectedCategories}
          searchQuery={searchQuery}
          onUserSelect={handleUserSelect}
          onCategoryToggle={handleCategoryToggle}
          onClearCategories={clearAllCategories}
          onSearchChange={handleSearchChange}
          onClearSearch={clearSearch}
          onResetAll={resetAllFilters}
        />

        <div className="box table-container">
          <ProductsTable
            products={filteredAndSortedProducts}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>
      </div>
    </div>
  );
};
