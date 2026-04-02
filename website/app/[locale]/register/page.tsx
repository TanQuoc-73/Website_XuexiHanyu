"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { UserPlus, Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { authService } from "@/services/auth-service";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const t = useTranslations("register");
  const tNav = useTranslations("nav");
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await authService.register({
        email: formData.email,
        password: formData.password,
        username: formData.username,
      });
      authLogin(response);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-12 md:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Info/Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary/20 bg-primary/5 px-3 py-1 text-primary">
                🚀 JOIN NOW
              </Badge>
              <h1 className="text-6xl font-black tracking-tight leading-[1.1]">
                Start Your <br />
                <span className="text-primary italic">Chinese</span> Journey
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Create an account to save progress and unlock your full learning dashboard.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { title: "Progress Sync", desc: "Track your lessons and vocabulary across devices." },
                { title: "Smart Recommendations", desc: "Get level-based suggestions tailored to your HSK path." },
                { title: "Panda Assistant", desc: "Ask for instant help on words, grammar, and pronunciation." },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Register Form */}
          <div>
            <Card className="p-8 md:p-10 shadow-2xl border-primary/20 backdrop-blur-sm bg-background/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <UserPlus className="size-20" />
              </div>
              
              <div className="mb-10 relative">
                <h2 className="text-3xl font-black uppercase tracking-tight">{t("title")}</h2>
                <p className="text-muted-foreground mt-2 font-medium">{t("subtitle")}</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg font-bold">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 relative">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t("name")}</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input 
                      name="username"
                      placeholder="John Doe" 
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="h-12 pl-10 border-2 border-border focus:border-primary transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t("email")}</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input 
                      name="email"
                      type="email" 
                      placeholder="name@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-12 pl-10 border-2 border-border focus:border-primary transition-all" 
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t("password")}</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input 
                        name="password"
                        type="password" 
                        placeholder="••••••••" 
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="h-12 pl-10 border-2 border-border focus:border-primary transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t("confirmPassword")}</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input 
                        name="confirmPassword"
                        type="password" 
                        placeholder="••••••••" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="h-12 pl-10 border-2 border-border focus:border-primary transition-all" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-4">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    required
                    className="mt-1 size-5 rounded border-2 border-muted-foreground accent-primary" 
                  />
                  <label htmlFor="terms" className="text-xs leading-5 text-muted-foreground font-medium">
                    {t("term")}
                  </label>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 text-lg font-black italic tracking-widest uppercase shadow-xl shadow-primary/20 group"
                >
                  {loading ? "Creating Account..." : tNav("register")}
                  {!loading && <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />}
                </Button>
              </form>

              <div className="mt-8">
                <div className="relative flex items-center mb-8">
                  <div className="flex-grow border-t border-border" />
                  <span className="px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Or sign up with</span>
                  <div className="flex-grow border-t border-border" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12 font-bold border-2">Google</Button>
                  <Button variant="outline" className="h-12 font-bold border-2">GitHub</Button>
                </div>
              </div>

              <p className="mt-8 text-center text-sm font-medium text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-black hover:underline underline-offset-4">
                  {tNav("login")}
                </Link>
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
