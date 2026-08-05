export const values = [
  "Excelencia",
  "Pasión",
  "Innovación",
  "Profesionalismo",
  "Elegancia",
  "Colaboración",
] as const;

export const markets = [
  {
    slug: "bodas",
    title: "Bodas",
    short:
      "Ceremonias, recepciones, cenas y momentos especiales con acompañamiento musical real.",
    image: "/media/selection-web/ae-033-formal-reception.webp",
    imageAlt: "Presentación musical frente a los invitados de una recepción.",
    imagePosition: "center 58%",
  },
  {
    slug: "hoteles",
    title: "Hoteles",
    short:
      "Programaciones musicales, temporadas acústicas y experiencias para huéspedes.",
    image: "/media/selection-web/ae-028-trio-event.webp",
    imageAlt: "Trío durante una presentación en un espacio para eventos.",
    imagePosition: "center 48%",
  },
  {
    slug: "restaurantes",
    title: "Cócteles y cenas",
    short:
      "Música en vivo para cócteles, cenas privadas y eventos especiales.",
    image: "/media/selection-web/ae-003-hospitality-solo.webp",
    imageAlt: "Interpretación solista con guitarra en un espacio para invitados.",
    imagePosition: "center 12%",
  },
  {
    slug: "eventos-corporativos",
    title: "Corporativos",
    short:
      "Presentaciones, conferencias, cenas de gala y reuniones ejecutivas.",
    image: "/media/selection-web/ae-042-corporate-band.webp",
    imageAlt: "Ensamble completo durante una presentación con producción audiovisual.",
    imagePosition: "center 54%",
  },
] as const;

export const royalFormats = [
  {
    slug: "solista",
    title: "Solista",
    descriptor: "Minimalista, claro y con presencia real.",
    logo: "/brand/formats/royal-solista-dark.png",
    logoLight: "/brand/formats/royal-solista-light.png",
    image: "/media/selection-web/ae-037-solo-performance.webp",
    imageAlt: "Adrián Eugenio interpreta guitarra y voz en vivo.",
    imagePosition: "center 44%",
  },
  {
    slug: "royal-trio",
    title: "Royal Trío",
    descriptor: "Movimiento, claridad y un carácter cálido.",
    logo: "/brand/formats/royal-trio-dark.png",
    logoLight: "/brand/formats/royal-trio-light.png",
    image: "/media/selection-web/ae-036-trio-outdoor.webp",
    imageAlt: "Trío acústico durante una presentación al aire libre.",
    imagePosition: "center",
  },
  {
    slug: "unplugged",
    title: "Unplugged",
    descriptor: "Un ensamble amplio, adaptable y con mayor profundidad sonora.",
    logo: "/brand/formats/royal-unplugged-dark.png",
    logoLight: "/brand/formats/royal-unplugged-light.png",
    image: "/media/selection-web/ae-042-corporate-band.webp",
    imageAlt: "Ensamble completo durante una presentación en vivo.",
    imagePosition: "center 54%",
  },
] as const;

export const solutionPages = {
  bodas: {
    label: "Bodas y celebraciones privadas",
    title: "Música para cada momento.",
    intro:
      "Ceremonias, recepciones, cenas y momentos especiales diseñados con un acompañamiento musical real y bien equilibrado.",
    image: "/media/selection-web/ae-033-formal-reception.webp",
    imageAlt: "Presentación musical frente a los invitados de una recepción.",
    imagePosition: "center 58%",
    imageFit: "cover",
    points: ["Ceremonias", "Recepciones", "Cenas", "Momentos especiales"],
    source: "Dossier, p. 19",
  },
  hoteles: {
    label: "Hoteles y espacios para eventos",
    title: "Presencia, sonido y adaptación.",
    intro:
      "Programaciones musicales, temporadas acústicas, experiencias para huéspedes y presentaciones temáticas adaptadas al estilo de cada lugar.",
    image: "/media/selection-web/ae-036-trio-outdoor.webp",
    imageAlt: "Trío acústico durante una presentación al aire libre.",
    imagePosition: "center",
    imageFit: "cover",
    points: [
      "Programaciones musicales",
      "Temporadas acústicas",
      "Experiencias para huéspedes",
      "Presentaciones temáticas",
    ],
    source: "Dossier, p. 19",
  },
  restaurantes: {
    label: "Cócteles y cenas privadas",
    title: "Una atmósfera cercana y bien construida.",
    intro:
      "Música en vivo con sonido profesional, presencia escénica y una ejecución cuidada en cada detalle.",
    image: "/media/ae-live-seated.jpg",
    imageAlt: "Adrián Eugenio interpreta guitarra en formato acústico.",
    imagePosition: "center 10%",
    imageFit: "cover",
    points: ["Cócteles", "Cenas privadas", "Recepciones", "Eventos especiales"],
    source: "Dossier, p. 6",
  },
  "eventos-corporativos": {
    label: "Eventos empresariales y corporativos",
    title: "Claridad musical y técnica.",
    intro:
      "Inauguraciones, presentaciones, conferencias, cenas de gala y reuniones ejecutivas que requieren un ambiente sonoro profesional y discreto.",
    image: "/media/selection-web/ae-048-corporate-performance.webp",
    imageAlt: "Adrián Eugenio interpreta guitarra durante un evento corporativo.",
    imagePosition: "center 38%",
    imageFit: "cover",
    points: [
      "Inauguraciones",
      "Presentaciones",
      "Conferencias",
      "Cenas de gala",
    ],
    source: "Dossier, p. 19",
  },
} as const;

