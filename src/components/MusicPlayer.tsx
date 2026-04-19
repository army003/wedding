"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => {});
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
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
      <audio ref={audioRef} loop preload="auto">
        <source src="/song-beridgertons.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
