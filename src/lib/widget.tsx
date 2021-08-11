import { connectRefinementList } from 'react-instantsearch-dom';

import { ColorRefinementListComponent } from './component';

import type { ColorHit, LayoutType, ShapeType } from './types';
import type { ElementType } from 'react';
import type { RefinementListExposed } from 'react-instantsearch-core';

export interface ColorRefinementListExposed extends RefinementListExposed {
  sortByColor?: boolean;
  layout?: LayoutType;
  showMore?: boolean;
  limit?: number;
  shape?: ShapeType;
  separator?: string;
  transformItems?: (items: ColorHit[]) => ColorHit[];
}

export const ColorRefinementList: ElementType<ColorRefinementListExposed> =
  connectRefinementList(ColorRefinementListComponent);
