import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
	title: 'Online Shop',
	description: 'The best online shop for all your needs',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
      <body className="min-h-screen" >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
	);
}
