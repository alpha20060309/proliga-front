import { toast } from "sonner";
import { FORMATIONS } from "./formations.util";

export const currentFormation = (playersCount, t) => {
  const formationKey = `${playersCount.DEF}-${playersCount.MID}-${playersCount.STR}`;

  if (FORMATIONS[formationKey]) {
    return FORMATIONS[formationKey];
  } else {
    toast.error(t("Noto‘g‘ri jamoa formatsiyasi"));
    return null;
  }
};
