"use client";

import React from "react";
import DropdownButton from "./DropDownButton";

type HeaderProps = {
  showSkillMap: boolean;
  showGrowth: boolean;
  showCompare: boolean;
  onSkillMap: () => void;
  onGrowth: () => void;
  onCompare: () => void;
};

export default function OptionBar({showSkillMap,showGrowth,showCompare,onSkillMap,onGrowth,onCompare}:HeaderProps) {
  const baseBtn="text-white text-[12px] w-[80%] h-[80%] border-white border-2 rounded-[40px] transition-all duration-300";
  const activeBtn="shadow-[0_0_18px_rgba(255,255,255,0.85)]";
  const inactiveBtn="shadow-[0_0_12px_rgba(0,0,0,0.9)] opacity-80";

  return (
    <header className="flex justify-between w-full">
      <div className="w-[30%] grid grid-cols-3 m-5">
        <button className={`${baseBtn} ${showSkillMap ? activeBtn : inactiveBtn}`} type="button" onClick={onSkillMap}>
          SKILLMAP
        </button>

        <button
          className={`${baseBtn} ${showGrowth ? activeBtn : inactiveBtn}`} type="button" onClick={onGrowth}>
          GROWTH
        </button>

        <button
          className={`${baseBtn} ${showCompare ? activeBtn : inactiveBtn}`} type="button" onClick={onCompare}>
          COMPARE
        </button>
      </div>

      <div className="my-5 mx-20">
        <DropdownButton />
      </div>
    </header>
  );
}
