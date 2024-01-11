'use client';

import { Drawer, DrawerProps, useMediaQuery, useTheme } from '@mui/material';
import { drawerWidth } from './constants';

export default function ResponsiveDrawer({
  children,
  ...otherProps
}: DrawerProps) {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      <Drawer
        variant="temporary"
        ModalProps={{
          keepMounted: true,
          disableScrollLock: lgUp,
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#f8fafc',
          },
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      >
        {children}
      </Drawer>
      <Drawer
        variant="persistent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#f8fafc',
          },
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      >
        {children}
      </Drawer>
    </>
  );
}
