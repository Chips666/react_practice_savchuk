import React from 'react';

export const CategoryFilter = ({
  categories,
  selectedCategories,
  onCategoryToggle,
  onClearCategories,
}) => (
  <div className="panel-block is-flex-wrap-wrap">
    <a
      href="#/"
      data-cy="AllCategories"
      className={`button mr-6 is-success ${selectedCategories.size === 0 ? '' : 'is-outlined'}`}
      onClick={e => {
        e.preventDefault();
        onClearCategories();
      }}
    >
      All
    </a>

    {categories.map(category => (
      <a
        key={category.id}
        data-cy="Category"
        className={`button mr-2 my-1 ${selectedCategories.has(category.id) ? 'is-info' : ''}`}
        href="#/"
        onClick={e => {
          e.preventDefault();
          onCategoryToggle(category.id);
        }}
      >
        {category.title}
      </a>
    ))}
  </div>
);
