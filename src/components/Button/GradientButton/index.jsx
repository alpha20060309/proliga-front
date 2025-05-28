import { Link } from 'next-view-transitions'
import { cn } from '../../../@/lib/utils'

const classes = {
  gradient: {
    background: 'bg-linear-to-r from-blue-500 via-red-500 to-yellow-500',
    animate: 'animate-gradient',
    glow: 'animate-glow hover:animate-gradient',
    transition: 'transition-all duration-300 ease-in-out',
  },
  hover: {
    scale: 'hover:scale-[105deg]',
    glow: 'hover:animate-pulse',
    animate: 'animate-gradient-x',
    shadow: 'hover:shadow-xl hover:shadow-pink-500/20',
  },
}

export function GradientButton({
  href,
  children,
  variant = 'gradient',
  className,
}) {
  const baseButtonStyles = cn(
    'min-w-40 h-12',
    'relative rounded-md',
    'flex items-center justify-center',
    'text-sm font-bold',
    classes.gradient.transition,
    classes.hover.scale,
    classes.hover.shadow
  )

  if (variant === 'gradient') {
    return (
      <GradientBorder className={'w-full'}>
        <div className={cn(baseButtonStyles, 'bg-background')}>
          <Link
            href={href}
            tabIndex={-1}
            className={cn(
              classes.gradient.background,
              'bg-clip-text text-transparent',
              'flex justify-center items-center min-w-40 w-64 whitespace-nowrap',
              classes.gradient.animate
            )}
          >
            {children}
          </Link>
        </div>
      </GradientBorder>
    )
  }

  return (
    <button
      className={cn(
        baseButtonStyles,
        classes.gradient.background,
        classes.gradient.animate,
        classes.hover.glow,
        'text-accent-foreground shadow-md',
        'focus:ring-primary focus:ring-opacity-50 focus:ring-2 focus:outline-hidden',
        className
      )}
    >
      <Link
        tabIndex={-1}
        href={href}
        className="relative z-10 px-4 whitespace-nowrap"
      >
        {children}
      </Link>
    </button>
  )
}

export function GradientBorder({ children, className }) {
  return (
    <div className="group relative" tabIndex={0}>
      <div
        className={cn(
          'absolute -inset-0.5 rounded-lg',
          classes.gradient.background,
          classes.gradient.animate,
          'opacity-70 blur-xs group-hover:opacity-100',
          classes.gradient.transition,
          className
        )}
      />
      {children}
    </div>
  )
}

export default GradientButton
