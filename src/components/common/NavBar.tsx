import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { AppBar, Button, Link, Toolbar } from '@mui/material';
import HideOnScroll from './HideOnScroll';

export default function NavBar() {
  return (
    <HideOnScroll>
      <AppBar sx={{ backgroundColor: '#475569' }}>
        <div className="mx-auto w-full max-w-screen-lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Link
              href="/"
              color="inherit"
              underline="none"
              sx={{ fontSize: '1.5rem', fontWeight: 600 }}
            >
              Prescribing in Taiwan
            </Link>
            <Button
              href="https://www.pleiotropy.co.uk/prescribing-in-taiwan"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{ fontSize: '1.125rem' }}
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
