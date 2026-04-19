"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const tryPlay = () => audio.play().catch(() => {});

    const onCanPlay = () => tryPlay();
    audio.addEventListener("canplay", onCanPlay);

    let removeGestureUnlock: (() => void) | undefined;
    void audio.play().catch(() => {
      const resume = () => {
        tryPlay();
        removeGestureUnlock?.();
      };
      document.addEventListener("pointerdown", resume, { passive: true });
      removeGestureUnlock = () =>
        document.removeEventListener("pointerdown", resume);
    });

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("canplay", onCanPlay);
      removeGestureUnlock?.();
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  return (
    <>
      <button
        type="button"
        className="wi-music-btn"
        onClick={toggleMusic}
        aria-pressed={playing}
        aria-label={playing ? "Музыканы тоқтату" : "Музыканы қосу"}
        title="Музыка"
      >
        {playing ? "⏸" : "♪"}
      </button>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        autoPlay
        playsInline
      >
        <source src="/song-beridgertons.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
