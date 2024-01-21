'use client';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab, Fade, Tooltip, useScrollTrigger } from '@mui/material';

export default function ScrollToTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div id="back-to-top-anchor" />
      <Fade in={trigger}>
        <Tooltip classes={{ tooltip: 'text-base' }} title="Scroll to top">
          <div
            onClick={handleClick}
            role="presentation"
            className="fixed bottom-6 right-6 z-[1050]"
          >
            <Fab
              className="bg-slate-300 shadow-none hover:bg-slate-400"
              aria-label="scroll back to top"
              disableRipple
            >
              <KeyboardArrowUpIcon />
            </Fab>
          </div>
        </Tooltip>
      </Fade>
    </>
  );
}
