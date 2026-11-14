"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { certificates } from "@/data/portfolio";

/** Sección adicional: los certificados caen como entradas de concierto y se pueden arrastrar. */
export default function Certificates() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    const arena = el?.querySelector<HTMLElement>("[data-arena]");
    if (!el || !arena) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { Engine, Bodies, Body, Composite, Runner, Mouse, MouseConstraint, Events } = Matter;
    const tickets = Array.from(arena.querySelectorAll<HTMLElement>("[data-ticket]"));
    let engine: Matter.Engine | undefined;
    let runner: Matter.Runner | undefined;
    let walls: Matter.Body[] = [];
    let mouse: Matter.Mouse | undefined;

    const buildWalls = () => {
      if (!engine) return;
      const w = arena.clientWidth;
      const h = arena.clientHeight;
      Composite.remove(engine.world, walls);
      walls = [
        Bodies.rectangle(w / 2, h + 50, w * 2, 100, { isStatic: true }),
        Bodies.rectangle(-50, h / 2, 100, h * 4, { isStatic: true }),
        Bodies.rectangle(w + 50, h / 2, 100, h * 4, { isStatic: true }),
      ];
      Composite.add(engine.world, walls);
    };

    const start = () => {
      if (engine) return;
      // Medir antes de pasar a posicionamiento absoluto
      const sizes = tickets.map((t) => ({ w: t.offsetWidth, h: t.offsetHeight }));
      el.dataset.physics = "1";
      engine = Engine.create({ gravity: { x: 0, y: 1.1, scale: 0.001 } });
      const w = arena.clientWidth;
      const bodies = tickets.map((t, i) => {
        const b = Bodies.rectangle(
          w * (0.15 + Math.random() * 0.7),
          -120 - i * 150,
          sizes[i].w,
          sizes[i].h,
          { restitution: 0.35, friction: 0.5, angle: (Math.random() - 0.5) * 1.4, chamfer: { radius: 8 } },
        );
        Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.2);
        t.style.width = `${sizes[i].w}px`;
        return b;
      });
      Composite.add(engine.world, bodies);
      buildWalls();

      if (window.matchMedia("(pointer: fine)").matches) {
        mouse = Mouse.create(arena);
        // Que la rueda del ratón siga haciendo scroll en la página
        const m = mouse as unknown as { element: HTMLElement; mousewheel: EventListener };
        m.element.removeEventListener("wheel", m.mousewheel);
        m.element.removeEventListener("mousewheel", m.mousewheel);
        m.element.removeEventListener("DOMMouseScroll", m.mousewheel);
        Composite.add(
          engine.world,
          MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } }),
        );
      }

      Events.on(engine, "afterUpdate", () => {
        bodies.forEach((b, i) => {
          tickets[i].style.transform = `translate(${b.position.x - sizes[i].w / 2}px, ${
            b.position.y - sizes[i].h / 2
          }px) rotate(${b.angle}rad)`;
        });
      });
      runner = Runner.create();
      Runner.run(runner, engine);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(arena);
    window.addEventListener("resize", buildWalls);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", buildWalls);
      if (runner) Runner.stop(runner);
      if (mouse) Mouse.clearSourceEvents(mouse);
      if (engine) Engine.clear(engine);
      delete el.dataset.physics;
      tickets.forEach((t) => {
        t.style.transform = "";
        t.style.width = "";
      });
    };
  }, []);

  return (
    <section id="certificados" ref={root} className="group/c grid-lines relative overflow-hidden border-t border-cream/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <p className="meta text-accent">( 06 ) — Sección adicional · Certificados</p>
      </div>

      <div data-arena className="relative mx-auto mt-6 min-h-[34rem] max-w-[1600px] px-4 group-data-[physics]/c:h-[80vh] md:px-8">
        <div className="pointer-events-none flex flex-col items-center justify-center py-10 text-center group-data-[physics]/c:absolute group-data-[physics]/c:inset-0">
          <h2 className="display text-[clamp(3.5rem,13vw,12rem)] text-cream">
            Logros
            <br />
            <span className="outline-text">desbloqueados</span>
          </h2>
          <p className="meta mt-6 hidden text-cream/50 md:group-data-[physics]/c:block">Arrastra las entradas</p>
        </div>

        <ul className="relative flex flex-wrap justify-center gap-4 group-data-[physics]/c:static group-data-[physics]/c:block">
          {certificates.map((c, i) => (
            <li
              key={i}
              data-ticket
              data-hot
              className="ticket flex w-[15.5rem] cursor-grab select-none items-stretch will-change-transform active:cursor-grabbing group-data-[physics]/c:absolute group-data-[physics]/c:left-0 group-data-[physics]/c:top-0 md:w-[19rem]"
            >
              <div className="flex flex-1 flex-col justify-between py-3 pl-6 pr-3">
                <p className="meta text-accent">Certificado · {c.year}</p>
                <p className="display my-2 text-xl leading-none md:text-2xl">{c.title}</p>
                <p className="meta text-ink/60">{c.issuer}</p>
              </div>
              <div className="flex w-16 flex-col items-center justify-center border-l-2 border-dashed border-ink/40 bg-accent pr-2 text-ink">
                <span className="display text-3xl">{String(i + 1).padStart(2, "0")}</span>
                {c.link ? (
                  <a href={c.link} target="_blank" rel="noopener noreferrer" className="meta underline">
                    Ver
                  </a>
                ) : (
                  <span className="meta">★</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
