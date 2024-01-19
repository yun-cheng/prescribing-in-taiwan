'use client';

import { searchPanelOpenAtom } from '@/atoms/search';
import { sideBarOpenAtom } from '@/atoms/sideBar';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Button,
  IconButton,
  Link,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import HideOnScroll from './HideOnScroll';
import { drawerWidth } from './SideBar/constants';

export default function NavBar() {
  const pathname = usePathname();

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const [sideBarOpen, toggleSideBar] = useAtom(sideBarOpenAtom);
  const toggleSearchPanel = useSetAtom(searchPanelOpenAtom);

  const handleClickMenu = () => {
    toggleSideBar();
  };

  const openSearchPanel = () => {
    toggleSearchPanel(true);
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
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: '1.125rem',
                  sm: '1.5rem',
                },
              }}
            >
              Prescribing in Taiwan
            </Link>
            <div className="flex-grow" />
            {pathname.startsWith('/atc/') && (
              <button
                type="button"
                className="mx-auto mr-2 flex items-center rounded-xl bg-white/10 p-2 text-lg text-slate-300 hover:bg-white/20"
                onClick={openSearchPanel}
              >
                <SearchIcon className="mr-1" />
                <span className="mr-2 hidden md:block">
                  Search ATC Drug Groups
                </span>
                <span className="mr-3 hidden sm:block md:hidden">
                  Search...
                </span>
              </button>
            )}
            <Button
              href="https://www.pleiotropy.co.uk/prescribing-in-taiwan"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                fontSize: '1.125rem',
              }}
            >
              <span className="hidden md:inline-block">More Info</span>
              <span className="inline-block md:hidden">Info</span>
              <OpenInNewIcon className="ml-1" />
            </Button>
          </Toolbar>
        </div>
      </AppBar>
    </HideOnScroll>
  );
}
