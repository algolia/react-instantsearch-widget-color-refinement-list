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
  'latency',
  'a4a3ef0b25a75b6df040f4d963c6e655'
);

const HitComponent = ({ hit }: { hit: Hit }) => {
  return (
    <>
      <img src={hit.image_urls[0]} alt={hit.name} />
      <div>{hit.name}</div>
    </>
  );
};

const App = () => {
  const { props } = useDebugger();

  return (
    <InstantSearch
      indexName="STAGING_pwa_ecom_ui_template_products"
      searchClient={searchClient}
    >
      <main className="container">
        <Panel header="Colors" className="panel__filters">
          <ColorRefinementList
            {...props}
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
