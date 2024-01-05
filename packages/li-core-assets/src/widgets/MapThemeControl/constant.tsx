import React from 'react';

export const POPOVER_PLACEMENT = new Map<string | undefined, string>([
  ['topleft', 'right-start'],
  ['topright', 'left-start'],
  ['bottomleft', 'right-end'],
  ['bottomright', 'left-end'],
  [undefined, 'left-start'],
]);

export const ICON = () => {
  return (
    <svg width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <use href="#l7-icon-color" />
    </svg>
  );
};
