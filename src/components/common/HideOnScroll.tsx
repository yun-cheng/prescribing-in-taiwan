'use client';

import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';

interface Props {
  disable?: boolean;
  children: React.ReactElement;
}

export default function HideOnScroll({ disable = false, children }: Props) {
  const trigger = useScrollTrigger({
    threshold: 30,
  });

  if (disable) {
    return children;
  }

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
