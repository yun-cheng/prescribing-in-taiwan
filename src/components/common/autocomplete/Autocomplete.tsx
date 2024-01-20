import { searchPanelOpenAtom } from '@/atoms/search';
import {
  autocomplete,
  AutocompleteApi,
  AutocompleteOptions,
} from '@algolia/autocomplete-js';
import '@algolia/autocomplete-theme-classic';
import { useAtom } from 'jotai';
import { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';

type BaseItem = Record<string, unknown>;

type Props<TItem extends BaseItem> = Omit<
  AutocompleteOptions<TItem>,
  'container' | 'renderer' | 'render'
>;

export function Autocomplete<TItem extends BaseItem>(props: Props<TItem>) {
  const [searchPanelOpen, toggleSearchPanel] = useAtom(searchPanelOpenAtom);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRootRef = useRef<Root | null>(null);
  const rootRef = useRef<Element | null>(null);
  const searchRef = useRef<AutocompleteApi<TItem> | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    searchRef.current = autocomplete<TItem>({
      openOnFocus: true,
      detachedMediaQuery: '',
      defaultActiveItemId: 0,
      onStateChange({ state }) {
        toggleSearchPanel(state.isOpen);
      },
      container: containerRef.current,
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      ...props,
    });

    return () => {
      searchRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchPanelOpen) {
      searchRef.current?.setQuery('');
      searchRef.current?.setIsOpen(searchPanelOpen);
    }
  }, [searchPanelOpen]);

  return <div ref={containerRef} className="hidden" />;
}
