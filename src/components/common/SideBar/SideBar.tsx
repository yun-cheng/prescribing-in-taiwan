'use client';

import { drugDataAtom, sideBarOpenAtom } from '@/atoms/sideBar';
import { DrugData } from '@/types/drug';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Divider, IconButton, Toolbar } from '@mui/material';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import DrugList from '../../drugList/DrugList';
import ResponsiveDrawer from './ResponsiveDrawer';

type Props = {
  drugData: DrugData;
};

export default function SideBar({ drugData }: Props) {
  useHydrateAtoms([[drugDataAtom, drugData]]);

  const [sideBarOpen, setSideBarOpen] = useAtom(sideBarOpenAtom);

  const handleCloseSideBar = () => {
    setSideBarOpen(false);
  };

  return (
    <ResponsiveDrawer open={sideBarOpen} onClose={handleCloseSideBar}>
      <Toolbar
        sx={{
          justifyContent: 'flex-end',
        }}
      >
        <IconButton onClick={handleCloseSideBar}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <div className="h-full">
        <DrugList drugData={drugData} />
      </div>
    </ResponsiveDrawer>
  );
}
