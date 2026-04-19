"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

const target = new Date("2026-07-06T13:00:00+05:00");

function calcTime(t: Date) {
  const diff = Math.max(0, t.getTime() - Date.now());
  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    days,
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

export default function CountdownSection({
  background,
}: {
  background: StaticImageData;
}) {
  const [time, setTime] = useState(() => calcTime(target));

  useEffect(() => {
    const id = setInterval(() => setTime(calcTime(target)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="wi-countdown"
      lang="kk"
      aria-label="Тойға дейінгі уақыт"
    >
      <Image
        className="wi-countdown__bg"
        src={background}
        alt=""
        fill
        sizes="(max-width: 500px) 100vw, 500px"
        placeholder="blur"
      />
      <div className="wi-countdown__inner">
        <p className="wi-countdown__title">Тойға дейін қалды:</p>
        <div className="wi-countdown__grid" role="timer" aria-live="off">
          {(
            [
              { value: time.days, label: "күн" },
              { value: time.hours, label: "сағат" },
              { value: time.minutes, label: "минут" },
              { value: time.seconds, label: "секунд" },
            ] as const
          ).map(({ value, label }) => (
            <div key={label} className="wi-countdown__unit">
              <span className="wi-countdown__value">{value}</span>
              <span className="wi-countdown__label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
