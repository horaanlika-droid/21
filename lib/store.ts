import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Quest {
  id: number;
  icon: string;
  title: string;
  desc: string;
  xp: number;
  k: number;
  skill: string;
  item: string;
  ii: string;
  done: boolean;
}

export interface Point {
  a: number;
  b: number;
  t: string;
  x: string;
}

interface StoreState {
  karma: number;
  xp: number;
  done: number;
  quests: Quest[];
  points: Point[];
  isVolunteer: boolean;
  character: {
    name: string;
    accessory: string;
    skills: { repair: number; help: number; books: number };
  };
  loadState: () => void;
  completeQuest: (id: number) => void;
  addPoint: (point: Point) => void;
  addKarma: (amount: number) => void;
  addXP: (amount: number) => void;
}

const defaultQuests: Quest[] = [
  {
    id: 1,
    icon: "▱",
    title: "Починить скамейку",
    desc: "двор · 12 мин",
    xp: 50,
    k: 10,
    skill: "repair",
    item: "Серебряный болт",
    ii: "⚙",
    done: false,
  },
  {
    id: 2,
    icon: "◌",
    title: "Помочь соседу",
    desc: "перенести коробки",
    xp: 40,
    k: 8,
    skill: "help",
    item: "Красная нить",
    ii: "〰",
    done: false,
  },
  {
    id: 3,
    icon: "▤",
    title: "Обменяться книгами",
    desc: "полка у подъезда",
    xp: 30,
    k: 5,
    skill: "books",
    item: "Значок 21",
    ii: "21",
    done: false,
  },
  {
    id: 4,
    icon: "△",
    title: "Пройти мастер-класс",
    desc: "мастерская · 18:30",
    xp: 60,
    k: 15,
    skill: "repair",
    item: "Мини-рулетка",
    ii: "⌁",
    done: false,
  },
];

const defaultPoints: Point[] = [
  { a: 55.7512, b: 37.6184, t: "⚠", x: "Яма на дороге" },
  { a: 55.7558, b: 37.6177, t: "+", x: "Помощь соседу" },
  { a: 55.7495, b: 37.625, t: "21", x: "Стикер 21" },
];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      karma: 0,
      xp: 0,
      done: 0,
      quests: defaultQuests,
      points: defaultPoints,
      isVolunteer: false,
      character: {
        name: "Исследователь",
        accessory: "⌁",
        skills: { repair: 0, help: 0, books: 0 },
      },

      loadState: () => {
        // уже загружено через persist
      },

      completeQuest: (id: number) => {
        const { quests, xp, karma, done, character } = get();
        const quest = quests.find((q) => q.id === id);
        if (!quest || quest.done) return;

        const updatedQuests = quests.map((q) =>
          q.id === id ? { ...q, done: true } : q
        );

        set({
          quests: updatedQuests,
          xp: xp + quest.xp,
          karma: karma + quest.k,
          done: done + 1,
          character: {
            ...character,
            skills: {
              ...character.skills,
              [quest.skill]: Math.min(100, character.skills[quest.skill] + 10),
            },
          },
        });
      },

      addPoint: (point: Point) => {
        set((state) => ({
          points: [...state.points, point],
        }));
      },

      addKarma: (amount: number) => {
        set((state) => ({
          karma: state.karma + amount,
        }));
      },

      addXP: (amount: number) => {
        set((state) => ({
          xp: state.xp + amount,
        }));
      },
    }),
    {
      name: "21-storage",
    }
  )
);