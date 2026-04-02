"use client";

import { useTranslations } from "next-intl";
import { LogIn, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { authService } from "@/services/auth-service";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const t = useTranslations("login");
  const tNav = useTranslations("nav");
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await authService.login({ email, password });
      authLogin(response);
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-12 md:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Info/Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary/20 bg-primary/5 px-3 py-1 text-primary">
                🎓 WELCOME BACK
              </Badge>
              <h1 className="text-6xl font-black tracking-tight leading-[1.1]">
                Continue Your <br />
                <span className="text-primary italic">Chinese</span> Mastery
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Log in to access your personalized learning path and AI tools.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { title: "Smart Progress", desc: "Pick up exactly where you left off." },
                { title: "AI Panda Assistant", desc: "Get real-time feedback on your grammar." },
                { title: "Community Stats", desc: "Compare your HSK progress with others." },
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

          {/* Right Column: Login Form */}
          <div>
            <Card className="p-8 md:p-10 shadow-2xl border-primary/20 backdrop-blur-sm bg-background/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <LogIn className="size-20" />
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
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input 
                      type="email" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 pl-10 border-2 border-border focus:border-primary transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Password</label>
                    <Link href="/forgot-password" className="text-[10px] uppercase font-black text-primary hover:underline underline-offset-4 tracking-wider">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 pl-10 border-2 border-border focus:border-primary transition-all" 
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 text-lg font-black italic tracking-widest uppercase shadow-xl shadow-primary/20 group"
                >
                  {loading ? "Logging in..." : tNav("login")}
                  {!loading && <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />}
                </Button>
              </form>

              <div className="mt-8">
                <div className="relative flex items-center mb-8">
                  <div className="flex-grow border-t border-border" />
                  <span className="px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Or continue with</span>
                  <div className="flex-grow border-t border-border" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12 font-bold border-2">Google</Button>
                  <Button variant="outline" className="h-12 font-bold border-2">GitHub</Button>
                </div>
              </div>

              <p className="mt-8 text-center text-sm font-medium text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary font-black hover:underline underline-offset-4">
                  {tNav("register")}
                </Link>
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
