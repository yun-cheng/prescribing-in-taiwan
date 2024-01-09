'use client';

import { sideBarOpenAtom } from '@/atoms/sideBar';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Button,
  IconButton,
  Link,
  Toolbar,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useAtom } from 'jotai';
import HideOnScroll from './HideOnScroll';
import { drawerWidth } from './SideBar/constants';

interface AppBarProps extends MuiAppBarProps {
  move?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'move',
})<AppBarProps>(({ theme, move }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(move && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function NavBar() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const [sideBarOpen, toggleSideBar] = useAtom(sideBarOpenAtom);

  const handleClickMenu = () => {
    toggleSideBar();
  };

  const appBar = (
    <AppBar move={lgUp && sideBarOpen} sx={{ backgroundColor: '#475569' }}>
      <div className="mx-auto w-full max-w-screen-lg">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleClickMenu}
            sx={{ mr: 2, ...(lgUp && sideBarOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            href="/"
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
  );

  return <div>{!mdUp ? <HideOnScroll>{appBar}</HideOnScroll> : appBar}</div>;
}
