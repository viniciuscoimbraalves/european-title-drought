export interface Team {
  name: string;
  nickname: string;
  color: string;
  secondaryColor: string;
  crest: string;
  titles: Record<string, string>; // competition slug → ISO date
  country: string;
  city: string;
  founded: string; // ISO date (YYYY-MM-DD) — approximate for older clubs
}

export type CompetitionInfo = {
  slug: string;
  displayName: string;
};

export const COMPETITIONS: CompetitionInfo[] = [
  { slug: "champions-league", displayName: "Champions League" },
];

export const teams: Team[] = [
  {
    name: "Real Madrid",
    nickname: "Los Blancos",
    color: "oklch(0.55 0.22 45)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    country: "Spain",
    city: "Madrid",
    founded: "1902-03-06",
    titles: {
      "champions-league": "2024-06-01T21:00:00",
    },
  },
  {
    name: "AC Milan",
    nickname: "Rossoneri",
    color: "oklch(0.50 0.18 20)",
    secondaryColor: "oklch(0.20 0.02 0)",
    crest: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
    country: "Italy",
    city: "Milan",
    founded: "1899-12-16",
    titles: {
      "champions-league": "2007-05-23T21:00:00",
    },
  },
  {
    name: "Bayern Munich",
    nickname: "Die Roten",
    color: "oklch(0.50 0.18 20)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/commons/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg",
    country: "Germany",
    city: "Munich",
    founded: "1900-02-27",
    titles: {
      "champions-league": "2020-08-23T21:00:00",
    },
  },
  {
    name: "Liverpool",
    nickname: "The Reds",
    color: "oklch(0.50 0.18 15)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    country: "England",
    city: "Liverpool",
    founded: "1892-06-03",
    titles: {
      "champions-league": "2019-06-01T21:00:00",
    },
  },
  {
    name: "Barcelona",
    nickname: "Blaugrana",
    color: "oklch(0.40 0.18 260)",
    secondaryColor: "oklch(0.50 0.18 20)",
    crest: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    country: "Spain",
    city: "Barcelona",
    founded: "1899-11-29",
    titles: {
      "champions-league": "2015-06-06T21:00:00",
    },
  },
  {
    name: "Ajax",
    nickname: "De Godenzonen",
    color: "oklch(0.50 0.18 15)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg",
    country: "Netherlands",
    city: "Amsterdam",
    founded: "1900-03-18",
    titles: {
      "champions-league": "1995-05-24T21:00:00",
    },
  },
  {
    name: "Inter Milan",
    nickname: "Nerazzurri",
    color: "oklch(0.25 0.02 0)",
    secondaryColor: "oklch(0.55 0.18 260)",
    crest: "https://upload.wikimedia.org/wikipedia/commons/0/05/Inter_Milan_Logo_2021.svg",
    country: "Italy",
    city: "Milan",
    founded: "1908-03-09",
    titles: {
      "champions-league": "2010-05-22T21:00:00",
    },
  },
  {
    name: "Manchester United",
    nickname: "Red Devils",
    color: "oklch(0.50 0.18 15)",
    secondaryColor: "oklch(0.90 0.05 60)",
    crest: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    country: "England",
    city: "Manchester",
    founded: "1878-01-01",
    titles: {
      "champions-league": "2008-05-21T21:00:00",
    },
  },
  {
    name: "Juventus",
    nickname: "La Vecchia Signora",
    color: "oklch(0.20 0.02 0)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Juventus_FC_2017_icon_%28black%29.svg",
    country: "Italy",
    city: "Turin",
    founded: "1897-11-01",
    titles: {
      "champions-league": "1996-05-22T21:00:00",
    },
  },
  {
    name: "Benfica",
    nickname: "Águias",
    color: "oklch(0.50 0.18 15)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg",
    country: "Portugal",
    city: "Lisbon",
    founded: "1904-02-28",
    titles: {
      "champions-league": "1962-05-02T21:00:00",
    },
  },
  {
    name: "Nottingham Forest",
    nickname: "The Reds",
    color: "oklch(0.50 0.18 15)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/en/e/e5/Nottingham_Forest_FC_crest.svg",
    country: "England",
    city: "Nottingham",
    founded: "1865-01-01",
    titles: {
      "champions-league": "1980-05-28T21:00:00",
    },
  },
  {
    name: "FC Porto",
    nickname: "Dragões",
    color: "oklch(0.45 0.18 260)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/en/f/f1/FC_Porto.svg",
    country: "Portugal",
    city: "Porto",
    founded: "1893-09-28",
    titles: {
      "champions-league": "2004-05-26T21:00:00",
    },
  },
  {
    name: "Chelsea",
    nickname: "The Blues",
    color: "oklch(0.40 0.18 260)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    country: "England",
    city: "London",
    founded: "1905-03-10",
    titles: {
      "champions-league": "2021-05-29T21:00:00",
    },
  },
  {
    name: "Celtic",
    nickname: "The Bhoys",
    color: "oklch(0.45 0.18 145)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/en/7/71/Celtic_FC_crest.svg",
    country: "Scotland",
    city: "Glasgow",
    founded: "1887-11-06",
    titles: {
      "champions-league": "1967-05-25T21:00:00",
    },
  },
  {
    name: "Feyenoord",
    nickname: "De Trots van Zuid",
    color: "oklch(0.50 0.18 15)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Feyenoord_logo_since_2024.svg",
    country: "Netherlands",
    city: "Rotterdam",
    founded: "1908-07-19",
    titles: {
      "champions-league": "1970-05-06T21:00:00",
    },
  },
  {
    name: "Aston Villa",
    nickname: "The Villans",
    color: "oklch(0.40 0.18 260)",
    secondaryColor: "oklch(0.50 0.18 45)",
    crest: "https://upload.wikimedia.org/wikipedia/en/9/9a/Aston_Villa_FC_new_crest.svg",
    country: "England",
    city: "Birmingham",
    founded: "1874-11-21",
    titles: {
      "champions-league": "1982-05-26T21:00:00",
    },
  },
  {
    name: "Hamburger SV",
    nickname: "Der Dino",
    color: "oklch(0.98 0 0)",
    secondaryColor: "oklch(0.40 0.18 260)",
    crest: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Hamburger_SV_logo.svg",
    country: "Germany",
    city: "Hamburg",
    founded: "1887-09-29",
    titles: {
      "champions-league": "1983-05-25T21:00:00",
    },
  },
  {
    name: "Steaua Bucharest",
    nickname: "Roș-Albaștrii",
    color: "oklch(0.40 0.18 260)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/en/9/9e/Steaua_Bucure%C8%99ti.svg",
    country: "Romania",
    city: "Bucharest",
    founded: "1947-06-07",
    titles: {
      "champions-league": "1986-05-07T21:00:00",
    },
  },
  {
    name: "PSV Eindhoven",
    nickname: "Boeren",
    color: "oklch(0.50 0.18 15)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/en/0/05/PSV_Eindhoven.svg",
    country: "Netherlands",
    city: "Eindhoven",
    founded: "1913-08-31",
    titles: {
      "champions-league": "1988-05-25T21:00:00",
    },
  },
  {
    name: "Red Star Belgrade",
    nickname: "Crveno-beli",
    color: "oklch(0.50 0.18 15)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/en/c/c2/Red_Star_Belgrade_crest.svg",
    country: "Serbia",
    city: "Belgrade",
    founded: "1945-03-04",
    titles: {
      "champions-league": "1991-05-29T21:00:00",
    },
  },
  {
    name: "Marseille",
    nickname: "Les Olympiens",
    color: "oklch(0.45 0.18 260)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Olympique_de_Marseille_2026_logo.svg",
    country: "France",
    city: "Marseille",
    founded: "1899-08-31",
    titles: {
      "champions-league": "1993-05-26T21:00:00",
    },
  },
  {
    name: "Borussia Dortmund",
    nickname: "Die Schwarzgelben",
    color: "oklch(0.90 0.10 90)",
    secondaryColor: "oklch(0.20 0.02 0)",
    crest: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
    country: "Germany",
    city: "Dortmund",
    founded: "1909-12-19",
    titles: {
      "champions-league": "1997-05-28T21:00:00",
    },
  },
  {
    name: "Manchester City",
    nickname: "The Citizens",
    color: "oklch(0.50 0.18 260)",
    secondaryColor: "oklch(0.98 0 0)",
    crest: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    country: "England",
    city: "Manchester",
    founded: "1880-01-01",
    titles: {
      "champions-league": "2023-06-10T21:00:00",
    },
  },
];
