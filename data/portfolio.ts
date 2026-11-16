/*
 * ─────────────────────────────────────────────────────────────
 *  TODO EL CONTENIDO DEL PORTAFOLIO VIVE AQUÍ.
 *  Para cambiar un texto, un enlace o agregar un proyecto,
 *  edita este archivo: no hace falta tocar los componentes.
 *  Lo marcado con "PENDIENTE" es contenido de ejemplo.
 * ─────────────────────────────────────────────────────────────
 */

export type PosterKind =
  | "vinyl"
  | "pixel"
  | "code"
  | "ai"
  | "rocket"
  | "gear"
  | "initials"
  | "number"
  | "blank";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  github: string;
  /** Enlace para ver o descargar el proyecto (opcional). */
  demo?: string;
  demoLabel?: string;
  year: string;
  /** Logo del proyecto en /public/images/logos. */
  logo: string;
  colors: [string, string, string];
};

export type Testimonial = {
  name: string;
  role: string;
  text: string;
  /** Ruta de una foto en /public/images (opcional). */
  photo?: string;
  stars: number;
};

export type ExperienceItem = {
  title: string;
  place: string;
  start: string;
  end: string;
  description: string;
  link?: string;
};

export type Skill = {
  name: string;
  detail: string;
  type: "Habilidad" | "Aptitud";
};

export type Interest = {
  kind: PosterKind;
  title: string;
  caption: string;
  colors: [string, string, string];
};

const ORANGE = "#ff4321";
const CREAM = "#f6e6d4";
const INK = "#0a0a0a";
const YELLOW = "#ffd23f";
const BLUE = "#2f6bff";
const PINK = "#ff7ac3";
const MINT = "#7fe3c4";

export const profile = {
  firstName: "Samuel",
  lastName: "Salcedo",
  initials: "SS",
  role: "Desarrollador Full Stack",
  tagline:
    "Construyo aplicaciones web de punta a punta: interfaces con carácter y APIs que aguantan.",
  location: "Pasto, Nariño · Colombia",
  university: "Universidad Cooperativa de Colombia",
  cv: "/cv.pdf", // Reemplaza public/cv.pdf por tu hoja de vida real
  photo: "/images/avatar.jpg" as string | undefined,
  email: "samuelandressalcedomartinez@gmail.com",
  github: "https://github.com/SamuelSalcedo22",
  linkedin: "https://www.linkedin.com/in/samuel-andres-salcedo-martinez-0803742ba",
  whatsapp: "", // opcional, ej. "https://wa.me/57XXXXXXXXXX"
};

export const about = {
  paragraph:
    "Soy Samuel, estudiante de Ingeniería de Software en Pasto y desarrollador full stack. Me gusta tomar una idea, diseñarle una interfaz con personalidad y llevarla hasta producción con una API sólida detrás. Me mueven la inteligencia artificial, la automatización y convertir buenas ideas en emprendimientos reales.",
  facts: [
    { label: "Ubicación", value: "Pasto, Nariño" },
    { label: "Estudio en", value: "U. Cooperativa de Colombia" },
    {
      label: "Intereses",
      value: "Inteligencia artificial · Desarrollo de software · Emprendimiento · Automatización",
    },
  ],
  skills: [
    "Next.js",
    "React",
    "React Native",
    "TypeScript",
    "Tailwind CSS",
    "NestJS",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "Java",
    "Python",
    "Docker",
    "Git & GitHub",
  ],
};

export const interests: Interest[] = [
  {
    kind: "ai",
    title: "Inteligencia artificial",
    caption: "Modelos que pronostican, ven y recomiendan.",
    colors: [ORANGE, INK, CREAM],
  },
  {
    kind: "code",
    title: "Programación",
    caption: "Mi forma favorita de construir cosas.",
    colors: [CREAM, INK, ORANGE],
  },
  {
    kind: "rocket",
    title: "Emprendimiento",
    caption: "Ideas que se vuelven productos reales.",
    colors: [BLUE, CREAM, YELLOW],
  },
  {
    kind: "gear",
    title: "Automatización",
    caption: "De la mecatrónica al software.",
    colors: [YELLOW, INK, ORANGE],
  },
  {
    kind: "pixel",
    title: "Videojuegos",
    caption: "También los construyo: mira Marble Overdrive.",
    colors: [PINK, INK, YELLOW],
  },
  {
    kind: "vinyl",
    title: "Música",
    caption: "La banda sonora de cada sesión de código.",
    colors: [MINT, INK, PINK],
  },
];

