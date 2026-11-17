import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Users,
  X,
  Expand,
  Workflow,
} from "lucide-react";
import { siNextdotjs, siNestjs, siPostgresql, siVite } from "simple-icons";

const icons = {
  "Next.js": siNextdotjs,
  NestJS: siNestjs,
  PostgreSQL: siPostgresql,
  Vite: siVite,
};
function Stack({ name }) {
  const icon = icons[name];
  return (
    <span className="stack-item inline-flex items-center gap-2.5 text-sm">
      {icon ? (
        <svg
          role="img"
          aria-label={name}
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill={name === "Next.js" ? "#e7edf7" : `#${icon.hex}`}
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <Workflow size={20} color="#c4a5ff" aria-hidden="true" />
      )}
      {name}
    </span>
  );
}

export default function Project({ project: p, index }) {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const section = useRef(null);
  const dialog = useRef(null);
  // Repeated slides make the loop seamless even for the two-screen project.
  const slides = useMemo(
    () => Array.from({ length: p.count * 3 }, (_, i) => i % p.count),
    [p.count],
  );
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 6500,
        playOnInit: false,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: true,
      }),
    [],
  );
  const [viewport, api] = useEmblaCarousel(
    { loop: true, align: "center", duration: reduced ? 0 : 75 },
    [autoplay],
  );
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);
  useEffect(() => {
    if (!api) return;
    const update = () => {
      if (!reduced && inView && expanded === null && !document.hidden)
        autoplay.play();
      else autoplay.stop();
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      autoplay.stop();
    };
  }, [api, autoplay, reduced, inView, expanded]);
  const navigate = useCallback(
    (direction) => {
      if (!api) return;
      direction > 0 ? api.scrollNext() : api.scrollPrev();
      autoplay.reset();
    },
    [api, autoplay],
  );
  function goTo(screen) {
    const total = slides.length;
    const candidates = slides
      .map((value, i) => (value === screen ? i : -1))
      .filter((i) => i >= 0);
    const nearest = candidates.sort(
      (a, b) =>
        Math.min(Math.abs(a - selected), total - Math.abs(a - selected)) -
        Math.min(Math.abs(b - selected), total - Math.abs(b - selected)),
    )[0];
    api?.scrollTo(nearest);
    autoplay.reset();
  }
  function open(screen) {
    setExpanded(screen);
    dialog.current.showModal();
  }
  const current = selected % p.count;
  return (
    <article className="project showcase" ref={section}>
      <div className="project-heading">
        <div className="project-title">
          <span className="project-number">0{index + 1}</span>
          <h3>{p.name}</h3>
        </div>
        <span className="project-context">{p.context}</span>
      </div>
      <div
        className="gallery cinematic-gallery"
        role="region"
        aria-label={`Telas de ${p.name}`}
        aria-roledescription="carrossel"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            navigate(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div className="embla-viewport" ref={viewport}>
          <div className="embla-track">
            {slides.map((screen, i) => (
              <div
                className={`embla-slide ${i === selected ? "is-selected" : ""}`}
                key={i}
                aria-hidden={i !== selected}
              >
                <button
                  className="screen-button"
                  tabIndex={i === selected ? 0 : -1}
                  onClick={() =>
                    i === selected ? open(screen) : api?.scrollTo(i)
                  }
                  aria-label={`Ampliar ${p.name}, tela ${screen + 1}`}
                >
                  <img
                    src={`/assets/${p.key}-${screen + 1}.png`}
                    alt={`${p.name} — tela ${screen + 1}`}
                    loading="lazy"
                    draggable="false"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="cinema-navigation">
          <button
            className="cinema-arrow"
            onClick={() => navigate(-1)}
            aria-label={`Tela anterior de ${p.name}`}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="cinema-dots">
            {Array.from({ length: p.count }, (_, i) => (
              <button
                key={i}
                className={current === i ? "active" : ""}
                onClick={() => goTo(i)}
                aria-label={`Mostrar tela ${i + 1} de ${p.name}`}
                aria-current={current === i ? "true" : undefined}
              >
                <span />
              </button>
            ))}
          </div>
          <button
            className="cinema-arrow"
            onClick={() => navigate(1)}
            aria-label={`Próxima tela de ${p.name}`}
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="cinema-caption">
          <span>
            <Expand size={12} /> EXPLORE AS TELAS
          </span>
          <span className="counter">
            0{current + 1} <span>/ 0{p.count}</span>
          </span>
        </div>
      </div>
      <div className="project-editorial grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-20">
        <div>
          <h4>{p.headline}</h4>
          <p>{p.description}</p>
          <p>{p.detail}</p>
        </div>
        <aside className="project-facts flex flex-col gap-7">
          <div>
            <span className="fact-label">TECNOLOGIAS</span>
            <div className="stack-list flex flex-wrap gap-x-6 gap-y-4">
              {p.stacks.map((name) => (
                <Stack key={name} name={name} />
              ))}
            </div>
          </div>
          <div>
            <span className="fact-label">
              {p.authors.includes(" e ") ? "AUTORES" : "AUTOR"}
            </span>
            <span className="author-name flex items-center gap-2.5 text-slate-200">
              <Users size={16} className="text-slate-400" />
              {p.authors}
            </span>
          </div>
          <div className="repo-links flex flex-wrap gap-5">
            {p.repos.map(([label, repo]) => (
              <a
                key={repo}
                href={`https://github.com/Renn4nn/${repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                {label}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </aside>
      </div>
      <dialog
        ref={dialog}
        aria-label={`Imagem ampliada de ${p.name}`}
        onClose={() => setExpanded(null)}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <button
          className="close"
          onClick={() => dialog.current.close()}
          aria-label="Fechar imagem"
        >
          <X />
        </button>
        {expanded !== null && (
          <>
            <img
              src={`/assets/${p.key}-${expanded + 1}.png`}
              alt={`${p.name} — tela ${expanded + 1}`}
            />
            <p>
              {p.name} · {expanded + 1} / {p.count}
            </p>
          </>
        )}
      </dialog>
    </article>
  );
}
