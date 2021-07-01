import React, { useState } from 'react';

import { Layout, Shape } from './types';
import {
  getContrastColor,
  parseItems,
  sortByColors,
  sortByLabel,
} from './utils';

import type { ColorHit } from './types';
import type { ColorRefinementListExposed } from './widget';
import type { CSSProperties } from 'react';
import type { RefinementListProvided } from 'react-instantsearch-core';

export const ColorRefinementListComponent = ({
  items,
  refine,
  sortByColor = true,
  layout = Layout.Grid,
  shape = Shape.Circle,
  limit = 10,
  showMore = false,
  showMoreLimit = 20,
  transformItems,
  searchable,
}: RefinementListProvided & ColorRefinementListExposed) => {
  if (typeof searchable !== 'undefined') {
    // eslint-disable-next-line no-console
    console.warn(`'searchable' props is not supported yet`);
  }

  // Local state
  const [expanded, setExpanded] = useState(!showMore);

  let resultItems = items as ColorHit[];

  // Parse items color label to RGB/Hex
  resultItems = parseItems(resultItems);

  // Sort items by label and colors
  if (resultItems.length > 1 && sortByColor) {
    resultItems = sortByLabel(resultItems);
    resultItems = sortByColors(resultItems);
  }

  // If not expanded, take refined items if above the limit
  // Otherwise, slice result items to limit
  const refinedItems = resultItems.filter((hit) => hit.isRefined);
  const notRefinedItems = resultItems.filter((hit) => !hit.isRefined);
  const refinedItemsLength = refinedItems.length;

  if (!expanded) {
    if (refinedItemsLength !== 0) resultItems = refinedItems;
    if (limit > refinedItemsLength) {
      resultItems = resultItems.concat(
        notRefinedItems.slice(0, limit - refinedItemsLength)
      );
    }
    if (refinedItemsLength < limit) resultItems = resultItems.slice(0, limit);
  } else {
    // If expanded, limit items to show more limit
    resultItems = resultItems.slice(0, showMoreLimit);
  }

  // Transform items if transformItems props function exists
  const transformedItems =
    typeof transformItems === 'function'
      ? transformItems(resultItems)
      : resultItems;

  // Render an item
  const renderItem = (item: ColorHit) => {
    return (
      <button
        type="button"
        key={item.label}
        className={`ais-ColorRefinementList-Item ${
          item.isRefined ? 'refined' : ''
        }`}
        role="menuitemcheckbox"
        aria-checked={item.isRefined}
        aria-label="Refine on"
        onClick={(event) => {
          event.preventDefault();
          refine(item.value);
        }}
      >
        <div
          className={`ais-ColorRefinementList-Color 
              color--${item.hex.toLowerCase().substring(1)}`}
          style={{ backgroundColor: item.hex }}
        >
          <div
            className="ais-ColorRefinementList-RefinedIcon"
            style={
              {
                '--contrast-color': getContrastColor(item.rgb),
              } as CSSProperties
            }
          ></div>
        </div>
        <div className="ais-ColorRefinementList-Label">{item.label}</div>
        <div className="ais-ColorRefinementList-Count">({item.count})</div>
      </button>
    );
  };

  // Render component
  return (
    <div
      className={`ais-ColorRefinementList 
      ais-ColorRefinementList-Layout--${layout} 
      ais-ColorRefinementList-Shape--${shape}`}
    >
      <div
        className="ais-ColorRefinementList-Items"
        role="group"
        aria-label={`Colors${
          refinedItemsLength ? `, ${refinedItemsLength} selected` : ''
        }`}
      >
        {transformedItems.map(renderItem)}
      </div>
      {showMore && items.length > limit && (
        <button
          type="button"
          className="ais-RefinementList-showMore"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};
