'use client';

import { sideBarOpenAtom } from '@/atoms/sideBar';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  AppBar,
  Button,
  IconButton,
  Link,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAtom } from 'jotai';
import NextLink from 'next/link';
import HideOnScroll from './HideOnScroll';
import { drawerWidth } from './SideBar/constants';

export default function NavBar() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const [sideBarOpen, toggleSideBar] = useAtom(sideBarOpenAtom);

  const handleClickMenu = () => {
    toggleSideBar();
  };

  const transitionOpen = theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  });
  const transitionClose = theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });
  const transition = sideBarOpen ? transitionOpen : transitionClose;

  return (
    <HideOnScroll disable={mdUp}>
      <AppBar
        sx={{
          backgroundColor: '#475569',
          transition,
          [theme.breakpoints.up('lg')]: {
            marginLeft: sideBarOpen ? drawerWidth : 0,
            width: sideBarOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
          },
        }}
      >
        <div className="mx-auto h-full w-full max-w-screen-lg">
          <Toolbar sx={{ height: 64 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleClickMenu}
              sx={{
                mr: 2,
                display: {
                  lg: sideBarOpen ? 'none' : 'block',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Link
              href="/"
              component={NextLink}
              color="inherit"
              underline="none"
              sx={{ fontSize: '1.5rem', fontWeight: 600 }}
            >
              Prescribing in Taiwan
            </Link>
            <div className="flex-grow" />
            <Button
              href="https://www.pleiotropy.co.uk/prescribing-in-taiwan"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                fontSize: '1.125rem',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              More Info
              <OpenInNewIcon className="ml-1" />
            </Button>
          </Toolbar>
        </div>
      </AppBar>
    </HideOnScroll>
  );
}
