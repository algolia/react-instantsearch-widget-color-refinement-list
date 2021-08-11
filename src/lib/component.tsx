import React, { useMemo, useState } from 'react';

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
  separator = ';',
  transformItems,
  searchable,
}: RefinementListProvided & ColorRefinementListExposed) => {
  if (typeof searchable !== 'undefined') {
    // eslint-disable-next-line no-console
    console.warn(
      `[ColorRefinementList] 'searchable' props is not supported yet.`
    );
  }

  // Local state
  const [expanded, setExpanded] = useState(!showMore);

  let resultItems = items as ColorHit[];

  // Parse items color label to RGB/Hex
  resultItems = useMemo(
    () => parseItems(resultItems, separator),
    [resultItems, separator]
  );

  // Sort items by label
  resultItems = useMemo(() => sortByLabel(resultItems), [resultItems]);

  // Sort items by colors
  const resultItemsSortedByColors = useMemo(
    () => sortByColors(resultItems),
    [resultItems]
  );
  if (resultItems.length > 1 && sortByColor) {
    resultItems = resultItemsSortedByColors;
  }

  // Filter result items
  const refinedItems = resultItems.filter((hit) => hit.isRefined);
  const notRefinedItems = resultItems.filter((hit) => !hit.isRefined);
  const refinedItemsLength = refinedItems.length;

  // If not expanded
  if (!expanded) {
    // Get refined items
    resultItems = refinedItems;

    // If we don't have enough refined items to reach the limit
    if (limit > refinedItemsLength) {
      // Concat refined items with not refined ones until we reach the limit
      resultItems = resultItems.concat(
        notRefinedItems.slice(0, limit - refinedItemsLength)
      );
      // Slice result items to the limit
      resultItems = resultItems.slice(0, limit);
    }
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
    if (!item.hex && !item.url) return undefined;

    const colorCn = ['ais-ColorRefinementList-Color'];
    if (item.hex) {
      colorCn.push(`color--${item.hex.toLowerCase().substring(1)}`);
    }

    const colorStyles: CSSProperties = {};
    if (item.hex) {
      colorStyles.backgroundColor = item.hex;
    }
    if (item.url) {
      colorStyles.backgroundImage = `url(${item.url})`;
    }

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
        <div className={colorCn.join(' ')} style={colorStyles}>
          <div
            className="ais-ColorRefinementList-RefinedIcon"
            style={
              {
                '--contrast-color': item.rgb
                  ? getContrastColor(item.rgb)
                  : undefined,
              } as CSSProperties
            }
          />
        </div>
        <div className="ais-ColorRefinementList-Label">{item.label}</div>
        <div className="ais-RefinementList-count ais-ColorRefinementList-Count">
          {item.count}
        </div>
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
