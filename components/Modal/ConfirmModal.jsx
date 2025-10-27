'use client';
import { useEffect, useRef } from 'react';

const ConfirmModal = ({
	open,
	title,
	message,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	onConfirm,
	onCancel,
}) => {
	const dialogRef = useRef(null);

	useEffect(() => {
		if (!open) return;
		const onKey = (e) => e.key === 'Escape' && onCancel?.();
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [open, onCancel]);

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="confirm-title"
			onMouseDown={(e) => {
				if (e.target === e.currentTarget) onCancel?.();
			}}
		>
			
			<div className="absolute inset-0 bg-black/40" />

			
			<div
				ref={dialogRef}
				className="relative z-10 w-full max-w-md rounded-xl bg-white p-5 shadow-2xl ring-1 ring-black/10"
			>
				<h3 id="confirm-title" className="text-lg font-bold color-primary">
					{title}
				</h3>
				<p className="mt-2 text-sm text-gray-600">{message}</p>

				<div className="mt-5 flex items-center justify-end gap-2">
					<button
						type="button"
						className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
						onClick={onCancel}
					>
						{cancelText}
					</button>
					<button
						type="button"
						className="rounded-lg px-4 py-2 text-sm font-semibold text-white bg-[#ef4444] hover:opacity-90 cursor-pointer"
						onClick={onConfirm}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
