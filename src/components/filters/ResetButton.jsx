import React from 'react';

export const ResetButton = ({ onReset }) => (
  <div className="panel-block">
    <a
      data-cy="ResetAllButton"
      href="#/"
      className="button is-link is-outlined is-fullwidth"
      onClick={e => {
        e.preventDefault();
        onReset();
      }}
    >
      Reset all filters
    </a>
  </div>
);
