"use client";

export function Hero() {
  return (
    <div className="relative h-[244px] bg-[#e9e3d7] border border-[#151515]/10 rounded-2xl p-4 overflow-hidden">
      <div className="text-[9px] font-extrabold tracking-[1.3px] text-[#77736b]">
        ГОРОДСКАЯ ОС
      </div>
      <div className="pixel text-[70px] tracking-[-7px] mt-4 leading-none">
        21
      </div>
      <div className="text-[9px] font-extrabold tracking-[1px]">
        КАРТА · ЛЮДИ · КВЕСТЫ · ЗНАНИЯ
      </div>

      {/* Пиксельный персонаж */}
      <div className="absolute right-8 bottom-6 w-14 h-[72px]">
        <svg viewBox="0 0 54 75" className="w-full h-full">
          <rect x="15" y="0" width="25" height="25" rx="5" fill="#151515" />
          <rect x="22" y="8" width="6" height="6" fill="#f4f0e7" />
          <rect x="32" y="8" width="6" height="6" fill="#f4f0e7" />
          <rect x="26" y="18" width="4" height="2" fill="#f4f0e7" />
          <rect x="13" y="26" width="28" height="32" rx="4" fill="#151515" />
          <rect x="13" y="36" width="28" height="4" fill="#f4f0e7" />
          <rect x="8" y="28" width="5" height="24" rx="3" fill="#151515" />
          <rect x="41" y="28" width="5" height="24" rx="3" fill="#151515" />
          <rect x="29" y="53" width="21" height="22" rx="3" fill="#151515" />
          <rect x="5" y="53" width="21" height="22" rx="3" fill="#151515" />
          <rect x="8" y="61" width="16" height="3" fill="#f4f0e7" />
          <rect x="30" y="61" width="16" height="3" fill="#f4f0e7" />
          <rect x="3" y="31" width="8" height="22" rx="2" fill="#151515" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}