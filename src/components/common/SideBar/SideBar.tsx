'use client';

import { sideBarOpenAtom } from '@/atoms/sideBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Divider, IconButton, Toolbar } from '@mui/material';
import { useAtom } from 'jotai';
import DrugList from '../../drugList/DrugList';
import ResponsiveDrawer from './ResponsiveDrawer';

export default function SideBar() {
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
        <DrugList />
      </div>
    </ResponsiveDrawer>
  );
}
