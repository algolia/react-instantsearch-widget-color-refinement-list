import { render } from '@testing-library/react';
import React from 'react';
import { Hits, InstantSearch } from 'react-instantsearch-dom';

import { ColorRefinementList } from '../widget';

const runAllMicroTasks = (): Promise<void> => new Promise(setImmediate);

describe('nothing', () => {
  it('tests nothing', async () => {
    const searchClient = {
      search(_requests: any[]) {
        return Promise.resolve({
          results: [
            {
              hits: [
                {
                  objectID: 'a',
                  name: 'test',
                },
              ],
            },
          ],
        });
      },
    };

    const { debug } = render(
      <InstantSearch indexName="test_index" searchClient={searchClient}>
        <ColorRefinementList attribute="color" />
        <Hits hitComponent={({ hit }: { hit: any }) => hit.name} />
      </InstantSearch>
    );

    await runAllMicroTasks();
    debug();
  });
});
