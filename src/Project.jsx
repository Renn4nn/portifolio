import React, { useEffect, useRef, useState } from "react";

export default function Project({ project: p, index }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [reduced, setReduced] = useState(false);
  const dialog = useRef(null);
  const touch = useRef(null);
  const change = (step) =>
    setCurrent((value) => (value + step + p.count) % p.count);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const playing = !paused && !hovered && !focused && !expanded && !reduced;
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      if (!document.hidden) change(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [playing, current, p.count]);
  const src = `/assets/${p.key}-${current + 1}.png`;
  const alt = `${p.name} — tela ${current + 1}`;
  function open() {
    setExpanded(true);
    dialog.current.showModal();
  }
  return (
    <article className="project">
      <div className="project-heading">
        <div className="project-title">
          <span className="project-number">0{index + 1}</span>
          <h3>{p.name}</h3>
        </div>
        <div className="tags">
          {p.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div
        className="gallery"
        role="region"
        aria-label={`Telas de ${p.name}`}
        aria-roledescription="carrossel"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
        }}
        onKeyDown={(e) => {
          if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
            change(e.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div
          className="slide-stage"
          onTouchStart={(e) => {
            touch.current = e.changedTouches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const delta = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(delta) > 50) change(delta < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <button
            className="image-button"
            onClick={open}
            aria-label={`Ampliar ${alt}`}
          >
            <img key={src} src={src} alt={alt} loading="lazy" />
          </button>
          <button
            className="float-arrow prev"
            onClick={() => change(-1)}
            aria-label={`Tela anterior de ${p.name}`}
          >
            ←
          </button>
          <button
            className="float-arrow next"
            onClick={() => change(1)}
            aria-label={`Próxima tela de ${p.name}`}
          >
            →
          </button>
        </div>
        <div className="gallery-bar">
          <span className="gallery-label">CLIQUE NA TELA PARA AMPLIAR</span>
          <div className="dots">
            {Array.from({ length: p.count }, (_, i) => (
              <button
                key={i}
                className={i === current ? "selected" : ""}
                onClick={() => setCurrent(i)}
                aria-label={`Mostrar tela ${i + 1} de ${p.name}`}
                aria-current={i === current ? "true" : undefined}
              />
            ))}
          </div>
          <div className="playback">
            <span className="counter" aria-live={playing ? "off" : "polite"}>
              0{current + 1} / 0{p.count}
            </span>
            <button
              onClick={() => setPaused((v) => !v)}
              aria-label={
                paused ? "Ativar troca automática" : "Pausar troca automática"
              }
              aria-pressed={paused}
              disabled={reduced}
            >
              {paused || reduced ? "▷" : "Ⅱ"}
            </button>
          </div>
        </div>
      </div>
      <div className="project-info">
        <p>{p.description}</p>
        <div className="repo-links">
          {p.repos.map(([label, repo]) => (
            <a
              key={repo}
              href={`https://github.com/Renn4nn/${repo}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label} ↗
            </a>
          ))}
        </div>
      </div>
      <dialog
        ref={dialog}
        aria-label={`Imagem ampliada de ${p.name}`}
        onClose={() => setExpanded(false)}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <button
          className="close"
          onClick={() => dialog.current.close()}
          aria-label="Fechar imagem"
        >
          ✕
        </button>
        <img src={src} alt={alt} />
        <p>{alt}</p>
      </dialog>
    </article>
  );
}
