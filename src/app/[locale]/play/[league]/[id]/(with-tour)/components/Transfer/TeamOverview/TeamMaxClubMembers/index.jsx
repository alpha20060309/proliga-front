import TeamMaxClubMembersModal from "./Modal";
import { MoveUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setClubModal } from "lib/features/teamPlayer/teamPlayer.slice";
import { selectCurrentTeam } from "lib/features/currentTeam/currentTeam.selector";
import MotionNumber from "components/MotionNumber";
import { useMetrica } from "next-yandex-metrica";
import { analytics } from "utils/analytics.util";
import { PACKAGE_TYPE } from "utils/packages.util";

export default function TeamMaxClubMembers() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentTeam = useSelector(selectCurrentTeam);
  const { clubModal } = useSelector((state) => state.teamPlayer);
  const { reachGoal } = useMetrica();

  const handleClick = () => {
    reachGoal(analytics.seePackage, { type: PACKAGE_TYPE.single_club_count });
    dispatch(setClubModal(!clubModal));
  };

  return (
    <>
      <div
        className="group w-full cursor-pointer capitalize lg:w-auto"
        onClick={handleClick}
      >
        <header className="text-muted-foreground group-hover:text-foreground flex transition-all group-hover:underline">
          <h3
            title="Maksimum sotib olish mumkin bolgan o'yinchilar"
            className="text-xs sm:text-xs lg:text-xs 2xl:text-sm"
          >
            {t("Bir jamoadan")}
          </h3>
          <MoveUp className="text-muted-foreground group-hover:text-foreground xs:size-4 size-3.5 translate-x-0 rotate-45 self-center transition-all group-hover:translate-x-1" />
        </header>
        <p className="text-foreground text-2xl font-bold xl:text-3xl">
          <MotionNumber value={currentTeam?.transfers_from_one_team ?? 0} />
        </p>
      </div>
      <TeamMaxClubMembersModal />
    </>
  );
}
