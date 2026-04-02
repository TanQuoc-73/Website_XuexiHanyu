"use client";

import { useTranslations } from "next-intl";
import { Search, Info, BookText, FileText, LayoutList } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GRAMMAR_POINTS = [
  { level: 1, title: "S + V + O", description: "Bản chất câu tiếng Trung.", category: "basic" },
  { level: 1, title: "Trợ từ {了} (le)", description: "Diễn tả sự thay đổi hoặc hoàn thành.", category: "particle" },
  { level: 2, title: "Cấu trúc {把} (bǎ)", description: "Nhấn mạnh kết quả của hành động.", category: "sentence" },
  { level: 2, title: "So sánh với {比} (bǐ)", description: "Cấu trúc so sánh hơn.", category: "sentence" },
  { level: 3, title: "Bổ ngữ kết quả", description: "Diễn tả kết quả cụ thể của hành động.", category: "complement" },
  { level: 3, title: "Câu bị động {被} (bèi)", description: "Nhấn mạnh chủ thể chịu tác động.", category: "sentence" },
];

export default function GrammarPage() {
  const t = useTranslations("grammar");

  return (
    <main>
      <Section className="pb-8 pt-12 md:pt-16">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 px-3 py-1 text-primary">
              <BookText className="mr-2 size-3.5" />
              Reference
            </Badge>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {t("subtitle")}
            </p>

            <div className="relative mt-8">
              <Search className="absolute left-3.5 top-1/2 mt-0 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t("searchPlaceholder")}
                className="h-12 pl-10 pr-4 text-base shadow-sm ring-offset-background transition-shadow focus:shadow-md"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-8">
        <Container>
          <Tabs defaultValue="all" className="space-y-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <TabsList className="h-11 bg-accent/50 p-1">
                <TabsTrigger value="all" className="px-4 py-2 font-bold">{t("categories.all")}</TabsTrigger>
                <TabsTrigger value="basic" className="px-4 py-2 font-bold">{t("categories.basic")}</TabsTrigger>
                <TabsTrigger value="sentence" className="px-4 py-2 font-bold">{t("categories.sentence")}</TabsTrigger>
                <TabsTrigger value="particle" className="px-4 py-2 font-bold">{t("categories.particle")}</TabsTrigger>
                <TabsTrigger value="complement" className="px-4 py-2 font-bold">{t("categories.complement")}</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map((l) => (
                  <Button key={l} variant="outline" size="sm" className="h-8 w-11 font-bold">
                    HSK {l}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {GRAMMAR_POINTS.map((point, index) => (
                <Card key={index} className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="px-2 py-0.5 text-[10px] font-black tracking-widest uppercase">
                        HSK {point.level}
                      </Badge>
                      <Button variant="ghost" size="icon" className="size-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100">
                        <Info className="size-4" />
                      </Button>
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{point.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {point.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/50">
                        {point.category}
                      </span>
                      <Button variant="link" className="h-auto p-0 text-xs font-bold text-primary">
                        Read more
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Tabs>
        </Container>
      </Section>
    </main>
  );
}
