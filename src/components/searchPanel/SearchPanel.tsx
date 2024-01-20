'use client';

import { Drug } from '@/types/drug';
import { searchClient } from '@/utils/algoliaConfig';
import { SourceTemplates, getAlgoliaResults } from '@algolia/autocomplete-js';
import { useRouter } from 'next/navigation';
import { Autocomplete } from '../common/autocomplete/Autocomplete';

export default function SearchPanel() {
  const router = useRouter();

  const selectAutocompleteItem = (drugId: string) => {
    router.push(`/atc/${drugId}`);
  };

  const renderAutocompleteItem: SourceTemplates<Drug>['item'] = ({
    item,
    components,
  }) => {
    return (
      <button
        className="aa-ItemLink h-full text-start"
        type="button"
        aria-label="Select"
        onClick={() => selectAutocompleteItem(item.id)}
      >
        <div className="aa-ItemContent">
          <div className="aa-ItemContentBody">
            <div className="max-w-full">
              <components.Highlight hit={item} attribute="label" />
            </div>
            <div className="aa-ItemContentDescription">
              <components.Highlight hit={item} attribute="note" />
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <Autocomplete<Drug>
      placeholder="Search ATC Drug Groups"
      classNames={{
        form: 'rounded-lg border-slate-500 focus-within:ring-1 focus-within:ring-slate-900/30',
        detachedSearchButtonPlaceholder: 'text-xl',
        detachedSearchButtonIcon: 'text-slate-600',
        submitButton: 'text-slate-100',
        item: 'p-0',
      }}
      navigator={{
        navigate({ item }) {
          selectAutocompleteItem(item.id);
        },
      }}
      getSources={({ query }) => {
        return [
          {
            sourceId: 'atc',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'atc',
                    query,
                    params: {
                      hitsPerPage: 8,
                    },
                  },
                ],
              });
            },
            getItemUrl({ item }) {
              return `/atc/${item.id}`;
            },
            templates: {
              item: renderAutocompleteItem,
            },
          },
        ];
      }}
    />
  );
}
