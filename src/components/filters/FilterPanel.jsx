import React from 'react';
import { UserFilterTabs } from './UserFilterTabs';
import { SearchInput } from './SearchInput';
import { CategoryFilter } from './CategoryFilter';
import { ResetButton } from './ResetButon';

export const FilterPanel = ({
  users,
  categories,
  selectedUserId,
  selectedCategories,
  searchQuery,
  onUserSelect,
  onCategoryToggle,
  onClearCategories,
  onSearchChange,
  onClearSearch,
  onResetAll,
}) => (
  <div className="block">
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <UserFilterTabs
        users={users}
        selectedUserId={selectedUserId}
        onUserSelect={onUserSelect}
      />

      <SearchInput
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onClearSearch={onClearSearch}
      />

      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryToggle={onCategoryToggle}
        onClearCategories={onClearCategories}
      />

      <ResetButton onReset={onResetAll} />
    </nav>
  </div>
);
