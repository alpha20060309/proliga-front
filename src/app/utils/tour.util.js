export const TOUR = {
  inProcess: 'in_process',
  completed: 'completed',
  notStartedTransfer: 'not_started_transfer',
  notStarted: 'not_started',
}

export const getTourName = (status, t) => {
  switch (status) {
    case TOUR.notStarted:
      return t('Boshlanmagan')
    case TOUR.completed:
      return t('Tugagan')
    case TOUR.notStartedTransfer:
      return t('Boshlanmagan transfer mumkin')
    case TOUR.inProcess:
      return t('Jarayonda')
    default:
      return 'Unidentified Status'
  }
}
