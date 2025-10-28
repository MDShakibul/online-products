import Navbar from '@/components/Navbar';
import './globals.css';
import Providers from './providers';
import { DM_Sans } from 'next/font/google';
import Footer from '@/components/Footer';

const dm_sans = DM_Sans({ subsets: ['latin'] });

export const metadata = {
	title: 'Online Shop',
	description: 'The best online shop for all your needs',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
  <body className={`${dm_sans.className} bg-primary min-h-dvh flex flex-col`} data-new-gr-c-s-check-loaded="14.1260.0" data-gr-ext-installed="" cz-shortcut-listen="true">
    <Providers>
      <Navbar /> 
      <main className="flex-1">{children}</main>
      <Footer />
    </Providers>
  </body>
</html>

	);
}
