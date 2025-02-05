import { AlertCircle, AlertTriangle, XCircle, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const alertTypes = {
  info: {
    icon: AlertCircle,
    iconColor: 'text-blue-400',
    bgColor: 'bg-gray-800',
    borderColor: 'border-gray-700',
    textColor: 'text-gray-300',
    actionColor: 'text-blue-400 hover:text-blue-300',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-yellow-400',
    bgColor: 'bg-yellow-900',
    borderColor: 'border-yellow-700',
    textColor: 'text-yellow-100',
    actionColor: 'text-yellow-200 hover:text-yellow-100',
  },
  danger: {
    icon: XCircle,
    iconColor: 'text-red-400',
    bgColor: 'bg-red-900',
    borderColor: 'border-red-700',
    textColor: 'text-red-100',
    actionColor: 'text-red-200 hover:text-red-100',
  },
}

const SettingsAlert = ({
  type = 'info',
  message,
  actionText,
  onAction,
  className,
  iconClassName,
  bgClassName,
  borderClassName,
  textClassName,
  actionClassName,
  dismissClassName,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const {
    icon: Icon,
    iconColor: defaultIconColor,
    bgColor: defaultBgColor,
    borderColor: defaultBorderColor,
    textColor: defaultTextColor,
    actionColor: defaultActionColor,
  } = alertTypes[type]

  return (
    <div
      className={cn(
        'w-full rounded-lg border p-4 shadow-sm transition-all duration-300 ease-in-out',
        defaultBorderColor,
        defaultBgColor,
        bgClassName,
        borderClassName,
        className
      )}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon
            className={cn(
              'h-5 w-5 transform transition-transform duration-300 ease-in-out group-hover:scale-110',
              defaultIconColor,
              iconClassName
            )}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className={cn('text-sm', defaultTextColor, textClassName)}>
            {message}
          </p>
          {actionText && (
            <p className="mt-3 text-sm md:ml-6 md:mt-0">
              <button
                onClick={onAction}
                className={cn(
                  'whitespace-nowrap font-medium transition-all duration-300 ease-in-out',
                  'transform hover:translate-x-1',
                  defaultActionColor,
                  actionClassName
                )}
              >
                {actionText}{' '}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 ease-in-out"
                >
                  &rarr;
                </span>
              </button>
            </p>
          )}
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className={cn(
                'inline-flex rounded-md p-1.5 transition-all duration-300 ease-in-out',
                'hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2',
                'transform',
                defaultTextColor,
                `focus:ring-offset-${defaultBgColor} hover:bg-neutral-50 hover:bg-opacity-20`,
                dismissClassName
              )}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsAlert
