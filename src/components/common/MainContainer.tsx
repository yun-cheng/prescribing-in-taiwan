'use client';

import { sideBarOpenAtom } from '@/atoms/sideBar';
import { useTheme } from '@mui/material';
import { useAtom } from 'jotai';

type Props = {
  children: React.ReactNode;
};

export default function MainContainer({ children }: Props) {
  const theme = useTheme();

  const [sideBarOpen] = useAtom(sideBarOpenAtom);

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
    <div
      className={`min-h-screen flex-grow pt-16 ${
        sideBarOpen ? '' : 'lg:-ml-[20rem]'
      }`}
      style={{ transition }}
    >
      {children}
    </div>
  );
}
