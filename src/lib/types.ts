import type { RefinementListProvided } from 'react-instantsearch-core';

export type DefaultHit = RefinementListProvided['items'][0];

export type RgbValue = [number, number, number];

export type ColorHit = DefaultHit & {
  rgb?: RgbValue;
  hex?: string;
  url?: string;
  parsed: boolean;
};

export type Distance = [ColorHit, ColorHit, number];

export type ColorCluster = {
  [key: string]: ColorHit[];
};

export enum Layout {
  Grid = 'Grid',
  List = 'List',
}

export type LayoutType = keyof typeof Layout;

export enum Shape {
  Circle = 'Circle',
  Square = 'Square',
}

export type ShapeType = keyof typeof Shape;
