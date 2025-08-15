import { toast } from "sonner";

export const validPlayers = (teamConcat, t) => {
  let valid = true;

  teamConcat.forEach((player) => {
    if (!player.name || !player.price) {
      return (valid = false);
    }
  });
  !valid &&
    toast.warning(
      t(
        "Jamoa to‘liq tuzilmagan. Jamoani saqlash uchun barcha pozitsiyalarni to‘ldiring.",
      ),
      { richColors: true },
    );
  return valid;
};
