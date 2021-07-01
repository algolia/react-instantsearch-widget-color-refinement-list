<p align="left">
  <a href="https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/">
    <img alt="InstantSearch.js" src="https://i.ibb.co/60fJjFy/Widget-banner-tmp.png">
  </a>
</p>

[InstantSearch.js widget](https://www.algolia.com/?utm_source=instantsearch.js&utm_campaign=repository) that filters the dataset based on **color facet values**.  
Equivalent of the offcial [RefinementList widget](https://www.algolia.com/doc/api-reference/widgets/refinement-list/react/) but displaying a **color indicator** instead of text facet values.

This helps the user **quickly visualize** the kind of **color** that you have **in your index**. This is a great widget to refine records within multiple shades of a single color (like **choosing the color of a jean** for example).

---

[![MIT](https://img.shields.io/npm/l/@algolia/react-instantsearch-widget-color-refinement-list)](./LICENSE) [![NPM version](https://img.shields.io/npm/v/@algolia/react-instantsearch-widget-color-refinement-list.svg)](https://npmjs.org/package/@algolia/react-instantsearch-widget-color-refinement-list)

## Summary

- [Demo](#demo)
- [Installation](#install)
- [Requirements](#requirements)
- [Usage](#usage)
- [Options](#options)
<!-- - [Compatibility](#compatibility)
- [About InstantSearch.js](#learn-more-about-instantsearchjs)
- [Contributors & Licence](#contributors--licence) -->

# Get started

## Demo

[Demo](https://codesandbox.io/s/github/algolia-samples/react-instantsearch-widget-color-refinement-list/tree/main/example?file=/index.ts) on CodeSandbox.

## Install

```bash
npm install @algolia/react-instantsearch-widget-color-refinement-list
# or
yarn add @algolia/react-instantsearch-widget-color-refinement-list
```

## Requirements

In your records, color attributes **should have a title and hexadecimal code** separated by a **semicolon `;`** for the widget to work.

Examples:

- `black;#000`
- `red;#ff0000`
- `yellow;#FFFF00`

**Note:** The hexadecimal code length can be **4 or 7 chars** (including the `#` symbol).

## Usage

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { InstantSearch, SearchBox, Hits, Panel } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import {
  ColorRefinementList,
  Layout,
  Shape,
} from '@algolia/react-instantsearch-widget-color-refinement-list';

const searchClient = algoliasearch('appId', 'apiKey');

ReactDOM.render(
  <InstantSearch indexName="indexName" searchClient={searchClient}>
    <ColorRefinementList
      attribute="color"
      sortByColor={true}
      layout={Layout.Grid}
      shape={Shape.Circle}
      limit={10}
      showMore={false}
      showMoreLimit={20}
      transformItems={(items) =>
        items.map((item) => ({
          ...item,
          label: item.label.toUpperCase(),
        }))
      }
    />
  </InstantSearch>,
  document.getElementById('root')
);
```

### Props

| Option | Type | Required | Default | Description |
| :-- | :-- | :-- | :-- | --- |
| [`attribute`](#attribute) | `string` | true | - | Name of the attribute that contains the color in the record. |
| [`sortByColor`](#sortByColor) | `boolean` | false | true | Sort facet values by color distance. |
| [`layout`](#layout) | `enum:Grid\|List` | false | 'Grid' | UI layout of the facet values. |
| [`shape`](#shape) | `enum:Circle\|Square` | false | 'Circle' | UI color shape. |
| [`limit`](#limit) | `number` | false | 10 | How many facet values to retrieve. |
| [`showMore`](#showMore) | `boolean` | false | false | Whether to display a button that expands the number of items. |
| [`showMoreLimit`](#showMoreLimit) | `number` | false | 20 | Maximum number of displayed items. Only used when `showMore` is set to `true`. |
| [`transformItems`](#transformItems) | `function` | false | undefined | Modifies the items being displayed, for example, to filter or sort them. It takes items as argument and expects them back in return. |

#### attribute

> `string` | **required**

Name of the attribute that contains the color in the record.

```tsx
<ColorRefinementList attribute="color" />
```

#### sortByColor

> `boolean`

Sort facet values by color distance.

```tsx
<ColorRefinementList sortByColor={true} />
```

#### layout

> `enum:'Grid'|'List'`

UI layout of the facet values.

```tsx
import {
  ColorRefinementList,
  Layout,
} from '@algolia/react-instantsearch-widget-color-refinement-list';

<ColorRefinementList layout={Layout.Grid} />;
```

#### shape

> `enum:'Circle'|'Square'`

UI color shape.

```tsx
import {
  ColorRefinementList,
  Shape,
} from '@algolia/react-instantsearch-widget-color-refinement-list';

<ColorRefinementList shape={Shape.Circle} />;
```

#### limit

> `number`

How many facet values to retrieve.

```tsx
<ColorRefinementList limit={10} />
```

#### showMore

> `boolean`

Whether to display a button that expands the number of items.

```tsx
<ColorRefinementList showMore={true} />
```

#### showMoreLimit

> `number`

Maximum number of displayed items. Only used when `showMore` is set to `true`.

```tsx
<ColorRefinementList showMoreLimit={20} />
```

#### transformItems

> `function`

Modifies the items being displayed, for example, to filter or sort them. It takes items as argument and expects them back in return.

```tsx
<ColorRefinementList
  transformItems={(items) =>
    items.map((item) => ({
      ...item,
      label: item.label.toUpperCase(),
    }))
  }
/>
```
