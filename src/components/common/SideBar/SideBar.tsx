'use client';

import { drugGroupsAtom, drugMapAtom, sideBarOpenAtom } from '@/atoms/sideBar';
import { DrugGroups, DrugMap } from '@/types/drug';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Divider, IconButton, Toolbar } from '@mui/material';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import DrugList from '../../drugList/DrugList';
import ResponsiveDrawer from './ResponsiveDrawer';

type Props = {
  drugMap: DrugMap;
  drugGroups: DrugGroups;
};

export default function SideBar({ drugMap, drugGroups }: Props) {
  useHydrateAtoms([
    [drugMapAtom, drugMap],
    [drugGroupsAtom, drugGroups],
  ]);

  const [sideBarOpen, setSideBarOpen] = useAtom(sideBarOpenAtom);

  const handleCloseSideBar = () => {
    setSideBarOpen(false);
  };

  return (
    <ResponsiveDrawer open={sideBarOpen} onClose={handleCloseSideBar}>
      <Toolbar className="min-h-16 justify-end">
        <IconButton onClick={handleCloseSideBar}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <div className="h-full overflow-y-auto">
        <DrugList drugGroups={drugGroups} />
      </div>
    </ResponsiveDrawer>
  );
}
