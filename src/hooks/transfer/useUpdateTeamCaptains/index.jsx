import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../../lib/supabaseClient";
import { fetchTeamPlayers } from "lib/features/teamPlayer/teamPlayer.thunk";
import { useTranslation } from "react-i18next";

export const useUpdateTeamCaptains = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { ids } = useSelector((store) => store.teamPlayer);

  const updateTeamCaptains = useCallback(
    async ({ team, team_id, tour_id, currentCompetition, user }) => {
      setIsLoading(false);
      setError(null);

      try {
        setIsLoading(true);

        const newTeam = team.map((player) => ({
          id: player.id,
          team_id,
          tour_id,
          user_id: user.id,
          is_captain: player.is_captain,
        }));
        const newTeamIds = team.map((p) => p.id);

        // Compare ids array with newTeamIds to ensure they have the same values
        const areIdsEqual =
          JSON.stringify([...ids].sort()) ===
          JSON.stringify([...newTeamIds].sort());

        if (!areIdsEqual) {
          setError("Jamoa formatsiyasi notogri");
          return toast.error(t("Jamoa formatsiyasi notogri"));
        }

        if (newTeam?.length !== 11) {
          setError("Incorrect team");
          return toast.error(t("Jamoa formatsiyasi notogri"));
        }

        const { data, error } = await supabase
          .from("team_player")
          .upsert(newTeam)
          .select();

        if (error) {
          setError(
            error instanceof Error
              ? error.message
              : t("An unknown error occurred"),
          );
          toast.error(
            error instanceof Error
              ? error.message
              : t("An unknown error occurred"),
          );
          return;
        }
        if (data) {
          dispatch(
            fetchTeamPlayers({
              team_id,
              tour_id,
              competition_id: currentCompetition.id,
            }),
          );
          toast.success(t("Kapitan yangilandi"));
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : t("An unknown error occurred"),
        );
        toast.error(
          error instanceof Error
            ? error.message
            : t("An unknown error occurred"),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, t, ids],
  );
  return { updateTeamCaptains, isLoading, error };
};
