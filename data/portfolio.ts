/*
 * ─────────────────────────────────────────────────────────────
 *  TODO EL CONTENIDO DEL PORTAFOLIO VIVE AQUÍ.
 *  Para cambiar un texto, un enlace o agregar un proyecto,
 *  edita este archivo: no hace falta tocar los componentes.
 *  Lo marcado con "PENDIENTE" es contenido de ejemplo.
 * ─────────────────────────────────────────────────────────────
 */

export type PosterKind = "vinyl" | "pixel" | "code" | "anime" | "initials" | "number";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  year: string;
  /** Ruta de una captura en /public/images (opcional). Si falta, se genera una portada. */
  image?: string;
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

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  link?: string;
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
  semester: "PENDIENTE: tu semestre", // PENDIENTE
  cv: "/cv.pdf", // Reemplaza public/cv.pdf por tu hoja de vida real
  photo: undefined as string | undefined, // ej. "/images/foto.jpg"
  email: "tu-correo@ejemplo.com", // PENDIENTE
  github: "https://github.com/SamuelSalcedo22",
  linkedin: "https://www.linkedin.com/", // PENDIENTE: tu perfil
  whatsapp: "", // opcional, ej. "https://wa.me/57XXXXXXXXXX"
  /** Opcional: endpoint de Formspree (https://formspree.io/f/xxxx). Si está vacío, el formulario abre tu app de correo. */
  formEndpoint: "",
};

export const about = {
  paragraph:
    "Soy Samuel, estudiante de ingeniería en Pasto y desarrollador full stack. Me gusta tomar una idea, diseñarle una interfaz con personalidad y llevarla hasta producción con una API sólida detrás. Programo con música puesta, aprendo jugando y casi siempre hay un anime esperándome al terminar el commit.",
  facts: [
    { label: "Ubicación", value: "Pasto, Nariño" },
    { label: "Estudio en", value: "U. Cooperativa de Colombia" },
    { label: "Semestre", value: "Por confirmar" }, // PENDIENTE
    { label: "Intereses", value: "Música · Videojuegos · Anime · Código" },
  ],
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "NestJS",
    "Node.js",
    "PostgreSQL",
    "TypeORM",
    "Java",
    "Python",
    "Docker",
    "Git & GitHub",
  ],
};

export const interests: Interest[] = [
  {
    kind: "vinyl",
    title: "Música",
    caption: "La banda sonora de cada sesión de código.",
    colors: [ORANGE, INK, CREAM],
  },
  {
    kind: "pixel",
    title: "Videojuegos",
    caption: "Donde aprendí a insistir hasta pasar el nivel.",
    colors: [BLUE, YELLOW, INK],
  },
  {
    kind: "anime",
    title: "Anime",
    caption: "Historias que me enseñaron a no rendirme.",
    colors: [PINK, INK, YELLOW],
  },
  {
    kind: "code",
    title: "Código",
    caption: "Mi forma favorita de construir cosas.",
    colors: [CREAM, INK, ORANGE],
  },
  {
    kind: "vinyl",
    title: "Playlists",
    caption: "Una para depurar, otra para desplegar.",
    colors: [YELLOW, INK, ORANGE],
  },
  {
    kind: "pixel",
    title: "Retro",
    caption: "8 bits, cero excusas.",
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
    image: "/images/impulsopyme.jpg",
    year: "2026",
    colors: [ORANGE, INK, CREAM],
  },
  {
    title: "Dakingo",
    description:
      "Tienda de panadería con catálogo, filtros por categoría y carrito, recreada a partir de un diseño de referencia.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/SamuelSalcedo22/dakingo-nextjs",
    demo: "https://dakingo-nextjs.vercel.app",
    image: "/images/dakingo.jpg",
    year: "2026",
    colors: [YELLOW, INK, ORANGE],
  },
  {
    title: "Aerial Checkout",
    description:
      "Flujo de selección de asientos y pago de una aerolínea, clonado al píxel con animaciones fluidas.",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    github: "https://github.com/SamuelSalcedo22/TallerCheckOut-",
    demo: "https://taller-check-out.vercel.app",
    image: "/images/aerial.jpg",
    year: "2026",
    colors: [BLUE, CREAM, YELLOW],
  },
  {
    title: "Flex Dashboard",
    description:
      "Réplica fiel de un panel de analítica para e-commerce: métricas, gráficas de sesiones y conversión.",
    tags: ["Next.js", "TypeScript", "CSS"],
    github: "https://github.com/SamuelSalcedo22/Ejercicio-replica",
    demo: "https://ejercicio-replica.vercel.app",
    image: "/images/replica.jpg",
    year: "2026",
    colors: [PINK, INK, CREAM],
  },
  {
    title: "Vision Glass Player",
    description:
      "Reproductor de video con estética de vidrio esmerilado al estilo visionOS: capas, desenfoque y transparencias.",
    tags: ["HTML", "CSS"],
    github: "https://github.com/SamuelSalcedo22/Glassmorphism",
    demo: "https://glassmorphism-nine-chi.vercel.app",
    image: "/images/glass.jpg",
    year: "2026",
    colors: [MINT, INK, BLUE],
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
    title: "Ingeniería · pregrado", // PENDIENTE: nombre exacto del programa
    place: "Universidad Cooperativa de Colombia · Pasto",
    start: "Inicio por confirmar", // PENDIENTE
    end: "Actualidad",
    description:
      "Formación en desarrollo de software, bases de datos y diseño de interfaces, con proyectos orientados a los Objetivos de Desarrollo Sostenible.",
  },
  {
    title: "Diseño de Interfaces de Software",
    place: "Universidad Cooperativa de Colombia · curso",
    start: "2026",
    end: "2026",
    description:
      "Réplicas de interfaz al píxel, diseño responsive y publicación continua en Vercel con Next.js, TypeScript y Tailwind CSS.",
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

// PENDIENTE: certificados de ejemplo. Cámbialos por los tuyos.
export const certificates: Certificate[] = [
  { title: "Tu certificado 01", issuer: "Entidad", year: "2026" },
  { title: "Tu certificado 02", issuer: "Entidad", year: "2026" },
  { title: "Tu certificado 03", issuer: "Entidad", year: "2025" },
  { title: "Tu certificado 04", issuer: "Entidad", year: "2025" },
  { title: "Tu certificado 05", issuer: "Entidad", year: "2024" },
  { title: "Tu certificado 06", issuer: "Entidad", year: "2024" },
];

export const navLinks = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "testimonios", label: "Testimonios" },
  { id: "experiencia", label: "Experiencia" },
  { id: "contacto", label: "Contacto" },
  { id: "certificados", label: "Certificados" },
];
