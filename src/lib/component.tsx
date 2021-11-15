import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type { RefinementListProvided } from 'react-instantsearch-core';
import { translatable } from 'react-instantsearch-core';
import { createClassNames } from 'react-instantsearch-dom';

import { Layout, Shape } from './types';
import type { ColorHit } from './types';
import {
  getContrastColor,
  parseItems,
  sortByColors,
  sortByLabel,
} from './utils';
import type { ColorRefinementListExposed } from './widget';

export type ColorRefinementListProps = ColorRefinementListExposed &
  RefinementListProvided & {
    translate: (key: string, ...params: any) => string;
  };

const cx = (...args: string[]) =>
  classNames(createClassNames('ColorRefinementList')(...args));

const RefinedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
);

export const ColorRefinementList = ({
  items,
  refine,
  sortByColor = true,
  layout = Layout.Grid,
  shape = Shape.Circle,
  pinRefined = false,
  limit = 10,
  showMore = false,
  showMoreLimit = 20,
  separator = ';',
  className,
  translate,
  searchable,
}: ColorRefinementListProps) => {
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

  if (!expanded) {
    if (pinRefined) {
      // If not expanded, concat refined items with not refined ones to reach the limit
      // Refined items are pinned at the top and never gets sliced
      resultItems = refinedItems.concat(
        notRefinedItems.slice(0, Math.max(0, limit - refinedItemsLength))
      );
    } else {
      // Slice result items to the limit
      resultItems = resultItems.slice(0, limit);
    }
  } else {
    // If expanded, limit items to show more limit
    resultItems = resultItems.slice(0, showMoreLimit);
  }

  // Render an item
  const renderItem = (item: ColorHit) => {
    if (!item.hex && !item.url) return undefined;

    const colorCn = [cx('color')];
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
        className={cx('item', item.isRefined ? 'itemRefined' : '')}
        role="menuitemcheckbox"
        aria-checked={item.isRefined}
        aria-label={translate('refineOn', item.label)}
        onClick={(event) => {
          event.preventDefault();
          refine(item.value);
        }}
      >
        <div className={colorCn.join(' ')} style={colorStyles}>
          <div
            className={cx('refinedIcon')}
            style={
              {
                '--contrast-color': item.rgb
                  ? getContrastColor(item.rgb)
                  : undefined,
              } as CSSProperties
            }
          >
            <RefinedIcon />
          </div>
        </div>
        <div className={cx('label')}>{item.label}</div>
        <div className={classNames(cx('count'), 'ais-RefinementList-count')}>
          {item.count.toLocaleString()}
        </div>
      </button>
    );
  };

  // Render component
  return (
    <div
      className={classNames(
        cx('', `layout${layout}`, `shape${shape}`),
        className
      )}
    >
      <div
        className={cx('items')}
        role="group"
        aria-label={translate('colors', refinedItemsLength)}
      >
        {resultItems.map(renderItem)}
      </div>
      {showMore && items.length > limit && (
        <button
          type="button"
          className="ais-RefinementList-showMore"
          onClick={() => setExpanded(!expanded)}
        >
          {translate('showMore', expanded)}
        </button>
      )}
    </div>
  );
};

const translations = {
  refineOn: (value: string) => `Refine on ${value}`,
  colors: (refinedCount: number) =>
    `Colors${refinedCount ? `, ${refinedCount} selected` : ''}`,
  showMore: (expanded: boolean): string =>
    expanded ? 'Show less' : 'Show more',
};

export type TranslationsType = Partial<typeof translations>;

export const ColorRefinementListComponent =
  translatable(translations)(ColorRefinementList);
