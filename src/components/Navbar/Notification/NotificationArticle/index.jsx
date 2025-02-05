import { useSelector } from 'react-redux'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { formatDate } from 'app/utils/formatDate.util'

const NotificationArticle = ({ notification, handleNotificationClick }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const date = new Date(notification?.published_at ?? new Date())

  return (
    <div
      className="hover:bg-accent flex items-start space-x-4 border-b border-neutral-400 px-4 py-2 transition-colors"
      role="button"
      onClick={() => handleNotificationClick(notification)}
      tabIndex={0}
    >
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none text-neutral-100">
          {getCorrectName({
            lang,
            uz: notification?.name,
            ru: notification?.name_ru,
          })}
        </p>
        <p className="text-xs text-neutral-300">
          {formatDate(date, 'notifications')}
        </p>
      </div>
    </div>
  )
}

export default NotificationArticle
