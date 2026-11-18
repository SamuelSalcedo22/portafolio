/*
 * ─────────────────────────────────────────────────────────────
 *  TODO EL CONTENIDO DEL PORTAFOLIO VIVE AQUÍ.
 *  Para cambiar un texto, un enlace o agregar un proyecto,
 *  edita este archivo: no hace falta tocar los componentes.
 *
 *  Textos en dos idiomas: { es: "…", en: "…" }.
 *  Si un texto es igual en ambos (ej. "Next.js"), basta con "…".
 *  Lo marcado con "PENDIENTE" es contenido de ejemplo.
 * ─────────────────────────────────────────────────────────────
 */

import type { Text } from "./text";

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
  description: Text;
  tags: Text[];
  github: string;
  /** Enlace para ver o descargar el proyecto (opcional). */
  demo?: string;
  demoLabel?: Text;
  year: string;
  /** Logo del proyecto en /public/images/logos. */
  logo: string;
  colors: [string, string, string];
};

/** Testimonio ya listo para mostrar (los que llegan de Supabase son así). */
export type Testimonial = {
  name: string;
  role: string;
  text: string;
  /** Ruta de una foto en /public/images (opcional). */
  photo?: string;
  stars: number;
};

/** Testimonio de ejemplo escrito en ambos idiomas. */
export type TestimonialSeed = {
  name: Text;
  role: Text;
  text: Text;
  photo?: string;
  stars: number;
};

export type ExperienceItem = {
  title: Text;
  place: Text;
  start: Text;
  end: Text;
  description: Text;
  link?: string;
};

export type Skill = {
  name: Text;
  detail: Text;
  type: "skill" | "aptitude";
};

export type Interest = {
  kind: PosterKind;
  title: Text;
  caption: Text;
  colors: [string, string, string];
};

const ORANGE = "#ff4321";
const CREAM = "#f6e6d4";
const INK = "#0a0a0a";
const YELLOW = "#ffd23f";
const BLUE = "#2f6bff";
const PINK = "#ff7ac3";
const MINT = "#7fe3c4";

const PRESENT: Text = { es: "Actualidad", en: "Present" };

export const profile = {
  firstName: "Samuel",
  lastName: "Salcedo",
  initials: "SS",
  role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" } as Text,
  tagline: {
    es: "Construyo aplicaciones web de punta a punta: interfaces con carácter y APIs que aguantan.",
    en: "I build web apps end to end: interfaces with character and APIs that hold up.",
  } as Text,
  location: "Pasto, Nariño · Colombia",
  university: "Universidad Cooperativa de Colombia",
  // Hoja de vida que se descarga según el idioma. Para cambiarla, reemplaza el archivo en public/.
  cv: { es: "/Hoja-de-vida-Samuel-Salcedo.pdf", en: "/CV-Samuel-Salcedo-EN.pdf" } as Text,
  photo: "/images/avatar.jpg" as string | undefined,
  email: "samuelandressalcedomartinez@gmail.com",
  github: "https://github.com/SamuelSalcedo22",
  linkedin: "https://www.linkedin.com/in/samuel-andres-salcedo-martinez-0803742ba",
  whatsapp: "", // opcional, ej. "https://wa.me/57XXXXXXXXXX"
};

