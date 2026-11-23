"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowRight, Sparkles } from "lucide-react";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function SolanaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 397.7 311.7" fill="currentColor">
      <linearGradient
        id="solana-gradient-1"
        gradientUnits="userSpaceOnUse"
        x1="360.879"
        y1="351.455"
        x2="141.213"
        y2="-69.294"
        gradientTransform="matrix(1 0 0 -1 0 314)"
      >
        <stop offset="0" stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient
        id="solana-gradient-2"
        gradientUnits="userSpaceOnUse"
        x1="264.829"
        y1="401.601"
        x2="45.163"
        y2="-19.148"
        gradientTransform="matrix(1 0 0 -1 0 314)"
      >
        <stop offset="0" stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient
        id="solana-gradient-3"
        gradientUnits="userSpaceOnUse"
        x1="312.548"
        y1="376.688"
        x2="92.882"
        y2="-44.061"
        gradientTransform="matrix(1 0 0 -1 0 314)"
      >
        <stop offset="0" stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <path
        fill="url(#solana-gradient-1)"
        d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"
      />
      <path
        fill="url(#solana-gradient-2)"
        d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"
      />
      <path
        fill="url(#solana-gradient-3)"
        d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"
      />
    </svg>
  );
}

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string; remember: boolean }) => Promise<void>;
  onSocialLogin?: (provider: "google" | "github" | "facebook" | "solana") => Promise<void>;
  className?: string;
}

export default function Card_02({ onSubmit, onSocialLogin, className }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSubmit?.({ email, password, remember });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github" | "facebook" | "solana") => {
    setLoadingProvider(provider);
    try {
      await onSocialLogin?.(provider);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 rounded-2xl blur-xl opacity-50" />

        <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-zinc-100 dark:border-zinc-800">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-4">
              <Sparkles className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
            </div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Sign in to your account to continue
            </p>
          </div>

          <div className="p-8">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 relative group"
                  onClick={() => handleSocialLogin("google")}
                  disabled={!!loadingProvider}
                >
                  {loadingProvider === "google" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <GoogleIcon className="w-5 h-5" />
                      <span className="ml-2 text-sm font-medium">Google</span>
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="h-11 relative group"
                  onClick={() => handleSocialLogin("github")}
                  disabled={!!loadingProvider}
                >
                  {loadingProvider === "github" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <GitHubIcon className="w-5 h-5" />
                      <span className="ml-2 text-sm font-medium">GitHub</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 relative group text-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/5 hover:border-[#1877F2]/30"
                  onClick={() => handleSocialLogin("facebook")}
                  disabled={!!loadingProvider}
                >
                  {loadingProvider === "facebook" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <FacebookIcon className="w-5 h-5" />
                      <span className="ml-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Facebook
                      </span>
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="h-11 relative group hover:border-[#9945FF]/30 hover:bg-gradient-to-r hover:from-[#9945FF]/5 hover:to-[#14F195]/5"
                  onClick={() => handleSocialLogin("solana")}
                  disabled={!!loadingProvider}
                >
                  {loadingProvider === "solana" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <SolanaIcon className="w-5 h-5" />
                      <span className="ml-2 text-sm font-medium">Solana</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-3 text-zinc-400 dark:text-zinc-500">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-300">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={cn(
                      "pl-10 h-11",
                      errors.email && "border-red-500 focus-visible:ring-red-500/20",
                    )}
                    aria-invalid={!!errors.email}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-zinc-700 dark:text-zinc-300">
                    Password
                  </Label>
                  <button
                    type="button"
                    className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    className={cn(
                      "pl-10 pr-10 h-11",
                      errors.password && "border-red-500 focus-visible:ring-red-500/20",
                    )}
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked === true)}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-zinc-600 dark:text-zinc-400 font-normal cursor-pointer"
                >
                  Remember me for 30 days
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white font-medium transition-all duration-200 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
              {"Don't have an account? "}
              <button
                type="button"
                className="font-medium text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4"
              >
                Sign up
              </button>
            </p>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800">
            <p className="text-xs text-center text-zinc-400 dark:text-zinc-500">
              By signing in, you agree to our{" "}
              <button
                type="button"
                className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
