import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Github, Linkedin, Instagram } from "./SocialIcons";
import { projects } from "./projects";
import Project from "./Project";
export default function App() {
  return (
    <>
      <header className="hero" id="inicio">
        <img
          className="hero-photo"
          src="assets/renan.jpg"
          alt="Renan trabalhando em seu notebook"
        />
        <nav className="topbar" aria-label="Navegação principal">
          <span aria-hidden="true" />
          <span className="edition">PORTFÓLIO / 2026</span>
          <a className="nav-link" href="#projetos">
            Explorar projetos <ArrowDownRight size={20} aria-hidden="true" />
          </a>
        </nav>
        <div className="hero-caption">
          <h1>
            Renan
            <br />
            Vieira<span className="period">.</span>
          </h1>
          <p>Dev. FullStack</p>
        </div>
        <div className="hero-bottom">
          <a className="scroll-link" href="#projetos">
            <span className="circle">↓</span> Conheça meu trabalho
          </a>
          <div className="socials" aria-label="Redes sociais">
            <a
              href="https://www.linkedin.com/in/renan-augusto-vieira-duarte/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} aria-hidden="true" /> LinkedIn{" "}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={18} aria-hidden="true" /> Instagram{" "}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/Renn4nn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} aria-hidden="true" /> GitHub{" "}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>
      <main>
        <section className="projects" id="projetos">
          <div className="section-intro">
            <span className="eyebrow">01 / TRABALHOS SELECIONADOS</span>
            <div className="section-heading">
              <h2>
                Ideias que
                <br />
                viraram <em>projetos.</em>
              </h2>
              <p>
                Um olhar sobre o que venho construindo.
                <br />
                Explore as telas, os detalhes e o código.
              </p>
            </div>
          </div>
          <div id="project-list">
            {projects.map((project, index) => (
              <Project key={project.key} project={project} index={index} />
            ))}
          </div>
        </section>
        <section className="about" id="sobre">
          <img
            src="assets/avatar.jpg"
            alt="Retrato de Renan Vieira"
            loading="lazy"
          />
          <div>
            <span className="eyebrow">POR TRÁS DO CÓDIGO</span>
            <h2>Prazer, Renan.</h2>
            <p>
              Sou desenvolvedor FullStack em Londrina e estudante de Engenharia
              de Software na Universidade Positivo. Na CTD, atuo no
              desenvolvimento de soluções web, APIs e integrações. Minha
              experiência também passa pelo desenvolvimento mobile na CMTU,
              conectando interfaces e serviços às necessidades de quem usa cada
              solução.
            </p>
            <a
              className="text-link"
              href="https://github.com/Renn4nn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mais sobre meu trabalho no <Github size={18} aria-hidden="true" />{" "}
              GitHub <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <span aria-hidden="true" />
        <p>
          Renan Vieira <span>© 2026</span>
        </p>
        <a href="#inicio">Voltar ao início ↑</a>
      </footer>
    </>
  );
}
