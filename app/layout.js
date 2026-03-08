import './globals.css';
import Shell from '@/components/layout/Shell';

export const metadata = {
  title: 'VetPlan — Πρόγραμμα Επισκέψεων',
  description: 'Πρόγραμμα επισκέψεων κτηνιατρείων',
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
