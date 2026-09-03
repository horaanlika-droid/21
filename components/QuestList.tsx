"use client";

import { Quest } from "@/lib/store";
import { useStore } from "@/lib/store";

interface QuestListProps {
  quests: Quest[];
  full?: boolean;
}

export function QuestList({ quests, full = false }: QuestListProps) {
  const { completeQuest } = useStore();
  const activeQuests = quests.filter((q) => !q.done);
  const displayQuests = full ? quests : activeQuests.slice(0, 3);

  if (displayQuests.length === 0) {
    return (
      <div className="card-ink">
        <p className="text-sm text-[#77736b]">Нет активных квестов</p>
      </div>
    );
  }

  return (
    <div className="card-ink">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-bold">Активные квесты</h2>
        <span className="text-sm text-[#77736b]">{activeQuests.length}</span>
      </div>
      {displayQuests.map((quest) => (
        <div
          key={quest.id}
          className="flex items-center gap-3 py-3 border-b border-[#151515]/10 last:border-0"
        >
          <div className="w-10 h-10 flex items-center justify-center border border-[#151515] rounded-xl bg-[#fbfaf7] text-lg">
            {quest.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm">{quest.title}</div>
            <div className="text-xs text-[#77736b]">{quest.desc}</div>
          </div>
          <div className="text-right text-[10px] font-extrabold whitespace-nowrap leading-tight">
            +{quest.xp} XP
            <br />+{quest.k} ◉
          </div>
          {!quest.done && (
            <button
              className="w-8 h-8 flex items-center justify-center border border-[#151515] rounded-xl bg-[#151515] text-[#f4f0e7] text-sm font-extrabold hover:bg-[#333] transition-colors active:scale-95"
              onClick={() => completeQuest(quest.id)}
            >
              →
            </button>
          )}
          {quest.done && (
            <span className="text-sm font-extrabold text-[#77736b]">✓</span>
          )}
        </div>
      ))}
    </div>
  );
}