export const about = {
  paragraph: {
    es: "Soy Samuel, estudiante de Ingeniería de Software en Pasto y desarrollador full stack. Me gusta tomar una idea, diseñarle una interfaz con personalidad y llevarla hasta producción con una API sólida detrás. Me mueven la inteligencia artificial, la automatización y convertir buenas ideas en emprendimientos reales.",
    en: "I'm Samuel, a Software Engineering student in Pasto and a full stack developer. I love taking an idea, giving it an interface with personality and shipping it to production with a solid API behind it. I'm driven by artificial intelligence, automation and turning good ideas into real ventures.",
  } as Text,
  facts: [
    { label: { es: "Ubicación", en: "Location" }, value: "Pasto, Nariño" },
    { label: { es: "Estudio en", en: "Studying at" }, value: "U. Cooperativa de Colombia" },
    {
      label: { es: "Intereses", en: "Interests" },
      value: {
        es: "Inteligencia artificial · Desarrollo de software · Emprendimiento · Automatización",
        en: "Artificial intelligence · Software development · Entrepreneurship · Automation",
      },
    },
  ] as { label: Text; value: Text }[],
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
    title: { es: "Inteligencia artificial", en: "Artificial intelligence" },
    caption: { es: "Modelos que pronostican, ven y recomiendan.", en: "Models that forecast, see and recommend." },
    colors: [ORANGE, INK, CREAM],
  },
  {
    kind: "code",
    title: { es: "Programación", en: "Programming" },
    caption: { es: "Mi forma favorita de construir cosas.", en: "My favorite way to build things." },
    colors: [CREAM, INK, ORANGE],
  },
  {
    kind: "rocket",
    title: { es: "Emprendimiento", en: "Entrepreneurship" },
    caption: { es: "Ideas que se vuelven productos reales.", en: "Ideas that become real products." },
    colors: [BLUE, CREAM, YELLOW],
  },
  {
    kind: "gear",
    title: { es: "Automatización", en: "Automation" },
    caption: { es: "De la mecatrónica al software.", en: "From mechatronics to software." },
    colors: [YELLOW, INK, ORANGE],
  },
  {
    kind: "pixel",
    title: { es: "Videojuegos", en: "Video games" },
    caption: { es: "También los construyo: mira Marble Overdrive.", en: "I build them too: check out Marble Overdrive." },
    colors: [PINK, INK, YELLOW],
  },
  {
    kind: "vinyl",
    title: { es: "Música", en: "Music" },
    caption: { es: "La banda sonora de cada sesión de código.", en: "The soundtrack of every coding session." },
    colors: [MINT, INK, PINK],
  },
];

export const projects: Project[] = [
  {
    title: "ImpulsoPYME",
    description: {
      es: "Sistema de gestión para pequeños negocios colombianos: ventas, inventario, clientes y proveedores, con un panel e IA que pronostica ventas y detecta anomalías.",
      en: "Management system for small Colombian businesses: sales, inventory, customers and suppliers, with a dashboard and AI that forecasts sales and detects anomalies.",
    },
    tags: ["JavaScript", "Node.js", { es: "IA", en: "AI" }, "Docker"],
    github: "https://github.com/SamuelSalcedo22/impulsopyme",
    demo: "https://impulsopyme.onrender.com",
    demoLabel: { es: "Demo en vivo", en: "Live demo" },
    year: "2026",
    logo: "/images/logos/impulsopyme.svg",
    colors: [ORANGE, INK, CREAM],
  },
  {
    title: "Eco-Desafíos Urbanos",
    description: {
      es: "App móvil de micro-voluntariado urbano: misiones, evidencia fotográfica validada con visión por computador, puntos, ranking y mapa de actividades.",
      en: "Urban micro-volunteering mobile app: missions, photo evidence validated with computer vision, points, a leaderboard and an activity map.",
    },
    tags: ["React Native", "Expo", "TypeScript", "Supabase", "Gemini"],
    github: "https://github.com/SamuelSalcedo22/eco-desafios-urbanos",
    demo: "https://github.com/SamuelSalcedo22/eco-desafios-urbanos/releases/latest",
    demoLabel: { es: "Descargar app", en: "Download app" },
    year: "2026",
    logo: "/images/logos/eco-desafios.png",
    colors: [MINT, INK, YELLOW],
  },
  {
    title: "Marble Overdrive",
    description: {
      es: "Juego 3D local para dos jugadores: canicas luminosas que compiten en una pista compartida, con poderes, freno y una ciudad industrial de fondo. Proyecto en equipo.",
      en: "Local 3D game for two players: glowing marbles race on a shared track, with powers, brakes and an industrial city as a backdrop. Team project.",
    },
    tags: ["Godot 4", "GDScript", "Shaders", { es: "Trabajo en equipo", en: "Teamwork" }],
    github: "https://github.com/danilolarap/MarbleOverdrive",
    year: "2026",
    logo: "/images/logos/marble-overdrive.svg",
    colors: [BLUE, CREAM, YELLOW],
  },
  {
    title: "Postura Wear",
    description: {
      es: "App para smartwatch (Wear OS) que acompaña tu postura mientras estudias o trabajas: usa acelerómetro y giroscopio para reconocer patrones y vibra cuando detecta una posible mala postura.",
      en: "Smartwatch app (Wear OS) that looks after your posture while you study or work: it uses the accelerometer and gyroscope to recognize patterns and vibrates when it detects possible bad posture.",
    },
    tags: ["Kotlin", "Wear OS", "FastAPI", "Vertex AI", "Gemini"],
    github: "https://github.com/SamuelSalcedo22/postura-wear",
    year: "2026",
    logo: "/images/logos/postura-wear.svg",
    colors: [YELLOW, INK, ORANGE],
  },
];

