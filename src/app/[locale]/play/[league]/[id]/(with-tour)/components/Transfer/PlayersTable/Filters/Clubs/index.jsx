'use client'

import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectClubs } from 'app/lib/features/club/club.selector'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getCorrectName } from 'app/utils/getCorrectName.util'

const ClubsFilter = ({ column }) => {
  const selectedClubs = useSelector(selectClubs)
  const { t } = useTranslation()
  const { lang } = useSelector((store) => store.systemLanguage)
  // Get current filter value from column
  const selectedClubIds = column.getFilterValue() || []

  const handleCheckedChange = (clubId) => {
    let newIds
    if (selectedClubIds.includes(clubId)) {
      newIds = selectedClubIds.filter((id) => id !== clubId)
    } else {
      newIds = [...selectedClubIds, clubId]
    }
    column.setFilterValue(newIds.length ? newIds : undefined)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="hover:text-foreground h-8 w-full justify-start truncate border-dashed"
        >
          {selectedClubIds.length
            ? `${selectedClubIds.length} ${t('selected')}`
            : t('Hamma_Clublar')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background w-56">
        <DropdownMenuLabel className={'text-foreground'}>
          {t('Hamma_Clublar')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {selectedClubs?.map((club) => (
          <DropdownMenuCheckboxItem
            key={club.id}
            checked={selectedClubIds.includes(club.id)}
            onCheckedChange={() => handleCheckedChange(club.id)}
            className="text-foreground capitalize"
          >
            {getCorrectName({ lang, uz: club?.name, ru: club?.name_ru })}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ClubsFilter
