import { PACKAGE_TYPE } from 'app/utils/packages.util'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import { selectCurrentPackage } from 'app/lib/features/package/package.selector'

const CurrentPackage = () => {
  const { t } = useTranslation()
  const currentPackage = useSelector(selectCurrentPackage)

  const getPackageText = (currentPackage) => {
    if (currentPackage?.type === PACKAGE_TYPE.team_balance) return t('Balansni')
    if (currentPackage?.type === PACKAGE_TYPE.transfer_count)
      return t('Transferla sonini')
    if (currentPackage?.type === PACKAGE_TYPE.single_club_count)
      return t("Maksimum klub oyi'nchilarini")
  }
  return (
    <div className="flex flex-row items-center gap-4 rounded-md bg-neutral-800 p-4 md:h-24 md:p-6">
      <span className="hidden size-12 items-center justify-center rounded-full bg-black font-bold text-neutral-300 sm:flex">
        1
      </span>
      <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0">
        <div className="select-none space-x-2 text-sm xs:text-base sm:text-lg">
          {getPackageText(currentPackage).replace('$', currentPackage?.amount)}
        </div>
        <NumericFormat
          value={currentPackage?.price / 100 || 0}
          className="w-min select-none border-none bg-transparent text-center text-sm font-bold text-neutral-100 outline-none xs:text-base md:text-2xl"
          defaultValue={0}
          readOnly
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          tabIndex={-1}
          suffix={' ' + t("so'm")}
        />
      </div>
    </div>
  )
}

export default CurrentPackage
