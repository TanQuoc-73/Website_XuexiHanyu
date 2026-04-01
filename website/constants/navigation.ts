export type NavItem = {
  key: string;
  href: string;
  icon?: string;
  items?: { key: string; href: string; description?: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "/" },
  {
    key: "lessons",
    href: "/lessons",
    items: [
      { key: "hsk1", href: "/lessons?hsk=1", description: "hsk1Desc" },
      { key: "hsk2", href: "/lessons?hsk=2", description: "hsk2Desc" },
      { key: "hsk3", href: "/lessons?hsk=3", description: "hsk3Desc" },
      { key: "hsk4", href: "/lessons?hsk=4", description: "hsk4Desc" },
      { key: "hsk5", href: "/lessons?hsk=5", description: "hsk5Desc" },
      { key: "hsk6", href: "/lessons?hsk=6", description: "hsk6Desc" },
    ],
  },
  {
    key: "resources",
    href: "#",
    items: [
      { key: "vocabulary", href: "/vocabulary", description: "vocabularyDesc" },
      { key: "grammar", href: "/grammar", description: "grammarDesc" },
      { key: "dictionary", href: "/dictionary", description: "dictionaryDesc" },
    ],
  },
  { key: "practice", href: "/practice" },
] as const;