// PENDIENTE: testimonios de ejemplo. Solo se muestran mientras haya menos de
// tres testimonios aprobados en Supabase.
export const testimonials: TestimonialSeed[] = [
  {
    name: { es: "Nombre del profesor", en: "Teacher's name" },
    role: { es: "Profesor · por confirmar", en: "Teacher · to be confirmed" },
    text: {
      es: "Espacio reservado para el testimonio de un profesor sobre tu trabajo en clase.",
      en: "Placeholder for a teacher's testimonial about your work in class.",
    },
    stars: 5,
  },
  {
    name: { es: "Nombre del compañero", en: "Classmate's name" },
    role: { es: "Compañero de equipo · por confirmar", en: "Teammate · to be confirmed" },
    text: {
      es: "Espacio reservado para el testimonio de alguien que haya hecho un proyecto contigo.",
      en: "Placeholder for a testimonial from someone who built a project with you.",
    },
    stars: 5,
  },
  {
    name: { es: "Nombre del cliente", en: "Client's name" },
    role: { es: "Cliente o usuario · por confirmar", en: "Client or user · to be confirmed" },
    text: {
      es: "Espacio reservado para el testimonio de alguien que haya usado algo que construiste.",
      en: "Placeholder for a testimonial from someone who used something you built.",
    },
    stars: 5,
  },
];

// De lo más reciente a lo más antiguo.
export const academic: ExperienceItem[] = [
  {
    title: { es: "Ingeniería de Software", en: "Software Engineering" },
    place: "Universidad Cooperativa de Colombia · Pasto",
    start: "2024",
    end: PRESENT,
    description: {
      es: "Formación en desarrollo de software, bases de datos y diseño de interfaces, con proyectos orientados a los Objetivos de Desarrollo Sostenible.",
      en: "Training in software development, databases and interface design, with projects aligned with the Sustainable Development Goals.",
    },
  },
  {
    title: {
      es: "Tecnólogo en Diseño e Integración de Automatismos Mecatrónicos",
      en: "Technologist in Design and Integration of Mechatronic Automation Systems",
    },
    place: "SENA · Centro Lope · Pasto",
    start: "2022",
    end: "2024",
    description: {
      es: "Diseño, montaje e integración de sistemas automáticos: electrónica, control, programación y mecánica aplicadas a procesos industriales.",
      en: "Design, assembly and integration of automated systems: electronics, control, programming and mechanics applied to industrial processes.",
    },
  },
];

