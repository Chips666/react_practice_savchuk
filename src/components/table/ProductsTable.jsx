import React from 'react';

export const ProductsTable = ({ products, sortConfig, onSort }) => {
  const getSortIcon = key => {
    if (sortConfig.key !== key) return 'fas fa-sort';
    if (sortConfig.direction === 'asc') return 'fas fa-sort-up';
    if (sortConfig.direction === 'desc') return 'fas fa-sort-down';

    return 'fas fa-sort';
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'user', label: 'User' },
  ];

  if (products.length === 0) {
    return (
      <p data-cy="NoMatchingMessage">No products matching selected criteria</p>
    );
  }

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.label}
                <a
                  href="#/"
                  onClick={e => {
                    e.preventDefault();
                    onSort(column.key);
                  }}
                >
                  <span className="icon">
                    <i data-cy="SortIcon" className={getSortIcon(column.key)} />
                  </span>
                </a>
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id} data-cy="Product">
            <td className="has-text-weight-bold" data-cy="ProductId">
              {product.id}
            </td>
            <td data-cy="ProductName">{product.name}</td>
            <td data-cy="ProductCategory">
              {product.category
                ? `${product.category.icon} - ${product.category.title}`
                : 'Unknown'}
            </td>
            <td
              data-cy="ProductUser"
              className={
                product.user?.sex === 'f' ? 'has-text-danger' : 'has-text-link'
              }
            >
              {product.user?.name || 'Unknown'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