export const formatPages = {
  solista: {
    title: "Solista",
    logo: "/brand/formats/royal-solista-light.png",
    image: "/media/selection-web/ae-011-solo-outdoor.webp",
    imageAlt: "Adrián Eugenio interpreta guitarra y voz en vivo.",
    imagePosition: "center 42%",
    imageFit: "cover",
    intro: "Minimalista, claro y con presencia real.",
    description:
      "Interpretado por Adrián Eugenio, combina voz principal, guitarra en vivo y playback original creado exclusivamente para el performance del show. Puede presentarse de forma completamente acústica o apoyarse en playback según el ambiente del evento.",
    repertoire:
      "Oldies en inglés y español, pop suave, baladas modernas, clásicos románticos y selecciones de trova.",
    contexts: ["Cócteles", "Cenas", "Recepciones", "Petit comité"],
    source: "Dossier, p. 7",
  },
  "royal-trio": {
    title: "Royal Trío",
    logo: "/brand/formats/royal-trio-light.png",
    image: "/media/selection-web/ae-039-royal-trio.webp",
    imageAlt: "Royal Trío durante una presentación en vivo.",
    imagePosition: "center",
    imageFit: "cover",
    intro: "Sonido claro, moderno y bien definido.",
    description:
      "Formato acústico con un carácter cálido y contemporáneo. Recorre repertorios románticos, baladas, música latina suave, oldies, pop en inglés y español y clásicos internacionales.",
    repertoire:
      "Un sonido equilibrado que combina movimiento, claridad y carácter cálido.",
    contexts: [
      "Bodas",
      "Cócteles",
      "Eventos sociales",
      "Eventos empresariales",
    ],
    source: "Dossier, p. 10 · Configuración vigente según arquitectura aprobada",
  },
  unplugged: {
    title: "Unplugged",
    logo: "/brand/formats/royal-unplugged-light.png",
    image: "/media/selection-web/ae-042-corporate-band.webp",
    imageAlt: "Ensamble completo durante una presentación en vivo.",
    imagePosition: "center 54%",
    imageFit: "cover",
    intro: "Un ensamble amplio, adaptable y con mayor profundidad sonora.",
    description:
      "Formato acústico integrado por 5 a 6 músicos seleccionados, pensado para ofrecer un ensamble más amplio, adaptable y con mayor profundidad sonora.",
    repertoire:
      "Jazz suave, soul, baladas en inglés y español, oldies, pop internacional y versiones acústicas.",
    contexts: ["Cócteles", "Cenas", "Recepciones", "Celebraciones"],
    source: "Dossier, p. 11 · Alcance vigente según arquitectura aprobada",
  },
} as const;

export const portfolioItems = [
  {
    src: "/media/selection-web/ae-033-formal-reception.webp",
    alt: "Presentación musical frente a los invitados de una recepción.",
    label: "Recepción",
    wide: true,
    objectPosition: "center 58%",
  },
  {
    src: "/media/ae-live-outdoor.jpg",
    alt: "Presentación musical al aire libre.",
    label: "Presentación al aire libre",
    wide: false,
    objectPosition: "center 38%",
  },
  {
    src: "/media/selection-web/ae-040-duo-performance.webp",
    alt: "Dúo de voz, guitarra y teclado durante una presentación.",
    label: "Dúo",
    wide: false,
    objectPosition: "center 42%",
  },
  {
    src: "/media/ae-live-seated.jpg",
    alt: "Presentación de guitarra y voz en formato acústico.",
    label: "Formato acústico",
    wide: false,
    objectPosition: "center 10%",
  },
  {
    src: "/media/selection-web/ae-025-ensemble-keyboard.webp",
    alt: "Músicos durante una presentación con guitarra y teclado.",
    label: "Ensamble",
    wide: false,
    objectPosition: "center 46%",
  },
  {
    src: "/media/selection-web/ae-042-corporate-band.webp",
    alt: "Ensamble completo durante un evento corporativo.",
    label: "Evento corporativo",
    wide: false,
    objectPosition: "center 54%",
  },
  {
    src: "/media/selection-web/ae-050-production-setup.webp",
    alt: "Montaje de instrumentos, audio e iluminación antes de un evento.",
    label: "Montaje técnico",
    wide: true,
    objectPosition: "center 62%",
  },
  {
    src: "/media/ae-live-event.jpg",
    alt: "Adrián Eugenio interpreta guitarra durante un evento.",
    label: "Presentación en vivo",
    wide: false,
    objectPosition: "center 42%",
  },
  {
    src: "/media/selection-web/ae-037-solo-performance.webp",
    alt: "Adrián Eugenio interpreta guitarra y voz en vivo.",
    label: "Solista",
    wide: false,
    objectPosition: "center 44%",
  },
  {
    src: "/media/ae-live-tuxedo.jpg",
    alt: "Adrián Eugenio interpreta guitarra con vestimenta formal.",
    label: "Presentación formal",
    wide: false,
    objectPosition: "center 36%",
  },
  {
    src: "/media/selection-web/ae-029-audio-stage.webp",
    alt: "Sistema de audio, instrumentos e iluminación preparados para un evento.",
    label: "Audio y escenario",
    wide: false,
    objectPosition: "center 58%",
  },
  {
    src: "/media/selection-web/ae-048-corporate-performance.webp",
    alt: "Adrián Eugenio interpreta guitarra durante un evento corporativo.",
    label: "Interpretación en vivo",
    wide: false,
    objectPosition: "center 38%",
  },
  {
    src: "/media/selection-web/ae-028-trio-event.webp",
    alt: "Trío durante una presentación en un espacio para eventos.",
    label: "Trío",
    wide: false,
    objectPosition: "center 48%",
  },
] as const;

export const homeEvidenceItems = [
  portfolioItems[7],
  portfolioItems[2],
  portfolioItems[4],
  portfolioItems[10],
] as const;