export const work: ExperienceItem[] = [
  {
    title: { es: "Desarrollador full stack", en: "Full stack developer" },
    place: { es: "ImpulsoPYME · proyecto", en: "ImpulsoPYME · project" },
    start: "2026",
    end: PRESENT,
    description: {
      es: "Diseñé y construí un sistema de gestión para pequeños negocios con panel de control, pruebas automatizadas e IA para pronosticar ventas.",
      en: "I designed and built a management system for small businesses with a dashboard, automated tests and AI to forecast sales.",
    },
    link: "https://github.com/SamuelSalcedo22/impulsopyme",
  },
  {
    title: { es: "Desarrollador móvil", en: "Mobile developer" },
    place: { es: "Eco-Desafíos Urbanos · proyecto", en: "Eco-Desafíos Urbanos · project" },
    start: "2026",
    end: "2026",
    description: {
      es: "App de micro-voluntariado urbano con misiones, geolocalización, ranking y validación de evidencias fotográficas con visión por computador.",
      en: "Urban micro-volunteering app with missions, geolocation, a leaderboard and photo evidence validation using computer vision.",
    },
    link: "https://github.com/SamuelSalcedo22/eco-desafios-urbanos",
  },
  {
    title: { es: "Desarrollador backend", en: "Backend developer" },
    place: { es: "API de Triage Clínico · proyecto", en: "Clinical Triage API · project" },
    start: "2026",
    end: "2026",
    description: {
      es: "API REST con NestJS, TypeORM y PostgreSQL que calcula el riesgo de pacientes con NEWS2 y ordena los casos por prioridad.",
      en: "REST API built with NestJS, TypeORM and PostgreSQL that computes patient risk with NEWS2 and sorts cases by priority.",
    },
    link: "https://github.com/SamuelSalcedo22/triage-api",
  },
];

// Sección adicional: habilidades (técnicas) y aptitudes (personales).
export const skills: Skill[] = [
  { name: "Frontend", detail: "Next.js · React · Tailwind", type: "skill" },
  { name: "Backend", detail: "NestJS · Node.js · Java", type: "skill" },
  { name: { es: "Apps móviles", en: "Mobile apps" }, detail: "React Native · Expo", type: "skill" },
  { name: { es: "Bases de datos", en: "Databases" }, detail: "PostgreSQL · Supabase", type: "skill" },
  { name: { es: "IA aplicada", en: "Applied AI" }, detail: { es: "Pronósticos · Visión", en: "Forecasting · Vision" }, type: "skill" },
  { name: { es: "Automatización", en: "Automation" }, detail: { es: "Mecatrónica · Control", en: "Mechatronics · Control" }, type: "skill" },
  { name: { es: "Trabajo en equipo", en: "Teamwork" }, detail: { es: "Git · Revisión de código", en: "Git · Code review" }, type: "aptitude" },
  { name: { es: "Resolver problemas", en: "Problem solving" }, detail: { es: "Analizar · Probar · Iterar", en: "Analyze · Test · Iterate" }, type: "aptitude" },
  { name: { es: "Autodidacta", en: "Self-taught" }, detail: { es: "Aprendo rápido lo nuevo", en: "I pick up new things fast" }, type: "aptitude" },
  { name: { es: "Emprendedor", en: "Entrepreneurial" }, detail: { es: "De la idea al producto", en: "From idea to product" }, type: "aptitude" },
  { name: { es: "Creatividad", en: "Creativity" }, detail: { es: "Interfaces con carácter", en: "Interfaces with character" }, type: "aptitude" },
  { name: { es: "Responsabilidad", en: "Reliability" }, detail: { es: "Cumplo lo que entrego", en: "I deliver what I promise" }, type: "aptitude" },
];

export const navLinks: { id: string; label: Text }[] = [
  { id: "inicio", label: { es: "Inicio", en: "Home" } },
  { id: "sobre-mi", label: { es: "Sobre mí", en: "About" } },
  { id: "proyectos", label: { es: "Proyectos", en: "Projects" } },
  { id: "testimonios", label: { es: "Testimonios", en: "Testimonials" } },
  { id: "experiencia", label: { es: "Experiencia", en: "Experience" } },
  { id: "contacto", label: { es: "Contacto", en: "Contact" } },
  { id: "habilidades", label: { es: "Habilidades", en: "Skills" } },
];
