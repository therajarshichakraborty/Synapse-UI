"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

interface Input07Props {
  length?: number;
  onComplete?: (otp: string) => void;
  error?: boolean;
}

export default function Input_07({ length = 6, onComplete, error = false }: Input07Props) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const [shake, setShake] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    const lastChar = val.substring(val.length - 1);

    // Only allow numbers
    if (lastChar && !/^\d+$/.test(lastChar)) return;

    const newValues = [...values];
    newValues[index] = lastChar;
    setValues(newValues);

    // Auto-focus next field
    if (lastChar !== "" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Trigger onComplete when all fields are filled
    const completeCode = newValues.join("");
    if (completeCode.length === length && onComplete) {
      onComplete(completeCode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (values[index] === "" && index > 0) {
        // Move focus back
        inputsRef.current[index - 1]?.focus();
        const newValues = [...values];
        newValues[index - 1] = "";
        setValues(newValues);
      } else {
        const newValues = [...values];
        newValues[index] = "";
        setValues(newValues);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedText)) return;

    const codeChars = pastedText.split("").slice(0, length);
    const newValues = [...values];

    codeChars.forEach((char, idx) => {
      newValues[idx] = char;
      if (inputsRef.current[idx]) {
        inputsRef.current[idx]!.value = char;
      }
    });

    setValues(newValues);

    // Focus the last filled box or the final box
    const focusIndex = Math.min(codeChars.length, length - 1);
    inputsRef.current[focusIndex]?.focus();

    const completeCode = newValues.join("");
    if (completeCode.length === length && onComplete) {
      onComplete(completeCode);
    }
  };

  const triggerErrorShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="w-full max-w-sm p-6 rounded-3xl border border-zinc-200/60 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xs">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 border border-indigo-100 dark:border-indigo-950/80">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
          Security Verification
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Enter the {length}-digit code sent to your email.
        </p>
      </div>

      <div
        className={cn(
          "flex justify-center gap-2",
          shake && "animate-bounce", // Fallback shake/bounce effect
        )}
      >
        {values.map((val, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={val}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            className={cn(
              "w-12 h-14 text-center text-xl font-bold rounded-xl border transition-all duration-200 outline-hidden font-mono",
              val !== ""
                ? "bg-zinc-50 border-indigo-500 dark:bg-zinc-900/50 dark:border-indigo-400 text-zinc-900 dark:text-zinc-50 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                : "bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500",
              "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10",
              error && "border-red-500 ring-red-500/10 dark:border-red-400 dark:ring-red-400/10",
            )}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 text-xs">
        <span className="text-zinc-400 dark:text-zinc-500">Didn't receive code?</span>
        <button
          onClick={triggerErrorShake}
          className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
        >
          Resend code
        </button>
      </div>
    </div>
  );
}
