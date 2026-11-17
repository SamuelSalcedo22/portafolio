"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { skills } from "@/data/portfolio";
import { useT } from "@/lib/i18n";

/** Sección adicional: habilidades y aptitudes que caen como entradas de concierto y se pueden arrastrar. */
export default function Skills() {
  const root = useRef<HTMLElement>(null);
  const { ui, t } = useT();

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
          -120 - i * 110,
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
    <section id="habilidades" ref={root} className="group/c grid-lines relative overflow-hidden border-t border-cream/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <p className="meta text-accent">{ui.skills.label}</p>
      </div>

      <div data-arena className="relative mx-auto mt-6 min-h-[34rem] max-w-[1600px] px-4 group-data-[physics]/c:h-[88vh] md:px-8">
        <div className="pointer-events-none flex flex-col items-center py-10 text-center group-data-[physics]/c:absolute group-data-[physics]/c:inset-x-0 group-data-[physics]/c:top-0">
          <h2 className="display text-[clamp(3.2rem,12vw,11rem)] text-cream">
            {ui.skills.title[0]}
            <br />
            <span className="outline-text">{ui.skills.title[1]}</span>
          </h2>
          <p className="meta mt-6 hidden text-cream/50 md:group-data-[physics]/c:block">{ui.skills.drag}</p>
        </div>

        <ul className="relative flex flex-wrap justify-center gap-3 group-data-[physics]/c:static group-data-[physics]/c:block">
          {skills.map((sk, i) => (
            <li
              key={i}
              data-ticket
              data-hot
              className="ticket flex w-[12.5rem] cursor-grab select-none items-stretch will-change-transform active:cursor-grabbing group-data-[physics]/c:absolute group-data-[physics]/c:left-0 group-data-[physics]/c:top-0 md:w-[16rem]"
            >
              <div className="flex min-w-0 flex-1 flex-col justify-between py-2.5 pl-5 pr-2">
                <p className={`meta ${sk.type === "skill" ? "text-accent" : "text-pop-blue"}`}>{sk.type === "skill" ? ui.skills.skill : ui.skills.aptitude}</p>
                <p className="display my-1.5 text-lg leading-none md:text-2xl">{t(sk.name)}</p>
                <p className="text-[0.62rem] leading-tight text-ink/60 md:text-[0.7rem]">{t(sk.detail)}</p>
              </div>
              <div
                className={`flex w-12 flex-col items-center justify-center border-l-2 border-dashed border-night/40 pr-2 text-night md:w-14 ${
                  sk.type === "skill" ? "bg-accent" : "bg-pop-yellow"
                }`}
              >
                <span className="display text-2xl md:text-3xl">{String(i + 1).padStart(2, "0")}</span>
                <span className="meta">★</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
