"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PandaSVG } from "./panda-svg";
import { ChatWindow } from "./chat-window";
import { usePandaBehavior } from "./use-panda-behavior";

export function PandaMascot() {
  const [chatOpen, setChatOpen] = useState(false);
  const panda = usePandaBehavior(chatOpen);

  return (
    <>
      {/* Panda character */}
      <motion.button
        type="button"
        onClick={() => setChatOpen((o) => !o)}
        className="fixed z-40 cursor-pointer select-none outline-none drop-shadow-lg transition-[filter] hover:drop-shadow-xl"
        style={{
          left: `${panda.x}%`,
          top: `${panda.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          left: `${panda.x}%`,
          top: `${panda.y}%`,
        }}
        transition={{ duration: 0.15, ease: "linear" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with Panda"
      >
        {/* Idle breathing animation */}
        <motion.div
          animate={
            panda.pose === "idle" || panda.pose === "sit"
              ? { y: [0, -3, 0] }
              : panda.pose === "sleep"
                ? { y: [0, -1, 0], rotate: [0, 2, 0, -2, 0] }
                : {}
          }
          transition={{
            duration: panda.pose === "sleep" ? 3 : 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <PandaSVG
            pose={panda.pose}
            direction={panda.direction}
            size={70}
          />
        </motion.div>

        {/* Speech bubble when not chatting */}
        {!chatOpen && panda.pose === "wave" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground shadow-md border border-border"
          >
            👋 Hi!
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ChatWindow open={chatOpen} onClose={() => setChatOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
