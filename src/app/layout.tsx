import Hydrations from '@/components/common/Hydrations/Hydrations';
import JotaiDevTools from '@/components/common/JotaiDevTools';
import Listeners from '@/components/common/Listeners';
import MainContainer from '@/components/common/MainContainer';
import NavBar from '@/components/common/NavBar';
import SideBar from '@/components/common/SideBar/SideBar';
import SearchPanel from '@/components/searchPanel/SearchPanel';
import theme from '@/utils/muiThemeConfig';
import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Provider as JotaiProvider } from 'jotai';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Prescribing in Taiwan',
  description:
    'Explore drug prescribing trends in Taiwan from 2005 to 2020. Analyze data from the National Health Insurance on medication use by sex and age, visualized in detailed charts.',
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <link
          crossOrigin="anonymous"
          href={`https://${process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}-dsn.algolia.net`}
          rel="preconnect"
        />
      </head>
      <body className={inter.className}>
        <JotaiProvider>
          <JotaiDevTools />
          <Hydrations>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <Listeners />
                <SearchPanel />
                <NavBar />
                <div className="min-h-screen bg-slate-50">
                  <main>
                    <div className="flex">
                      <SideBar />
                      <MainContainer>{children}</MainContainer>
                    </div>
                  </main>
                </div>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </Hydrations>
        </JotaiProvider>
      </body>
    </html>
  );
}
