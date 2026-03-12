import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'IASD Central Milagres - CE',
  description:
    'Igreja Adventista do Sétimo Dia - Central Milagres (CE). Informações sobre cultos, programação, localização e contato.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <head>
        <meta name="theme-color" content="#2a6f9e" />
        <link
          rel="icon"
          type="image/png"
          href="https://i.ibb.co/DgkWPyfP/229133089-411187380321827-5405016350897760058-n.jpg"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script src="/js/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

