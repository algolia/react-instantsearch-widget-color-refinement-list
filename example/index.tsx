import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import ReactDOM from 'react-dom';
import { InstantSearch, SearchBox, Hits, Panel } from 'react-instantsearch-dom';

import { ColorRefinementList } from '../src';

import { useDebugger, capitalize } from './utils';

import type { Hit } from 'react-instantsearch-core';

const searchClient = algoliasearch(
  'latency',
  'af044fb0788d6bb15f807e4420592bc5'
);

const App = () => {
  const { props } = useDebugger();

  return (
    <InstantSearch
      indexName="instantsearch-widget-color-refinement-list"
      searchClient={searchClient}
    >
      <main className="container">
        <Panel header="Colors" className="panel__filters">
          <ColorRefinementList
            attribute="color"
            sortByColor={props.sortByColor}
            layout={props.layout}
            shape={props.shape}
            limit={props.limit}
            showMore={props.showMore}
            showMoreLimit={props.showMoreLimit}
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
          <Hits />
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
