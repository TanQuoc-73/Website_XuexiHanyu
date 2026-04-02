"use client";

import { useTranslations } from "next-intl";
import { BookOpen, CheckCircle2, ChevronRight, GraduationCap, Trophy } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";

const HSK_LEVELS = [
  { level: 1, words: 150, grammar: 15, color: "bg-green-500/10 text-green-600 border-green-500/20" },
  { level: 2, words: 300, grammar: 30, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  { level: 3, words: 600, grammar: 50, color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  { level: 4, words: 1200, grammar: 80, color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  { level: 5, words: 2500, grammar: 120, color: "bg-red-500/10 text-red-600 border-red-500/20" },
  { level: 6, words: 5000, grammar: 180, color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
];

export default function LessonsPage() {
  const t = useTranslations("lessons");

  return (
    <main>
      <Section className="pb-8 pt-12 md:pt-16">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 px-3 py-1 text-primary">
              <GraduationCap className="mr-2 size-3.5" />
              Learning Path
            </Badge>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HSK_LEVELS.map((hsk) => (
              <Card key={hsk.level} className="group relative overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/5">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`flex size-12 items-center justify-center rounded-2xl border ${hsk.color}`}>
                      <span className="text-xl font-black">HSK {hsk.level}</span>
                    </div>
                    {hsk.level === 1 ? (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        <CheckCircle2 className="mr-1.5 size-3" />
                        75% complete
                      </Badge>
                    ) : (
                      <Trophy className="size-5 text-muted-foreground/30" />
                    )}
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold">{t("levelTitle", { level: hsk.level })}</h3>
                      <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="size-3.5" />
                          {t("wordsCount", { count: hsk.words })}
                        </span>
                        <span>•</span>
                        <span>{t("grammarCount", { count: hsk.grammar })}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-muted-foreground">
                        <span>Progress</span>
                        <span>{hsk.level === 1 ? "75%" : "0%"}</span>
                      </div>
                      <Progress value={hsk.level === 1 ? 75 : 0} className="h-1.5" />
                    </div>

                    <Button className="w-full font-bold group-hover:bg-primary group-hover:text-primary-foreground" variant={hsk.level === 1 ? "default" : "outline"}>
                      {hsk.level === 1 ? t("continue") : t("startNow")}
                      <ChevronRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
