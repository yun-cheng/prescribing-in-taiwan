import JotaiDevTools from '@/components/common/JotaiDevTools';
import MainContainer from '@/components/common/MainContainer';
import NavBar from '@/components/common/NavBar';
import SideBarContainer from '@/components/common/SideBar/SideBarContainer';
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
      <body className={inter.className}>
        <JotaiProvider>
          <JotaiDevTools />
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <NavBar />
              <div className="min-h-screen bg-slate-50">
                <main>
                  <div className="flex">
                    <SideBarContainer />
                    <MainContainer>{children}</MainContainer>
                  </div>
                </main>
              </div>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
