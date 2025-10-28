// StarRating.jsx
'use client';

import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

export default function StarRating({
	rating,
	count,
	text="",
	size = 12,
	color = '#FFA439',
	emptyColor = '#E5E7EB',
	className = 'text-[12px]',
}) {
	const safe = Math.min(5, Math.max(0, Math.round(rating * 2) / 2));

	const stars = Array.from({ length: 5 }, (_, i) => {
		const value = i + 1;
		if (safe >= value) {
			return <FaStar key={i} size={size} style={{ color }} />;
		}
		if (safe + 0.5 === value) {
			return <FaStarHalfAlt key={i} size={size} style={{ color }} />;
		}

		return <FaRegStar key={i} size={size} style={{ color: emptyColor }} />;
	});

	return (
		<div
			className={`inline-flex items-center gap-1`}
			aria-label={`Rating: ${safe} out of 5`}
			title={`${safe} / 5`}
		>
			{stars} <span className={`font-semibold text-secondary ${className}`}>({`${count}${text && ` ${text}`}`})</span>
		</div>
	);
}
