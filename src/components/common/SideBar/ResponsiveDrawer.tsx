'use client';

import { Drawer, DrawerProps, useMediaQuery, useTheme } from '@mui/material';

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
        className="w-80 lg:hidden"
        PaperProps={{
          className: 'box-border w-80 bg-slate-50',
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      >
        {children}
      </Drawer>
      <Drawer
        variant="persistent"
        className="hidden w-80 lg:block"
        PaperProps={{
          className: 'box-border w-80 bg-slate-50',
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      >
        {children}
      </Drawer>
    </>
  );
}
