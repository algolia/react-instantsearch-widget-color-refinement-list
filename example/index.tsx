import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import ReactDOM from 'react-dom';
import type { Hit } from 'react-instantsearch-core';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Panel,
  Pagination,
} from 'react-instantsearch-dom';

import { ColorRefinementList } from '../src';

import { useDebugger, capitalize } from './utils';

import '../src/style.scss';
import './index.scss';

const searchClient = algoliasearch(
  '8L3BNIKU8L',
  '8ae67fc912ae72265d56b1e9246ca67a'
);

const HitComponent = ({ hit }: { hit: Hit }) => {
  return (
    <>
      <img src={hit.image_link} alt={hit.name} />
      <div>{hit.name}</div>
    </>
  );
};

const App = () => {
  const { props } = useDebugger();

  return (
    <InstantSearch indexName="gstar_demo" searchClient={searchClient}>
      <main className="container">
        <Panel header="Colors" className="panel__filters">
          <ColorRefinementList
            attribute="hexColorCode"
            sortByColor={props.sortByColor}
            layout={props.layout}
            shape={props.shape}
            limit={props.limit}
            showMore={props.showMore}
            showMoreLimit={props.showMoreLimit}
            separator={props.separator}
            translations={{
              refineOn: (value: string) => `Refine on ${value}`,
              colors: (refinedCount: number) =>
                `Colors${refinedCount ? `, ${refinedCount} selected` : ''}`,
              showMore: (expanded: boolean) =>
                expanded ? 'Show less' : 'Show more',
            }}
            transformItems={(items) =>
              items.map((item) => ({
                ...item,
                label: capitalize(item.label),
              }))
            }
          />
        </Panel>

        <Panel className="panel__results">
          <SearchBox />
          <Hits hitComponent={HitComponent} />
          <Pagination />
        </Panel>
      </main>
    </InstantSearch>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
