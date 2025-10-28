'use client';

import { selectCount } from '@/store';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
	const { theme, setTheme } = useTheme();
	const count = useSelector(selectCount);

	return (
		<nav className="bg-nav text-white border border-gray sticky top-0 z-50">
			<div className="container h-16 flex items-center justify-between px-4">
				<div className="flex items-center gap-3">
					<Link
						href="/"
						className="font-semibold tracking-tight text-xl md:text-2xl"
					>
						Online Shop
					</Link>
				</div>

				{/* Right Section */}
				<div className="flex items-center gap-1">
					<div className="flex-none">
						<Link href="/cart" className="">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle"
							>
								<div className="indicator">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
									<span className="badge badge-xs indicator-item">{count}</span>
								</div>

								
							</div>

			
						</Link>
					</div>

					{/* <button className="border rounded-md px-3 py-1" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>
            {theme==='dark'?'Light':'Dark'}
          </button> */}
		  

		  
		  
 <ThemeToggle theme={theme} setTheme= {setTheme}/>
				</div>
			</div>
		</nav>
	);
}
