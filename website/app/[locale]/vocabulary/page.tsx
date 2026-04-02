import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { vocabularyService } from "@/services/vocabulary-service";
import type { VocabWord } from "@/types/vocabulary";

type Props = {
  params: Promise<{ locale: string }>;
};

async function getWords(): Promise<VocabWord[]> {
  try {
    const res = await vocabularyService.getAll();
    return res;
  } catch (error) {
    console.error("Failed to fetch words:", error);
    return [];
  }
}

export default async function VocabularyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("vocabulary");
  const words = await getWords();

  return (
    <Container className="py-12">
      <Section title={t("title")} subtitle={t("subtitle")}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {words.length > 0 ? (
            words.map((word) => (
              <Card key={word.id} className="overflow-hidden border-2 transition-all hover:border-red-500/50 hover:shadow-md">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
                      HSK {word.hskLevel}
                    </Badge>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {word.category?.name || "N/A"}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col items-center text-center">
                    <h2 className="text-4xl font-bold text-red-600 dark:text-red-500">{word.hanzi}</h2>
                    <p className="mt-1 text-lg font-medium text-muted-foreground italic">[{word.pinyin}]</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-tight">
                        {locale === "vi" ? "Nghĩa" : "Meaning"}
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        {locale === "vi" ? word.meaningVi : word.meaningEn}
                      </p>
                    </div>
                    
                    {word.sentences && word.sentences.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-muted-foreground uppercase">
                          {locale === "vi" ? "Ví dụ" : "Examples"}
                        </p>
                        {word.sentences.map((s) => (
                          <div key={s.id} className="rounded-lg bg-muted/50 p-3">
                            <p className="text-base font-medium">{s.sentence}</p>
                            <p className="text-sm text-muted-foreground italic">[{s.pinyin}]</p>
                            <p className="mt-1 text-sm">
                              {locale === "vi" ? s.translationVi : s.translationEn}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-muted-foreground">{t("noWordsFound") || "No vocabulary found. Please start the backend server."}</p>
            </div>
          )}
        </div>
      </Section>
    </Container>
  );
}
