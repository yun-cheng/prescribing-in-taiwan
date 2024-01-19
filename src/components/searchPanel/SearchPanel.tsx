'use client';

import { selectedDrugIdAtom } from '@/atoms/sideBar';
import { searchClient } from '@/utils/algoliaConfig';
import { SourceTemplates, getAlgoliaResults } from '@algolia/autocomplete-js';
import { useSetAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { Autocomplete } from '../common/autocomplete/Autocomplete';

export default function SearchPanel() {
  const router = useRouter();
  const pathname = usePathname();

  const setDrugId = useSetAtom(selectedDrugIdAtom);

  const selectResultItem = (drugId: string) => {
    if (pathname.startsWith('/atc/')) {
      setDrugId(drugId);

      const newUrl = `/atc/${drugId}`;
      window.history.replaceState(
        { ...window.history.state, as: newUrl, url: newUrl },
        '',
        newUrl,
      );
    } else {
      router.push(`/atc/${drugId}`);
    }
  };

  const renderResultItem: SourceTemplates<any>['item'] = ({
    item,
    components,
  }) => {
    return (
      <div className="aa-ItemWrapper">
        <button
          className="aa-ItemLink text-start"
          type="button"
          aria-label="Select"
          onClick={() => selectResultItem(item.id)}
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
      </div>
    );
  };

  return (
    <Autocomplete
      placeholder="Search ATC Drug Groups"
      classNames={{
        form: '!rounded-lg !border-slate-500 focus-within:!ring-1 focus-within:!ring-slate-900/30',
        detachedSearchButtonPlaceholder: 'text-xl',
        detachedSearchButtonIcon: '!text-slate-600',
        submitButton: '!text-slate-100',
      }}
      navigator={{
        navigate({ item }) {
          selectResultItem(item.id);
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
              item: renderResultItem,
            },
          },
        ];
      }}
    />
  );
}
