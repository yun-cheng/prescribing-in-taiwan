'use client';

import { drugDataAtom, sideBarOpenAtom } from '@/atoms/sideBar';
import { DrugData } from '@/types/drug';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import DrugList from '../../drugList/DrugList';
import { drawerWidth } from './constants';

type Props = {
  drugData: DrugData;
};

export default function SideBar({ drugData }: Props) {
  useHydrateAtoms([[drugDataAtom, drugData]]);

  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const [sideBarOpen, setSideBarOpen] = useAtom(sideBarOpenAtom);

  const handleCloseSideBar = () => {
    setSideBarOpen(false);
  };

  return (
    <Drawer
      open={sideBarOpen}
      variant={lgUp ? 'persistent' : 'temporary'}
      onClose={handleCloseSideBar}
      ModalProps={{
        keepMounted: !lgUp,
      }}
      sx={{
        width: drawerWidth,
        flexShrink: { lg: 0 },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          backgroundColor: '#f8fafc',
        },
      }}
    >
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
    </Drawer>
  );
}
