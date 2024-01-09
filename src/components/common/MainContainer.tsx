'use client';

import { sideBarOpenAtom } from '@/atoms/sideBar';
import { styled, useMediaQuery, useTheme } from '@mui/material';
import { useAtom } from 'jotai';
import { drawerWidth } from './SideBar/constants';

const Main = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

type Props = {
  children: React.ReactNode;
};

export default function MainContainer({ children }: Props) {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const [sideBarOpen] = useAtom(sideBarOpenAtom);

  if (lgUp) {
    return <Main open={sideBarOpen}>{children}</Main>;
  }

  return <div className="w-full">{children}</div>;
}
