'use client';

import { isDrugPageAtom } from '@/atoms/pathname';
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
import HideOnScroll from './HideOnScroll';

export default function NavBar() {
  const [isDrugPage] = useAtom(isDrugPageAtom);

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
        className={`bg-slate-600 ${
          sideBarOpen ? 'lg:ml-80 lg:w-[calc(100%-20rem)]' : 'lg:ml-0 lg:w-full'
        }`}
        sx={{
          transition,
        }}
      >
        <div className="mx-auto h-full w-full max-w-screen-lg @container">
          <Toolbar className="h-16">
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleClickMenu}
              className={`mr-4 ${sideBarOpen ? 'lg:hidden' : 'lg:block'}`}
            >
              <MenuIcon />
            </IconButton>
            <Link
              href="/"
              component={NextLink}
              color="inherit"
              underline="none"
              className="text-xl font-semibold @lg:text-2xl"
            >
              Prescribing in Taiwan
            </Link>
            <div className="flex-grow" />
            {isDrugPage && (
              <button
                type="button"
                className="mx-auto mr-2 flex items-center rounded-xl bg-white/10 p-2 text-lg text-slate-300 hover:bg-white/20"
                onClick={openSearchPanel}
              >
                <SearchIcon className="mr-1" />
                <span className="mr-2 hidden @3xl:block">
                  Search ATC Drug Groups
                </span>
                <span className="mr-3 hidden @2xl:block @3xl:hidden">
                  Search...
                </span>
              </button>
            )}
            <Button
              href="https://www.pleiotropy.co.uk/prescribing-in-taiwan"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              className="text-lg"
            >
              <span className="hidden @xl:inline-block">More Info</span>
              <span className="inline-block @xl:hidden">Info</span>
              <OpenInNewIcon className="ml-1" />
            </Button>
          </Toolbar>
        </div>
      </AppBar>
    </HideOnScroll>
  );
}
