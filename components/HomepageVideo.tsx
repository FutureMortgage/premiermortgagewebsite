"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./premier.module.css";

export function HomepageVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      if (motion.matches) element.pause();
      else void element.play().catch(() => {});
    };
    applyPreference();
    motion.addEventListener("change", applyPreference);
    return () => { motion.removeEventListener("change", applyPreference); element.pause(); };
  }, []);

  return <div className={styles.houseVisual}>
    <video ref={video} className={styles.homeVideo} poster="/premier-homepage-poster.jpg" muted loop playsInline preload="metadata" aria-label="Premier Mortgage Resources homepage film" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)}>
      <source src="/premier-homepage.mp4" type="video/mp4" />
    </video>
    <span className={styles.photoTag}>ROOM FOR WHAT’S NEXT</span>
    {!failed && <button type="button" className={styles.videoControl} aria-label={playing ? "Pause video" : "Play video"} onClick={() => {
      const element = video.current;
      if (!element) return;
      if (element.paused) void element.play().catch(() => setPlaying(false));
      else element.pause();
    }}><span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>{playing ? "Pause" : "Play"}</button>}
  </div>;
}
