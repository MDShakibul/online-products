import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
	title: 'Online Shop',
	description: 'The best online shop for all your needs',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
      <body className="min-h-screen" data-new-gr-c-s-check-loaded="14.1259.0" data-gr-ext-installed="" cz-shortcut-listen="true">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
	);
}