export const projects: Project[] = [
  {
    title: "ImpulsoPYME",
    description:
      "Sistema de gestión para pequeños negocios colombianos: ventas, inventario, clientes y proveedores, con un panel e IA que pronostica ventas y detecta anomalías.",
    tags: ["JavaScript", "Node.js", "IA", "Docker"],
    github: "https://github.com/SamuelSalcedo22/impulsopyme",
    demo: "https://impulsopyme.onrender.com",
    demoLabel: "Demo en vivo",
    year: "2026",
    logo: "/images/logos/impulsopyme.svg",
    colors: [ORANGE, INK, CREAM],
  },
  {
    title: "Eco-Desafíos Urbanos",
    description:
      "App móvil de micro-voluntariado urbano: misiones, evidencia fotográfica validada con visión por computador, puntos, ranking y mapa de actividades.",
    tags: ["React Native", "Expo", "TypeScript", "Supabase", "Gemini"],
    github: "https://github.com/SamuelSalcedo22/eco-desafios-urbanos",
    demo: "https://github.com/SamuelSalcedo22/eco-desafios-urbanos/releases/latest",
    demoLabel: "Descargar app",
    year: "2026",
    logo: "/images/logos/eco-desafios.png",
    colors: [MINT, INK, YELLOW],
  },
  {
    title: "Marble Overdrive",
    description:
      "Juego 3D local para dos jugadores: canicas luminosas que compiten en una pista compartida, con poderes, freno y una ciudad industrial de fondo. Proyecto en equipo.",
    tags: ["Godot 4", "GDScript", "Shaders", "Trabajo en equipo"],
    github: "https://github.com/danilolarap/MarbleOverdrive",
    year: "2026",
    logo: "/images/logos/marble-overdrive.svg",
    colors: [BLUE, CREAM, YELLOW],
  },
  {
    title: "Postura Wear",
    description:
      "App para smartwatch (Wear OS) que acompaña tu postura mientras estudias o trabajas: usa acelerómetro y giroscopio para reconocer patrones y vibra cuando detecta una posible mala postura.",
    tags: ["Kotlin", "Wear OS", "FastAPI", "Vertex AI", "Gemini"],
    github: "https://github.com/SamuelSalcedo22/postura-wear",
    year: "2026",
    logo: "/images/logos/postura-wear.svg",
    colors: [YELLOW, INK, ORANGE],
  },
];

// PENDIENTE: estos tres testimonios son de ejemplo. Cámbialos por opiniones reales
// de profesores, compañeros o clientes (mínimo 3).
export const testimonials: Testimonial[] = [
  {
    name: "Nombre del profesor",
    role: "Profesor · por confirmar",
    text: "Espacio reservado para el testimonio de un profesor sobre tu trabajo en clase.",
    stars: 5,
  },
  {
    name: "Nombre del compañero",
    role: "Compañero de equipo · por confirmar",
    text: "Espacio reservado para el testimonio de alguien que haya hecho un proyecto contigo.",
    stars: 5,
  },
  {
    name: "Nombre del cliente",
    role: "Cliente o usuario · por confirmar",
    text: "Espacio reservado para el testimonio de alguien que haya usado algo que construiste.",
    stars: 5,
  },
];

// De lo más reciente a lo más antiguo.
export const academic: ExperienceItem[] = [
  {
    title: "Ingeniería de Software",
    place: "Universidad Cooperativa de Colombia · Pasto",
    start: "2024",
    end: "Actualidad",
    description:
      "Formación en desarrollo de software, bases de datos y diseño de interfaces, con proyectos orientados a los Objetivos de Desarrollo Sostenible.",
  },
  {
    title: "Tecnólogo en Diseño e Integración de Automatismos Mecatrónicos",
    place: "SENA · Centro Lope · Pasto",
    start: "2022",
    end: "2024",
    description:
      "Diseño, montaje e integración de sistemas automáticos: electrónica, control, programación y mecánica aplicadas a procesos industriales.",
  },
];

export const work: ExperienceItem[] = [
  {
    title: "Desarrollador full stack",
    place: "ImpulsoPYME · proyecto",
    start: "2026",
    end: "Actualidad",
    description:
      "Diseñé y construí un sistema de gestión para pequeños negocios con panel de control, pruebas automatizadas e IA para pronosticar ventas.",
    link: "https://github.com/SamuelSalcedo22/impulsopyme",
  },
  {
    title: "Desarrollador móvil",
    place: "Eco-Desafíos Urbanos · proyecto",
    start: "2026",
    end: "2026",
    description:
      "App de micro-voluntariado urbano con misiones, geolocalización, ranking y validación de evidencias fotográficas con visión por computador.",
    link: "https://github.com/SamuelSalcedo22/eco-desafios-urbanos",
  },
  {
    title: "Desarrollador backend",
    place: "API de Triage Clínico · proyecto",
    start: "2026",
    end: "2026",
    description:
      "API REST con NestJS, TypeORM y PostgreSQL que calcula el riesgo de pacientes con NEWS2 y ordena los casos por prioridad.",
    link: "https://github.com/SamuelSalcedo22/triage-api",
  },
];

// Sección adicional: habilidades (técnicas) y aptitudes (personales).
export const skills: Skill[] = [
  { name: "Frontend", detail: "Next.js · React · Tailwind", type: "Habilidad" },
  { name: "Backend", detail: "NestJS · Node.js · Java", type: "Habilidad" },
  { name: "Apps móviles", detail: "React Native · Expo", type: "Habilidad" },
  { name: "Bases de datos", detail: "PostgreSQL · Supabase", type: "Habilidad" },
  { name: "IA aplicada", detail: "Pronósticos · Visión", type: "Habilidad" },
  { name: "Automatización", detail: "Mecatrónica · Control", type: "Habilidad" },
  { name: "Trabajo en equipo", detail: "Git · Revisión de código", type: "Aptitud" },
  { name: "Resolver problemas", detail: "Analizar · Probar · Iterar", type: "Aptitud" },
  { name: "Autodidacta", detail: "Aprendo rápido lo nuevo", type: "Aptitud" },
  { name: "Emprendedor", detail: "De la idea al producto", type: "Aptitud" },
  { name: "Creatividad", detail: "Interfaces con carácter", type: "Aptitud" },
  { name: "Responsabilidad", detail: "Cumplo lo que entrego", type: "Aptitud" },
];

export const navLinks = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "testimonios", label: "Testimonios" },
  { id: "experiencia", label: "Experiencia" },
  { id: "contacto", label: "Contacto" },
  { id: "habilidades", label: "Habilidades" },
];
