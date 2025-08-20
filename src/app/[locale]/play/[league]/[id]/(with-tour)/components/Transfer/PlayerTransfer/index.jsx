"use client";

import { useTranslation } from "react-i18next";
import PlayerTable from "./Table";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogDescription,
} from "components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerTransferModal } from "lib/features/teamPlayer/teamPlayer.slice";
import { selectCurrentPlayer } from "lib/features/player/player.selector";
import { memo, useEffect } from "react";
import { supabase } from "lib/supabaseClient";
import { overrideCurrentPlayer } from "lib/features/player/player.slice";

const PlayerTransfer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { transferModal } = useSelector((store) => store.teamPlayer);
  const currentPlayer = useSelector(selectCurrentPlayer);

  const setModalOpen = () => {
    dispatch(setPlayerTransferModal(false));
  };

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
    if (transferModal && currentPlayer?.id && !currentPlayer?.price) {
      fetchPlayer();
    }
  }, [transferModal, currentPlayer, dispatch]);

  return (
    <Dialog
      open={transferModal && currentPlayer?.id && currentPlayer?.price}
      onOpenChange={setModalOpen}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="text-foreground flex max-h-[85vh] min-h-134 w-full max-w-max flex-col gap-4 overflow-y-auto rounded-xl px-4 py-6 sm:max-w-3xl md:p-6 xl:max-h-180"
      >
        <DialogTitle>{t("Transfer Amalga Oshirish")}</DialogTitle>
        <PlayerTable />
        <DialogDescription className="sr-only">
          This is a players transfer table
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default memo(PlayerTransfer);
