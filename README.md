# Portafolio · Samuel Salcedo

Portafolio personal hecho con **Next.js (App Router) + TypeScript + Tailwind CSS**, con animaciones de scroll (GSAP + Lenis) y física (Matter.js). Proyecto del curso *Diseño de Interfaces*.

## Secciones

1. Menú de navegación fijo, con menú hamburguesa en móvil
2. Bienvenida / Hero con botón **Descargar CV**
3. Acerca de mí
4. Mis proyectos (enlace a GitHub y demo en vivo)
5. Testimonios
6. Experiencia académica y laboral
7. Contactos (formulario con validación)
8. Sección adicional: Habilidades y aptitudes
9. Pie de página

## Cómo editar el contenido

Todo el contenido está en [`data/portfolio.ts`](data/portfolio.ts), en español e inglés (`{ es: "…", en: "…" }`). Los textos fijos de la interfaz están en [`data/ui.ts`](data/ui.ts). Lo marcado con `PENDIENTE` es texto de ejemplo.

El botón ES/EN del menú cambia el idioma y el botón del sol/luna cambia entre modo oscuro y claro; ambas elecciones se recuerdan en el navegador.

- **CV:** en español `public/Hoja-de-vida-Samuel-Salcedo.pdf` y en inglés `public/CV-Samuel-Salcedo-EN.pdf`; el botón entrega la del idioma activo. La versión en inglés se genera desde `cv/cv-en.html` (el comando está al inicio de ese archivo).
- **Foto:** guarda tu foto en `public/images/` y pon la ruta en `profile.photo`.
- **Mensajes y testimonios:** se guardan en Supabase. Ejecuta una vez los archivos de `supabase/` en el SQL Editor. Los mensajes se leen en Table Editor → `messages`; los testimonios se aprueban marcando `approved` en `testimonials`.

## Desarrollo

```bash
npm install
npm run dev
```

## Publicar en Vercel

Importa este repositorio en [vercel.com/new](https://vercel.com/new) y pulsa **Deploy**. Cada `git push` publica una versión nueva.
