"use client";

interface NavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", label: "ГЛАВНАЯ", icon: "⌂" },
  { id: "map", label: "КАРТА", icon: "⌖" },
  { id: "quests", label: "КВЕСТЫ", icon: "✦" },
  { id: "ency", label: "ЗНАНИЯ", icon: "▤" },
  { id: "profile", label: "ПРОФИЛЬ", icon: "♙" },
];

export function Nav({ activeTab, onTabChange }: NavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 h-[78px] px-3 pt-2 pb-3 bg-[#faf8f3ed] backdrop-blur-lg border-t border-[#151515]/10 grid grid-cols-5">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex flex-col items-center justify-center gap-1 rounded-xl text-[9px] font-extrabold transition-all duration-200 ${
            activeTab === tab.id
              ? "text-[#151515] bg-[#00000009] scale-[0.97]"
              : "text-[#8a867e] hover:text-[#151515]"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="text-xl leading-none">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}