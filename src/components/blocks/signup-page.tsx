"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GridBackground } from "@/components/animated/grid-background";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
  terms: z.boolean().refine((v) => v, "You must accept the terms."),
});

type Values = z.infer<typeof schema>;

export default function SignupPage() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", terms: false },
  });

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-6 py-12">
      <GridBackground variant="dots" fade="center" />
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative w-full max-w-md rounded-2xl glass border border-border p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Start your 14-day free trial. No credit card needed.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => toast.success("Account created"))}
            className="mt-8 grid gap-4"
            noValidate
          >
            {(["name", "email", "password"] as const).map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{name}</FormLabel>
                    <FormControl>
                      <Input
                        type={name === "name" ? "text" : name}
                        autoComplete={name === "password" ? "new-password" : name}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(v) => field.onChange(v === true)}
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-muted-foreground">
                      I agree to the terms and privacy policy
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2 w-full">
              Create account
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
