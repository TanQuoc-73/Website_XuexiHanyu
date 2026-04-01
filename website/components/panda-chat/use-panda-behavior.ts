"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { PandaPose } from "./panda-svg";

export interface PandaState {
  x: number;
  y: number;
  pose: PandaPose;
  direction: "left" | "right";
}

interface BehaviorConfig {
  pose: PandaPose;
  duration: [number, number]; // min, max ms
  movement?: "walk" | "climb-up" | "climb-down" | "none";
}

const PANDA_SIZE = 80;
const BEHAVIORS: BehaviorConfig[] = [
  { pose: "idle", duration: [2000, 5000], movement: "none" },
  { pose: "walk", duration: [3000, 6000], movement: "walk" },
  { pose: "sit", duration: [3000, 7000], movement: "none" },
  { pose: "wave", duration: [1500, 3000], movement: "none" },
  { pose: "sleep", duration: [4000, 8000], movement: "none" },
  { pose: "climb", duration: [2500, 5000], movement: "climb-up" },
  { pose: "climb", duration: [2000, 4000], movement: "climb-down" },
  { pose: "peek", duration: [1500, 3000], movement: "none" },
];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pickBehavior(current: PandaState): BehaviorConfig {
  // Weight behaviors based on position
  const atBottom = current.y > 80;
  const atRight = current.x > 85;
  const isClimbing = current.pose === "climb";

  let pool = [...BEHAVIORS];

  // Can only climb when near right edge
  if (!atRight && !isClimbing) {
    pool = pool.filter((b) => b.movement !== "climb-up" && b.movement !== "climb-down");
  }
  // Don't climb down if at bottom
  if (atBottom) {
    pool = pool.filter((b) => b.movement !== "climb-down");
  }
  // Don't climb up if already high
  if (current.y < 20) {
    pool = pool.filter((b) => b.movement !== "climb-up");
  }

  // Favor walking over standing still sometimes
  const weights = pool.map((b) => {
    if (b.pose === "walk") return 2.5;
    if (b.pose === "idle") return 2;
    if (b.pose === "sit") return 1.5;
    if (b.pose === "wave") return 1;
    if (b.pose === "sleep") return 0.8;
    if (b.pose === "climb") return 1.2;
    if (b.pose === "peek") return 1;
    return 1;
  });

  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[0];
}

function getScreenBounds() {
  if (typeof window === "undefined") return { w: 100, h: 100 };
  return { w: window.innerWidth, h: window.innerHeight };
}

export function usePandaBehavior(chatOpen: boolean): PandaState {
  const [state, setState] = useState<PandaState>({
    x: 85,
    y: 85,
    pose: "idle",
    direction: "right",
  });
  const animFrameRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const targetRef = useRef({ x: 85, y: 85 });
  const startPosRef = useRef({ x: 85, y: 85 });
  const startTimeRef = useRef(0);
  const durationRef = useRef(3000);

  const runBehavior = useCallback(() => {
    if (chatOpen) {
      setState((prev) => ({ ...prev, pose: "sit", direction: "right" }));
      return;
    }

    setState((prev) => {
      const behavior = pickBehavior(prev);
      const duration = rand(behavior.duration[0], behavior.duration[1]);
      durationRef.current = duration;
      startTimeRef.current = performance.now();
      startPosRef.current = { x: prev.x, y: prev.y };

      let targetX = prev.x;
      let targetY = prev.y;
      let direction = prev.direction;

      switch (behavior.movement) {
        case "walk": {
          // Walk horizontally, stay away from edges
          const walkDist = rand(10, 30);
          const goRight = prev.x < 50 ? Math.random() > 0.3 : Math.random() > 0.7;
          direction = goRight ? "right" : "left";
          targetX = goRight
            ? Math.min(prev.x + walkDist, 90)
            : Math.max(prev.x - walkDist, 2);
          targetY = Math.min(Math.max(prev.y, 80), 90); // Settle to bottom while walking
          break;
        }
        case "climb-up": {
          targetX = Math.max(prev.x, 85); // Move to right edge
          targetY = Math.max(prev.y - rand(15, 35), 10);
          direction = "right";
          break;
        }
        case "climb-down": {
          targetY = Math.min(prev.y + rand(15, 30), 85);
          direction = "right";
          break;
        }
        default:
          break;
      }

      targetRef.current = { x: targetX, y: targetY };

      // Schedule next behavior
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(runBehavior, duration);

      return {
        ...prev,
        pose: behavior.pose,
        direction,
      };
    });
  }, [chatOpen]);

  // Interpolate position with animation frame
  useEffect(() => {
    let running = true;

    function tick() {
      if (!running) return;

      const elapsed = performance.now() - startTimeRef.current;
      const progress = Math.min(elapsed / durationRef.current, 1);
      // Ease in-out
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const x = startPosRef.current.x + (targetRef.current.x - startPosRef.current.x) * eased;
      const y = startPosRef.current.y + (targetRef.current.y - startPosRef.current.y) * eased;

      setState((prev) => ({
        ...prev,
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
      }));

      animFrameRef.current = requestAnimationFrame(tick);
    }

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Start behavior loop
  useEffect(() => {
    const initialDelay = setTimeout(runBehavior, 1500);
    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeoutRef.current);
    };
  }, [runBehavior]);

  // When chat opens, snap to corner
  useEffect(() => {
    if (chatOpen) {
      targetRef.current = { x: 85, y: 78 };
      startPosRef.current = { x: state.x, y: state.y };
      startTimeRef.current = performance.now();
      durationRef.current = 600;
      setState((prev) => ({ ...prev, pose: "sit", direction: "right" }));
      clearTimeout(timeoutRef.current);
    } else {
      // Resume behavior
      const delay = setTimeout(runBehavior, 800);
      return () => clearTimeout(delay);
    }
  }, [chatOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}
