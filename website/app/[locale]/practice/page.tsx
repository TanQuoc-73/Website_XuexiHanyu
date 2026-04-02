"use client";

import { useTranslations } from "next-intl";
import { PlayCircle, Clock, Star, Zap, PenTool, LayoutGrid, Ear, MousePointer2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress-bar";

const PRACTICE_MODES = [
  { id: "flashcards", icon: LayoutGrid, color: "bg-blue-500", shadow: "shadow-blue-500/20" },
  { id: "quiz", icon: MousePointer2, color: "bg-green-500", shadow: "shadow-green-500/20" },
  { id: "writing", icon: PenTool, color: "bg-orange-500", shadow: "shadow-orange-500/20" },
  { id: "listening", icon: Ear, color: "bg-purple-500", shadow: "shadow-purple-500/20" },
];

export default function PracticePage() {
  const t = useTranslations("practice");

  return (
    <main>
      <Section className="pb-8 pt-12 md:pt-16">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 px-3 py-1 text-primary">
              <Zap className="mr-2 size-3.5" />
              Interactive Lab
            </Badge>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {t("subtitle")}
            </p>

            <div className="mt-10 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              <Card className="flex min-w-[200px] flex-col items-center gap-2 border-primary/30 bg-primary/5 p-4 text-center">
                <Star className="size-6 text-primary fill-primary" />
                <span className="text-sm font-bold">Today's Goal</span>
                <Progress value={60} className="mt-2 h-1.5 w-full" />
                <span className="text-xs font-bold text-muted-foreground">12/20 words</span>
              </Card>
              <Card className="flex min-w-[200px] flex-col items-center gap-2 p-4 text-center">
                <Clock className="size-6 text-muted-foreground" />
                <span className="text-sm font-bold">Time Spent</span>
                <span className="text-lg font-black italic">24 MIN</span>
              </Card>
              <Card className="flex min-w-[200px] flex-col items-center gap-2 p-4 text-center">
                <Zap className="size-6 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-bold">Daily Streak</span>
                <span className="text-lg font-black italic">5 DAYS</span>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-8">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRACTICE_MODES.map((mode) => (
              <Card key={mode.id} className="group relative cursor-pointer overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl">
                <div className={`absolute inset-0 z-0 bg-gradient-to-br from-transparent to-${mode.color}/5 opacity-0 transition-opacity group-hover:opacity-100`} />
                <div className="relative z-10 p-8 flex flex-col items-center text-center">
                  <div className={`flex size-16 items-center justify-center rounded-3xl ${mode.color} ${mode.shadow} text-white shadow-xl transition-transform group-hover:scale-110`}>
                    <mode.icon className="size-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-black uppercase tracking-tight">{t(`modes.${mode.id}`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Improve your {mode.id === 'writing' ? 'character drawing' : mode.id} skills with these exercises.
                  </p>
                  <Button className="mt-8 font-extrabold w-full shadow-lg group-hover:animate-bounce">
                    PLAY NOW
                    <PlayCircle className="ml-2 size-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
