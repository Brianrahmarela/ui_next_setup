import './globals.css';
import { cn } from '@/lib/utils';

const APP_NAME = 'UI Test PWA App';
const APP_DEFAULT_TITLE = 'My Awesome PWA App';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION = 'Best PWA app in the world!';

export const metadata = {
  metadataBase: new URL('https://https://ui-next-setup.vercel.app'),  // Ganti dengan URL domain kamu
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',  // Arahkan ke file manifest
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen antialiased')}>
        {children}
      </body>
    </html>
  );
}
