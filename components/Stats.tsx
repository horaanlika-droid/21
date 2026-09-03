"use client";

interface StatsProps {
  karma: number;
  xp: number;
  done: number;
}

export function Stats({ karma, xp, done }: StatsProps) {
  const level = Math.floor(xp / 100) + 1;
  const xpPercent = Math.min((xp % 100) / 100 * 100, 100);

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <div className="border border-[#151515]/10 rounded-xl p-2 text-center bg-white/50">
          <div className="text-2xl font-extrabold">+{karma}</div>
          <div className="text-[9px] font-extrabold text-[#77736b] uppercase tracking-wide">
            карма
          </div>
        </div>
        <div className="border border-[#151515]/10 rounded-xl p-2 text-center bg-white/50">
          <div className="text-2xl font-extrabold">{xp}</div>
          <div className="text-[9px] font-extrabold text-[#77736b] uppercase tracking-wide">
            xp
          </div>
        </div>
        <div className="border border-[#151515]/10 rounded-xl p-2 text-center bg-white/50">
          <div className="text-2xl font-extrabold">{done}</div>
          <div className="text-[9px] font-extrabold text-[#77736b] uppercase tracking-wide">
            заданий
          </div>
        </div>
      </div>

      <div className="card-ink">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[9px] font-extrabold text-[#77736b] uppercase tracking-wide">
              Прогресс
            </div>
            <h2 className="text-lg font-extrabold">Уровень {level}</h2>
          </div>
          <span className="tag">◒ {Math.round(100 - xpPercent)}</span>
        </div>
        <div className="h-2 bg-[#ddd8ce] rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-[#151515] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>
    </>
  );
}