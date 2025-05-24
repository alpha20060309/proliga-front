import Image from 'next/image'
import { useCreateTeam } from 'app/hooks/transfer/useCreateTeam/useCreateTeam'
import { useState } from 'react'
import { FORMATIONS } from 'app/utils/formations.util'
import { useTransitionRouter } from 'next-view-transitions'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { validateTeamName } from 'app/utils/validateTeamName.util'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { Loader2 } from 'lucide-react'

const CompetitionModal = ({ toggleModal, competition, isModalOpen }) => {
  const router = useTransitionRouter()
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [formation, setFormation] = useState(FORMATIONS['4-3-3'])
  const userTable = useSelector(selectUserTable)

  const { createTeam, isLoading } = useCreateTeam()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validateTeamName(title, t)

    if (!isValid) return

    await createTeam({
      title,
      formation,
      competition_id: competition.id,
      userTable,
      cb: (game) => {
        toggleModal()
        router.push(`/play/${game.competition_id}/${game.id}`)
      },
    })
  }

  return (
    <Dialog onOpenChange={toggleModal} open={isModalOpen}>
      <DialogContent className="border-border from-background to-card/80 text-card-foreground flex max-w-[96%] flex-col items-center justify-between gap-4 rounded-lg border bg-transparent bg-gradient-to-t px-4 py-6 shadow-xl transition-all duration-300 ease-in-out sm:max-w-md md:gap-6 md:px-6 md:py-8 lg:max-w-lg 2xl:max-w-xl">
        <div className="w-full text-center">
          <Image
            src="/favicon.svg"
            width={64}
            height={64}
            alt="Soccer Ball"
            draggable={false}
            className="mx-auto mb-2 size-16"
          />
          <DialogTitle className="text-foreground xs:text-2xl text-xl font-bold sm:text-3xl lg:text-4xl">
            {t('Jamoa yarating')}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1 text-sm sm:mt-2 sm:text-base">
            {t('Join the league and lead your team to victory!')}
          </DialogDescription>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex w-full flex-col gap-2"
          id="team-create"
          name="team-create"
        >
          <div className="flex flex-col gap-1">
            <Label
              className="text-sm font-semibold sm:text-base"
              htmlFor="team-title"
            >
              {t('Jamoa Ismi')}
            </Label>
            <Input
              type="text"
              id="team-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('Enter your team name')}
              className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring h-10 w-full rounded-md border-2 p-2 text-sm focus:ring-2 focus:outline-hidden sm:h-12 sm:p-3 sm:text-base"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label
              className="text-sm font-semibold sm:text-base"
              htmlFor="formation"
            >
              {t('Taktika')}
            </Label>
            <Select
              defaultValue={FORMATIONS['4-3-3']}
              onValueChange={(value) => setFormation(value)}
            >
              <SelectTrigger className="border-input bg-background text-foreground focus:border-ring/50 focus:ring-ring h-10 w-full rounded-md border-2 p-2 text-sm outline-hidden focus:ring-2 sm:h-12 sm:p-3 sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card text-card-foreground">
                {Object.keys(FORMATIONS).map((key, index) => (
                  <SelectItem
                    value={FORMATIONS[key]}
                    key={index}
                    className="hover:bg-secondary"
                  >
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary/60 text-primary-foreground hover:bg-primary/90 focus:ring-ring focus:ring-offset-background mt-2 h-12 rounded-md text-base font-bold transition-all focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:opacity-50 sm:text-lg"
          >
            {isLoading ? (
              <Loader2 className="mx-auto size-5 animate-spin sm:size-6" />
            ) : (
              <>{t('Tasdiqlash')}</>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CompetitionModal
