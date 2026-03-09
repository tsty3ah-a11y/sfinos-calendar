import './globals.css';
import Shell from '@/components/layout/Shell';

export const metadata = {
  title: 'VetPlan — Πρόγραμμα Επισκέψεων',
  description: 'Πρόγραμμα επισκέψεων κτηνιατρείων',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'VetPlan — Πρόγραμμα Επισκέψεων',
    description: 'Πρόγραμμα επισκέψεων κτηνιατρείων',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#4A90D9',
};

export default function RootLayout({ children }) {
  return (
    <html lang="el" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('vetplan-dark')==='true')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
