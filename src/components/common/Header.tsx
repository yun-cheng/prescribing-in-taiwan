'use client';

import { sideBarOpenAtom } from '@/atoms/sideBar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSetAtom } from 'jotai';

export default function Header() {
  const toggleSideBar = useSetAtom(sideBarOpenAtom);

  const handleClick = () => {
    toggleSideBar(true);
  };

  return (
    <div className="h-full bg-slate-200 px-6 py-20 text-center">
      <h1 className="mb-5 text-5xl font-bold">Prescribing in Taiwan</h1>
      <p className="mb-10 text-2xl">
        Prescribing rates of ~400 medications in Taiwan
      </p>
      <button
        type="button"
        className="inline-flex items-center rounded-lg bg-slate-800 px-5 py-2.5 text-center text-xl  font-medium text-white hover:bg-slate-700"
        onClick={handleClick}
      >
        Explore ATC Drug Groups
        <ChevronRightIcon />
      </button>
    </div>
  );
}
