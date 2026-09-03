"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { QuestList } from "@/components/QuestList";
import { Map } from "@/components/Map";
import { Nav } from "@/components/Nav";
import { useStore } from "@/lib/store";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const { karma, xp, done, quests, loadState } = useStore();

  useEffect(() => {
    loadState();
  }, [loadState]);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <Hero />
            <Stats karma={karma} xp={xp} done={done} />
            <QuestList quests={quests} />
          </>
        );
      case "map":
        return <Map />;
      case "quests":
        return (
          <div className="card-ink">
            <h2 className="text-lg font-bold mb-2">Все квесты</h2>
            <QuestList quests={quests} full />
          </div>
        );
      case "ency":
        return (
          <div className="card-ink">
            <h2 className="text-lg font-bold mb-2">Энциклопедия</h2>
            <p className="text-sm text-[#77736b]">Скоро здесь будут статьи</p>
          </div>
        );
      case "profile":
        return (
          <div className="card-ink">
            <h2 className="text-lg font-bold mb-2">Профиль</h2>
            <p className="text-sm text-[#77736b]">Карма: +{karma}</p>
            <p className="text-sm text-[#77736b]">XP: {xp}</p>
            <p className="text-sm text-[#77736b]">Заданий: {done}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full max-w-[393px] h-[852px] bg-[#080808] rounded-[46px] p-[9px] shadow-2xl mx-auto">
      <div className="relative h-full bg-[#f4f0e7] rounded-[38px] overflow-hidden">
        {/* E-ink текстура */}
        <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.06] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.8%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')] mix-blend-multiply" />

        <div className="relative z-10 h-full overflow-y-auto px-4 pb-[92px] pt-12 scrollbar-hide fade-in">
          <Header />
          <div className="mt-4 space-y-3">{renderContent()}</div>
        </div>

        <Nav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}