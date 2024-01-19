'use client';

import { searchPanelOpenAtom } from '@/atoms/search';
import { sideBarOpenAtom } from '@/atoms/sideBar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import { useSetAtom } from 'jotai';

export default function Header() {
  const toggleSideBar = useSetAtom(sideBarOpenAtom);
  const toggleSearchPanel = useSetAtom(searchPanelOpenAtom);

  const openSideBar = () => {
    toggleSideBar(true);
  };

  const openSearchPanel = () => {
    toggleSearchPanel(true);
  };

  return (
    <div className="h-full bg-slate-200 px-6 py-20 text-center">
      <h1 className="mb-5 text-5xl font-bold">Prescribing in Taiwan</h1>
      <p className="mb-10 text-2xl">
        Prescribing rates of ~400 medications in Taiwan
      </p>
      <button
        type="button"
        className="center mx-auto mb-10 flex w-80 items-center justify-between rounded-lg bg-slate-800 px-5 py-2.5 text-center text-xl font-medium text-white hover:bg-slate-700"
        onClick={openSideBar}
      >
        Explore ATC Drug Groups
        <ChevronRightIcon />
      </button>
      <button
        type="button"
        className="mx-auto mb-10 flex w-80 items-center rounded-lg bg-white px-5 py-2.5 text-xl text-slate-400 shadow-sm ring-1 ring-slate-900/10 hover:ring-slate-900/30"
        onClick={openSearchPanel}
      >
        <SearchIcon className="mr-3" />
        Search ATC Drug Groups
      </button>
    </div>
  );
}
