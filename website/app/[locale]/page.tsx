import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookOpen, Languages, FileText, Target, BookMarked, BarChart3 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HSK_LEVELS } from "@/constants/hsk-levels";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("hero");
  const tFeatures = await getTranslations("features");
  const tHsk = await getTranslations("hsk");
  const tCta = await getTranslations("cta");

  const features = [
    { icon: BookOpen, title: tFeatures("lessons.title"), description: tFeatures("lessons.description") },
    { icon: Languages, title: tFeatures("vocabulary.title"), description: tFeatures("vocabulary.description") },
    { icon: FileText, title: tFeatures("grammar.title"), description: tFeatures("grammar.description") },
    { icon: Target, title: tFeatures("practice.title"), description: tFeatures("practice.description") },
    { icon: BookMarked, title: tFeatures("dictionaryFeature.title"), description: tFeatures("dictionaryFeature.description") },
    { icon: BarChart3, title: tFeatures("progress.title"), description: tFeatures("progress.description") },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white">
        <Container className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {tHero("title")} <br className="hidden sm:block" />
              <span className="text-red-100">{tHero("titleHighlight")}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-red-100 sm:text-xl">
              {tHero("description")}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="h-12 rounded-xl bg-white px-8 text-base font-semibold text-red-600 shadow-lg hover:bg-red-50">
                <Link href="/lessons">{tHero("ctaStart")}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="h-12 rounded-xl border-2 border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white">
                <Link href="/vocabulary">{tHero("ctaExplore")}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <Container>
        <Section title={tFeatures("title")} subtitle={tFeatures("subtitle")}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="text-center">
                <CardHeader className="items-center">
                  <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <f.icon className="size-7" />
                  </span>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Section>
      </Container>

      {/* HSK Levels Section */}
      <div className="bg-muted/50">
        <Container>
          <Section title={tHsk("title")} subtitle={tHsk("subtitle")}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {HSK_LEVELS.map((level) => (
                <Link key={level.level} href={`/lessons?hsk=${level.level}`}>
                  <Card className="items-center text-center transition-transform hover:scale-105">
                    <CardContent className="flex flex-col items-center pt-0">
                      <div
                        className="mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
                        style={{ backgroundColor: level.color }}
                      >
                        {level.level}
                      </div>
                      <p className="text-sm font-semibold">{level.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{level.wordCount} {tHsk("words")}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </Section>
        </Container>
      </div>

      {/* CTA Section */}
      <Container>
        <Section>
          <div className="rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-8 py-12 text-center text-white sm:px-16">
            <h2 className="text-2xl font-bold sm:text-3xl">{tCta("title")}</h2>
            <p className="mt-3 text-red-100">
              {tCta("description")}
            </p>
            <Button size="lg" asChild className="mt-8 h-12 rounded-xl bg-white px-8 text-base font-semibold text-red-600 shadow-lg hover:bg-red-50">
              <Link href="/register">{tCta("button")}</Link>
            </Button>
          </div>
        </Section>
      </Container>
    </>
  );
}
