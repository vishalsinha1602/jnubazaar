import { BadgeCheck } from 'lucide-react';

const SIZE_CLASSES = {
  xs: 'h-4 w-4',
  sm: 'h-[18px] w-[18px]',
  md: 'h-5 w-5',
};

/** One consistent JNU verification mark, inline or anchored over an avatar. */
export const VerifiedBadge = ({
  placement = 'inline',
  size = 'md',
  className = '',
  title = 'Verified JNU account',
}) => {
  const icon = <BadgeCheck className={`${SIZE_CLASSES[size] || SIZE_CLASSES.md} fill-[#1d9bf0] text-white`} />;

  if (placement === 'avatar') {
    return (
      <span
        role="img"
        aria-label={title}
        title={title}
        className={`absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full bg-white ${className}`}
      >
        {icon}
      </span>
    );
  }

  return <span role="img" aria-label={title} title={title} className={`inline-flex shrink-0 align-middle ${className}`}>{icon}</span>;
};
