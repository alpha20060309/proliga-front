"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PlayerStatisticsTable from "./Table";
import PlayerPhoto from "./PlayerPhoto";
import { Dialog, DialogContent, DialogDescription } from "components/ui/dialog";
import { getCorrentPlayerPosition } from "utils/getCorrectPlayerPosition.utils";
import { setPlayerInfoModal } from "lib/features/teamPlayer/teamPlayer.slice";
import {
  selectCurrentPlayer,
  selectPlayerMatches,
} from "lib/features/player/player.selector";
import { memo } from "react";
import { supabase } from "lib/supabaseClient";
import { overrideCurrentPlayer } from "lib/features/player/player.slice";
import { fetchPlayerMatches } from "lib/features/player/player.thunk";
import { usePathname } from "next/navigation";

const PlayerInfo = () => {
  const path = usePathname();
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);
  const { infoModal } = useSelector((store) => store.teamPlayer);
  const { lang } = useSelector((store) => store.systemLanguage);
  const matches = useSelector(selectPlayerMatches);
  const { t } = useTranslation();
  const competition_id = +path.split("/")[3] || 0;

  const setModalOpen = () => {
    dispatch(setPlayerInfoModal(false));
  };

  useEffect(() => {
    if (infoModal && currentPlayer?.id) {
      dispatch(
        fetchPlayerMatches({ player_id: currentPlayer?.id, competition_id }),
      );
    }
  }, [infoModal, currentPlayer?.id, dispatch, competition_id]);

  useEffect(() => {
    const fetchPlayer = async () => {
      const { data, error } = await supabase
        .from("player")
        .select("*, club(id, name, slug, name_ru, logo_img, form_img)")
        .eq("id", currentPlayer.id)
        .single();

      if (error) {
        console.log(error);
      }

      if (data) {
        dispatch(overrideCurrentPlayer(data));
      }
    };
    if (infoModal && currentPlayer?.id && !currentPlayer?.price) {
      fetchPlayer();
    }
  }, [infoModal, currentPlayer, dispatch]);

  return (
    <Dialog
      open={infoModal && currentPlayer?.id && currentPlayer?.price}
      onOpenChange={setModalOpen}
    >
      <DialogContent className="overflox-y-auto xs:mx-auto border-border 2xl:max-w-6xl: flex max-h-[90vh] min-h-[50vh] w-full max-w-4xl flex-col gap-4 overflow-y-auto rounded-xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <PlayerPhoto
          currentPlayer={currentPlayer}
          position={getCorrentPlayerPosition(
            currentPlayer?.position,
            lang,
            "full",
          )}
        />
        <PlayerStatisticsTable matches={matches} />
        <div className="mt-auto flex flex-wrap justify-center gap-x-1 gap-y-0 text-xs text-nowrap md:gap-x-2 md:text-sm">
          <div>
            <span>{t("QO'")}</span> - {t("Quriq Oyin")},
          </div>
          <div>
            <span>{t("QP")}</span> - {t("Qaytarilagian Penalti")},
          </div>
          <div>
            <span>{t("AG")}</span> - {t("Avto Gol")},
          </div>
          <div>
            <span>{t("O'2")}</span> -{" "}
            {t("O‘tkazib yuborilgan har 2 to‘p farqi")},
          </div>
          <div>
            <span>{t("G")}</span> - {t("Gol")},
          </div>
          <div>
            <span>{t("GA")}</span> - {t("Gol Assist")},
          </div>
          <div>
            <span>{t("SK")}</span> - {t("Sariq kartochka")},
          </div>
          <div>
            <span>{t("QZ")}</span> - {t("Qizil kartochka")},
          </div>
          <div>
            <span>{t("MIN")}</span> - {t("Daqiqani o‘yinda o‘tkazdi")},
          </div>
          <div>
            <span>{t("O")}</span> - {t("Ochko")}
          </div>
        </div>
        <DialogDescription className="sr-only">
          Oyinchi haqida malumot
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default memo(PlayerInfo);
