"use client";

import { useTranslations } from "next-intl";
import { Search, History, TrendingUp, Volume2, Bookmark, Share2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const RECENT_SEARCHES = [
  { word: "你好", pinyin: "nǐ hǎo", translation: "hello" },
  { word: "学习", pinyin: "xué xí", translation: "study" },
  { word: "汉语", pinyin: "hàn yǔ", translation: "Chinese" },
  { word: "朋友", pinyin: "péng you", translation: "friend" },
];

export default function DictionaryPage() {
  const t = useTranslations("dictionary");

  return (
    <main>
      <Section className="pb-12 pt-20 md:pt-24 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl text-foreground">
              {t("title")}
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("subtitle")}
            </p>

            <div className="relative mt-12 group">
              <div className="absolute -inset-1 blur-xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
              <div className="relative flex items-center bg-background border-2 border-primary/20 shadow-2xl rounded-2xl overflow-hidden focus-within:border-primary transition-all p-1">
                <Search className="ml-4 size-6 text-muted-foreground mr-3" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  className="h-14 border-none text-xl shadow-none ring-0 focus-visible:ring-0 px-0 placeholder:text-muted-foreground/50"
                />
                <Button size="lg" className="h-14 px-8 rounded-xl font-black italic tracking-widest uppercase">
                  SEARCH
                </Button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <span className="text-sm font-bold text-muted-foreground mr-2 flex items-center">
                <TrendingUp className="mr-2 size-4 text-primary" />
                Trending:
              </span>
              {["HSK 1", "Panda", "Travel", "Grammar", "Radicals"].map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <History className="size-5 text-primary" />
                <h2 className="text-xl font-extrabold uppercase tracking-tight">{t("recent")}</h2>
              </div>
              <div className="grid gap-3">
                {RECENT_SEARCHES.map((item, i) => (
                  <Card key={i} className="group hover:border-primary/40 transition-all hover:shadow-md cursor-pointer">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <span className="text-3xl font-black text-foreground group-hover:text-primary transition-colors">{item.word}</span>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-muted-foreground">{item.pinyin}</span>
                          <span className="font-bold">{item.translation}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="size-9 rounded-full"><Volume2 className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="size-9 rounded-full"><Bookmark className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="size-9 rounded-full"><Share2 className="size-4" /></Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <div className="p-6">
                  <h3 className="text-lg font-black uppercase mb-4">Dictionary Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Total Words</span>
                      <span className="font-bold">50,000+</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Audio Pronunciations</span>
                      <span className="font-bold font-mono">100%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Example Sentences</span>
                      <span className="font-bold font-mono">150,000+</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 variant-outline border-primary/30 h-11 font-bold">
                    Join Content Team
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
