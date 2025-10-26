
import './globals.css';


export const metadata = {
	title: 'Online Shop',
	description: 'The best online shop for all your needs',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body suppressHydrationWarning>{children}</body>
		</html>
	);
}
