'use client';

import { sideBarOpenAtom } from '@/atoms/sideBar';
import { useMediaQuery, useTheme } from '@mui/material';
import { useAtom } from 'jotai';
import { drawerWidth } from './SideBar/constants';

type Props = {
  children: React.ReactNode;
};

export default function MainContainer({ children }: Props) {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const [sideBarOpen] = useAtom(sideBarOpenAtom);

  const marginLeft = sideBarOpen || !lgUp ? 0 : -drawerWidth;

  const transitionOpen = theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  });
  const transitionClose = theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  });
  const transition = sideBarOpen ? transitionOpen : transitionClose;

  return (
    <div className="flex-grow" style={{ marginLeft, transition }}>
      {children}
    </div>
  );
}
