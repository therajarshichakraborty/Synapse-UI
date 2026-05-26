"use client";

import { motion } from "motion/react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Bot,
  Send,
  Plus,
  Settings,
  User,
  Terminal,
  Code2,
  Sparkles,
  Search,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  code?: string;
  language?: string;
}

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "user",
      text: "Can you write a React hook to calculate scroll progress?",
    },
    {
      id: "2",
      sender: "assistant",
      text: "Sure! Here is a simple, highly-efficient custom React hook `useScrollProgress` that tracks the user's vertical reading progression down the page:",
      code: `import { useState, useEffect } from "react";\n\nexport function useScrollProgress() {\n  const [progress, setProgress] = useState(0);\n\n  useEffect(() => {\n    const handleScroll = () => {\n      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;\n      const scrolled = (window.scrollY / totalHeight) * 100;\n      setProgress(scrolled);\n    };\n    \n    window.addEventListener("scroll", handleScroll);\n    return () => window.removeEventListener("scroll", handleScroll);\n  }, []);\n\n  return progress;\n}`,
      language: "typescript",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Simulate bot thinking and reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "assistant",
          text: "I am processing your query! Let me know if you would like me to optimize or adapt this component.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex overflow-hidden shadow-2xl relative" style={{ minHeight: "520px", maxHeight: "600px" }}>
      {/* Sidebar Navigation */}
      <div
        className={cn(
          "h-full border-r border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20 transition-all duration-300 flex flex-col justify-between shrink-0 relative",
          sidebarOpen ? "w-[220px]" : "w-0 overflow-hidden border-r-0",
        )}
      >
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100 text-sm">
              <Bot className="w-4 h-4 text-zinc-700 dark:text-zinc-350" />
              <span>Synapse AI</span>
            </div>
            <button className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search chat history..."
              className="w-full h-8 pl-8 pr-3 text-xs bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/80 rounded-lg focus:outline-hidden text-zinc-800 dark:text-zinc-200"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="px-4 flex-1 overflow-y-auto space-y-1">
          <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-1">
            Recent Chats
          </p>
          {[
            "Scroll Progress Hook",
            "Responsive Grid Layouts",
            "Tailwind V4 Themes",
            "AI Input Prototypes",
          ].map((title, idx) => (
            <button
              key={idx}
              className={cn(
                "w-full h-8 px-2 rounded-lg text-left text-xs font-semibold truncate flex items-center gap-2",
                idx === 0
                  ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-800/50"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/30",
              )}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{title}</span>
            </button>
          ))}
        </div>

        {/* User Footer Settings */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="leading-none">
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Arghya C.</p>
              <span className="text-[9px] text-zinc-400 dark:text-zinc-500">Free Tier</span>
            </div>
          </div>
          <button className="p-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Collapse Toggle Handle Button - sits at the boundary between sidebar and main */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="shrink-0 w-5 self-stretch flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 border-r border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors hidden lg:flex"
        aria-label="Toggle Sidebar"
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-3 h-3 text-zinc-400" />
        ) : (
          <ChevronRight className="w-3 h-3 text-zinc-400" />
        )}
      </button>

      {/* Main Conversation Window */}
      <div className="flex-1 flex flex-col justify-between bg-zinc-50/20 dark:bg-zinc-950/50">
        {/* Top Header info */}
        <div className="h-14 px-6 border-b border-zinc-200 dark:border-zinc-900 flex items-center justify-between bg-white dark:bg-zinc-950/80">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-355 border border-zinc-200 dark:border-zinc-800">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">
                React Scroll Progress
              </h4>
              <p className="text-[9px] text-zinc-400 dark:text-zinc-500">Powered by Synapse 2.5</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-650" />
            <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
              Online
            </span>
          </div>
        </div>

        {/* Message Feed Viewport */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3 max-w-[85%]",
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto",
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold",
                  msg.sender === "user"
                    ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200",
                )}
              >
                {msg.sender === "user" ? "U" : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-2">
                <div
                  className={cn(
                    "p-3 rounded-2xl text-xs leading-relaxed",
                    msg.sender === "user"
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 rounded-tr-none"
                      : "bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none shadow-xs",
                  )}
                >
                  {msg.text}
                </div>

                {msg.code && (
                  <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xs max-w-lg bg-zinc-950 text-zinc-100 font-mono text-[10px]">
                    <div className="px-4 py-2 border-b border-zinc-900 bg-zinc-900/60 flex items-center justify-between text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>{msg.language}</span>
                      </div>
                      <Code2 className="w-3.5 h-3.5 cursor-pointer hover:text-zinc-200" />
                    </div>
                    <pre className="p-4 overflow-x-auto leading-relaxed">
                      <code>{msg.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Textbox Area */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ask Synapse anything..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="w-full h-11 pl-4 pr-12 text-xs bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-hidden focus:ring-4 focus:ring-zinc-900/5 dark:focus:ring-zinc-100/5 focus:border-zinc-600 dark:focus:border-zinc-400 text-zinc-800 dark:text-zinc-100"
            />
            <button
              onClick={handleSend}
              className="absolute right-2.5 p-1.5 rounded-lg bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 hover:opacity-90 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            {["Optimize code", "Explain imports", "Add responsive styles"].map((pill, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(pill)}
                className="px-2.5 py-1 rounded-md text-[9px] font-bold border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/30 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
