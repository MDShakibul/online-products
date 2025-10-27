import Navbar from '@/components/Navbar';
import './globals.css';
import Providers from './providers';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata = {
	title: 'Online Shop',
	description: 'The best online shop for all your needs',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-gray-50 ${raleway.className}`} data-new-gr-c-s-check-loaded="14.1259.0" data-gr-ext-installed="" cz-shortcut-listen="true">
      <Providers>
        <Navbar />
        <main>{children}</main>
      </Providers>
      </body>
    </html>
	);
}
