import { toast } from "sonner"
import { MIN_DEF_VALUE, MAX_DEF_VALUE, CORRECT_GOA_VALUE, MAX_MID_VALUE, MIN_STR_VALUE, MAX_STR_VALUE, MIN_MID_VALUE } from "./config.global"

export const validTeamStructure = (playersCount, t) => {
  if (
    playersCount.GOA !== CORRECT_GOA_VALUE ||
    playersCount.DEF < MIN_DEF_VALUE ||
    playersCount.DEF > MAX_DEF_VALUE ||
    playersCount.MID < MIN_MID_VALUE ||
    playersCount.MID > MAX_MID_VALUE ||
    playersCount.STR < MIN_STR_VALUE ||
    playersCount.STR > MAX_STR_VALUE
  ) {
    toast.error(t('Jamoa formatsiyasi notogri'))
    return false
  }
  return true
}