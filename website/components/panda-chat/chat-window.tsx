"use client";

import { useRef, useEffect, useState, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { useTranslations, useLocale } from "next-intl";
import { Send, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatWindowProps {
  open: boolean;
  onClose: () => void;
}

export function ChatWindow({ open, onClose }: ChatWindowProps) {
  const t = useTranslations("pandaChat");
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new TextStreamChatTransport({
      api: "/api/chat",
      body: { locale },
    }),
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant" as const,
          parts: [{ type: "text" as const, text: t("replies.default") }],
        },
      ]);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Greeting on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          parts: [{ type: "text" as const, text: t("greeting") }],
        },
      ]);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text });
  };

  // Extract text from message parts
  const getMessageText = (msg: (typeof messages)[number]) => {
    return msg.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("") || "";
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 flex w-[340px] flex-col rounded-2xl border border-border bg-background shadow-2xl sm:right-6">
      {/* Header */}
      <div className="flex items-center gap-2 rounded-t-2xl bg-gradient-to-r from-red-600 to-orange-500 px-4 py-3">
        <span className="text-2xl">🐼</span>
        <div className="flex-1">
          <p className="text-sm font-bold text-white">{t("name")}</p>
          <p className="text-[10px] text-red-100">{t("subtitle")}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          aria-label="Close chat"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3" style={{ maxHeight: 320, minHeight: 200 }}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && <span className="mr-1.5 mt-1 shrink-0 text-lg">🐼</span>}
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}
            >
              {getMessageText(msg)}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex justify-start">
            <span className="mr-1.5 mt-1 shrink-0 text-lg">🐼</span>
            <div className="rounded-2xl rounded-bl-md bg-muted px-3.5 py-2">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border px-3 py-2.5"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("placeholder")}
          disabled={isLoading}
          className="flex-1 rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 disabled:opacity-50"
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="size-9 shrink-0 rounded-xl">
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
}
