"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { GridBackground } from "@/components/animated/grid-background";
import { Spotlight } from "@/components/animated/spotlight";

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12">
        <form
          className="w-full max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            window.setTimeout(() => setLoading(false), 1500);
          }}
        >
          <div className="flex items-center gap-2 font-semibold">
            <span className="size-6 rounded-md bg-brand-gradient" /> Acme
          </div>
          <h1 className="mt-10 text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your account to continue.</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <Button variant="outline" type="button">
              GitHub
            </Button>
            <Button variant="outline" type="button">
              Google
            </Button>
          </div>
          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <Separator className="flex-1" /> or <Separator className="flex-1" />
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Password</Label>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Forgot password?
                </a>
              </div>
              <Input id="login-password" type="password" autoComplete="current-password" required />
            </div>
            <Button type="submit" className="mt-2 w-full" disabled={loading}>
              {loading && <Spinner data-icon="inline-start" />}
              Sign in
            </Button>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account?{" "}
            <a href="#" className="font-medium text-foreground underline underline-offset-4">
              Sign up
            </a>
          </p>
        </form>
      </div>
      <div className="relative hidden overflow-hidden border-l border-border bg-surface-1 lg:block">
        <GridBackground fade="center" />
        <Spotlight className="-top-20 left-10" />
        <div className="absolute inset-x-12 bottom-12">
          <blockquote className="text-xl leading-relaxed font-medium tracking-tight">
            “This placeholder quote is here so you remember to add a real testimonial.”
          </blockquote>
          <p className="mt-4 text-sm text-muted-foreground">Placeholder Name, Example Co</p>
        </div>
      </div>
    </div>
  );
}
