import '@/app/globals.css';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900']
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '700']
});

export const metadata = {
  title: 'Cinematic Weekender',
  description: 'Turn travel videos into gorgeous, ready‑to‑share weekend postcards in seconds.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playfair.className}>
      <body className={`${inter.variable} bg-background text-foreground font-sans`}>
        {children}
      </body>
    </html>
  );
}