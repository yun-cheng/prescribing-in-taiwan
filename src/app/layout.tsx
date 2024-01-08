import JotaiDevTools from '@/components/common/JotaiDevTools';
import NavBar from '@/components/common/NavBar';
import theme from '@/utils/muiThemeConfig';
import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Provider as JotaiProvider } from 'jotai';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JotaiProvider>
          <JotaiDevTools />
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <div className="bg-slate-50 pt-16">
                <NavBar />
                {children}
              </div>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
