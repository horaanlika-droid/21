"use client"

import { useState, useCallback } from "react"
import { StatusBar } from "@/components/os/primitives"
import { BottomNav, type NavKey } from "@/components/os/bottom-nav"
import { HomeScreen } from "@/components/os/screens/home-screen"
import { MapScreen } from "@/components/os/screens/map-screen"
import { TasksScreen } from "@/components/os/screens/tasks-screen"
import { EncyclopediaScreen } from "@/components/os/screens/encyclopedia-screen"
import { ForumScreen } from "@/components/os/screens/forum-screen"
import { CrowdfundingScreen } from "@/components/os/screens/crowdfunding-screen"
import { BudgetScreen } from "@/components/os/screens/budget-screen"
import { ThanksScreen } from "@/components/os/screens/thanks-screen"
import { AiAssistant } from "@/components/os/screens/ai-assistant"
import { TASKS, type Task } from "@/lib/os-data"

export type View =
  | "profile"
  | "map"
  | "encyclopedia"
  | "forum"
  | "tasks"
  | "crowdfunding"
  | "budget"
  | "thanks"

const LEVEL_NEED = 3000

export default function Page() {
  const [view, setView] = useState<View>("profile")
  const [aiOpen, setAiOpen] = useState(false)
  const [karma, setKarma] = useState(2430)
  const [xp, setXp] = useState(1820)
  const [level, setLevel] = useState(58)
  const [levelCurrent, setLevelCurrent] = useState(2430)
  const [done, setDone] = useState<Set<number>>(new Set())
  const [reward, setReward] = useState<Task | null>(null)

  const activeCount = TASKS.length - done.size

  const completeTask = useCallback((t: Task) => {
    setDone((prev) => {
      if (prev.has(t.id)) return prev
      const next = new Set(prev)
      next.add(t.id)
      return next
    })
    setKarma((k) => k + t.karma)
    setXp((x) => x + t.xp)
    setLevelCurrent((c) => {
      let nc = c + t.xp
      if (nc >= LEVEL_NEED) {
        nc -= LEVEL_NEED
        setLevel((l) => l + 1)
      }
      return nc
    })
    setReward(t)
    setTimeout(() => setReward(null), 1900)
  }, [])

  const navKey: NavKey = (["map", "encyclopedia", "forum"].includes(view) ? view : "profile") as NavKey

  function onNav(k: NavKey) {
    setView(k === "profile" ? "profile" : (k as View))
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-muted-foreground/20 p-0 sm:p-6">
      {/* Phone frame */}
      <div className="relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden border-border bg-background sm:h-[900px] sm:border-4 sm:pixel-shadow">
        <StatusBar />

        <div className="relative flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-none">
            {view === "profile" && (
              <HomeScreen
                karma={karma}
                xp={xp}
                level={level}
                levelCurrent={levelCurrent}
                levelNeed={LEVEL_NEED}
                activeCount={activeCount}
                onNavigate={setView}
                onOpenAi={() => setAiOpen(true)}
              />
            )}
            {view === "map" && <MapScreen />}
            {view === "encyclopedia" && <EncyclopediaScreen />}
            {view === "forum" && <ForumScreen />}
            {view === "tasks" && (
              <TasksScreen done={done} onComplete={completeTask} onBack={() => setView("profile")} />
            )}
            {view === "crowdfunding" && <CrowdfundingScreen onBack={() => setView("profile")} />}
            {view === "budget" && <BudgetScreen onBack={() => setView("profile")} />}
            {view === "thanks" && <ThanksScreen onDone={() => setView("profile")} />}
          </div>

          <AiAssistant open={aiOpen} onClose={() => setAiOpen(false)} />

          {/* Reward toast */}
          {reward && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-40 flex justify-center px-4">
              <div className="flex items-center gap-3 border-2 border-border bg-foreground px-4 py-3 text-background pixel-shadow">
                <reward.icon className="h-6 w-6 shrink-0" strokeWidth={2.5} />
                <div className="text-left">
                  <p className="font-display text-sm font-bold uppercase leading-tight">Задача выполнена!</p>
                  <p className="text-[11px] font-bold uppercase tabular-nums">
                    +{reward.xp} XP · +{reward.karma} кармы
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <BottomNav active={navKey} onChange={onNav} />
      </div>
    </main>
  )
}
