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

type ItemType = any;

interface AutocompleteProps
  extends Omit<
    AutocompleteOptions<ItemType>,
    'container' | 'renderer' | 'render'
  > {}

export function Autocomplete(props: AutocompleteProps) {
  const [searchPanelOpen, toggleSearchPanel] = useAtom(searchPanelOpenAtom);

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRootRef = useRef<Root | null>(null);
  const rootRef = useRef<Element | null>(null);
  const searchRef = useRef<AutocompleteApi<any> | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    searchRef.current = autocomplete({
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
      searchRef.current?.setIsOpen(searchPanelOpen);
    }
  }, [searchPanelOpen]);

  return <div ref={containerRef} className="hidden" />;
}
