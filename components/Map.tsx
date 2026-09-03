"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";

declare global {
  interface Window {
    ymaps: any;
  }
}

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { points, addPoint } = useStore();
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_API_KEY}&lang=ru_RU`;
    script.async = true;

    script.onload = () => {
      if (typeof window.ymaps !== "undefined") {
        window.ymaps.ready(() => {
          const map = new window.ymaps.Map(mapRef.current, {
            center: [55.751244, 37.618423],
            zoom: 13,
            controls: ["zoomControl"],
          });

          map.controls.remove("searchControl");
          map.controls.remove("trafficControl");
          map.controls.remove("typeSelector");
          map.controls.remove("fullscreenControl");
          map.controls.remove("rulerControl");

          // Добавляем маркеры
          points.forEach((p: any) => {
            const placemark = new window.ymaps.Placemark(
              [p.a, p.b],
              {
                balloonContent: `<b>${p.x}</b><br><small>21 · район</small>`,
                hintContent: p.x,
              },
              {
                iconLayout: "default#image",
                iconImageHref:
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="15" fill="#151515" stroke="#f4f0e7" stroke-width="2"/><text x="16" y="21" text-anchor="middle" font-family="'Press Start 2P',monospace" font-size="12" fill="#f4f0e7">${p.t}</text></svg>`
                  ),
                iconImageSize: [32, 32],
                iconImageOffset: [-16, -16],
              }
            );
            map.geoObjects.add(placemark);
          });

          // Добавление точки по клику
          let clickMode = false;
          const enableClick = () => {
            clickMode = true;
            alert("Кликни на карте, чтобы добавить точку");
          };

          map.events.add("click", (e: any) => {
            if (!clickMode) return;
            const coords = e.get("coords");
            const label = prompt("Название точки:", "Новая точка");
            if (label) {
              const placemark = new window.ymaps.Placemark(
                coords,
                {
                  balloonContent: `<b>${label}</b><br><small>21 · район</small>`,
                  hintContent: label,
                },
                {
                  iconLayout: "default#image",
                  iconImageHref:
                    "data:image/svg+xml;charset=UTF-8," +
                    encodeURIComponent(
                      `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="15" fill="#151515" stroke="#f4f0e7" stroke-width="2"/><text x="16" y="21" text-anchor="middle" font-family="'Press Start 2P',monospace" font-size="12" fill="#f4f0e7">+</text></svg>`
                    ),
                  iconImageSize: [32, 32],
                  iconImageOffset: [-16, -16],
                }
              );
              map.geoObjects.add(placemark);
              addPoint({ a: coords[0], b: coords[1], t: "+", x: label });
            }
            clickMode = false;
            map.events.remove("click");
          });

          // Кнопка добавления
          const addButton = document.querySelector("#map-add-btn");
          if (addButton) {
            addButton.addEventListener("click", enableClick);
          }

          setMapLoaded(true);
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [points, addPoint]);

  return (
    <div className="card-ink !p-0 overflow-hidden" style={{ padding: 0 }}>
      <div ref={mapRef} className="w-full h-[430px] ymap-container" />
    </div>
  );
}