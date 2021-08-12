import type { ComponentType } from 'react';
import type { RefinementListExposed } from 'react-instantsearch-core';
import { connectRefinementList } from 'react-instantsearch-dom';

import type { TranslationsType } from './component';
import { ColorRefinementListComponent } from './component';
import type { ColorHit, LayoutType, ShapeType } from './types';

export interface ColorRefinementListExposed extends RefinementListExposed {
  sortByColor?: boolean;
  layout?: LayoutType;
  shape?: ShapeType;
  pinRefined?: boolean;
  separator?: string;
  className?: string;
  transformItems?: (items: ColorHit[]) => ColorHit[];
  translations?: TranslationsType;
}

export const ColorRefinementList: ComponentType<ColorRefinementListExposed> =
  connectRefinementList(ColorRefinementListComponent);
