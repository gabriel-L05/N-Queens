interface QueenIconProps {
  isConflict?: boolean;
  className?: string;
  size?: number;
}

export const QueenIcon = ({ isConflict = false, className = '', size = 28 }: QueenIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        isConflict
          ? 'text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)] animate-pulse'
          : 'text-purple-300 drop-shadow-[0_0_8px_rgba(216,180,254,0.6)]'
      } ${className}`}
    >
      {/* Crown Top Points */}
      <path
        d="M3 18H21M4 18L3 8L8 12L12 5L16 12L21 8L20 18H4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Crown base detail */}
      <circle cx="12" cy="5" r="1" fill="currentColor" />
      <circle cx="3" cy="8" r="1" fill="currentColor" />
      <circle cx="21" cy="8" r="1" fill="currentColor" />
      <line x1="6" y1="21" x2="18" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
