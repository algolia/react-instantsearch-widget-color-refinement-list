import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import ReactDOM from 'react-dom';
import { InstantSearch, SearchBox, Hits, Panel } from 'react-instantsearch-dom';

import { ColorRefinementList } from '../src';

import { useDebugger, capitalize } from './utils';

const searchClient = algoliasearch(
  'E8KS2J9PMC',
  '9a2480ff719c1092d2ef9ad3c6d36cf1'
);

const App = () => {
  const { props } = useDebugger();

  return (
    <InstantSearch indexName="colors" searchClient={searchClient}>
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
