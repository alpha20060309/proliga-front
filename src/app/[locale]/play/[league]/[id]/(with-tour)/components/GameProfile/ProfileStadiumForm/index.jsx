import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { useMemo } from "react";
import { setCaptain } from "lib/features/teamPlayer/teamPlayer.slice";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "components/ui/select";
import { useUpdateTeamCaptains } from "hooks/transfer/useUpdateTeamCaptains";
import { selectTeamConcat } from "lib/features/teamPlayer/teamPlayer.selector";
import { selectCurrentTeam } from "lib/features/currentTeam/currentTeam.selector";
import { selectUser } from "lib/features/auth/auth.selector";
import { selectCurrentCompetition } from "lib/features/competition/competition.selector";
import { getCorrectName } from "utils/getCorrectName.util";
import { TOUR_STATUS } from "utils/tour.util";
import { Loader2 } from "lucide-react";
import {
  StadiumSelectTrigger,
  StadiumSaveButton,
} from "components/Game/Stadium";
import { useMetrica } from "next-yandex-metrica";
import { analytics } from "utils/analytics.util";
import { validTeamStructure } from "utils/validTeamStructure.util";
import { validPlayers } from "utils/validPlayers.util";

const ProfileStadiumForm = () => {
  const { reachGoal } = useMetrica();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentTeam = useSelector(selectCurrentTeam);
  const user = useSelector(selectUser);
  const currentCompetition = useSelector(selectCurrentCompetition);
  const teamConcat = useSelector(selectTeamConcat);
  const { playersCount } = useSelector((state) => state.teamPlayer);
  const { lang } = useSelector((store) => store.systemLanguage);
  const { isLoading: teamLoading } = useSelector((state) => state.currentTeam);
  const { currentTour, isLoading: tourLoading } = useSelector(
    (state) => state.tour,
  );
  const { updateTeamCaptains, isLoading: captainsLoading } =
    useUpdateTeamCaptains();

  const isLoading = useMemo(
    () => teamLoading || tourLoading || captainsLoading,
    [captainsLoading, teamLoading, tourLoading],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captains = [];
    if (!validPlayers(teamConcat, t)) return;

    teamConcat.forEach((player) => {
      if (player.is_captain) {
        captains.push(player.player_id);
      }
    });

    if (captains.length !== 1) {
      toast.warning(t("Kapitan tanlanmagan"));
      return;
    }

    if (!validTeamStructure(playersCount, t)) return;

    await updateTeamCaptains({
      team: teamConcat,
      team_id: currentTeam.id,
      tour_id: currentTour.id,
      user,
      currentCompetition,
    });
    reachGoal(analytics.changeCaptain);
  };

  if (currentTour?.status !== TOUR_STATUS.notStartedTransfer) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-accent-foreground mt-2 flex justify-between gap-x-1"
    >
      <Select
        name="formation"
        id="formation"
        value={teamConcat.find((player) => player.is_captain)?.player_id ?? ""}
        onValueChange={(value) => dispatch(setCaptain(value))}
      >
        <StadiumSelectTrigger>
          <SelectValue placeholder={t("Kapitan tanlang")} />
        </StadiumSelectTrigger>
        <SelectContent>
          {teamConcat.map(
            (player) =>
              player.name && (
                <SelectItem
                  value={player.player_id}
                  key={player.id}
                  selected={player.is_captain}
                >
                  {getCorrectName({
                    lang,
                    uz: player?.player?.name,
                    ru: player?.player?.name_ru,
                  })}
                </SelectItem>
              ),
          )}
        </SelectContent>
      </Select>
      <StadiumSaveButton type="submit" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mx-auto size-6 animate-spin" />
        ) : (
          t("Saqlash")
        )}
      </StadiumSaveButton>
    </form>
  );
};

export default ProfileStadiumForm;
