import { useState, useEffect, useRef } from 'react';

// ==========================================
// HOOKS
// ==========================================
function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ==========================================
// NAVBAR & FOOTER DATA
// ==========================================
const NAV_LINKS = [
  { id: 'inicio',      label: 'Início' },
  { id: 'sobre',       label: 'Experiência' },
  { id: 'objetivo',    label: 'Objetivo' },
  { id: 'sobre-mim',   label: 'Sobre Mim' },
  { id: 'formacao',    label: 'Formação' },
  { id: 'habilidades', label: 'Habilidades' },
];

const FOOTER_LINKS = [
  { id: 'inicio',      label: 'Início' },
  { id: 'sobre',       label: 'Sobre' },
  { id: 'objetivo',    label: 'Objetivo' },
  { id: 'formacao',    label: 'Formação' },
  { id: 'habilidades', label: 'Habilidades' },
];

// ==========================================
// COMPONENTS
// ==========================================

const Navbar: React.FC = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="navbar__inner">
          <a
            href="#inicio"
            className="navbar__logo"
            onClick={(e) => { e.preventDefault(); scrollTo('inicio'); }}
          >
            Jonnathan <span>Quintela</span>
          </a>

          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="navbar__link"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#habilidades"
            className="navbar__cta"
            onClick={(e) => { e.preventDefault(); scrollTo('habilidades'); }}
          >
            Ver Habilidades
          </a>

          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`navbar__mobile${mobileOpen ? ' open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="navbar__mobile-link"
            onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

const HeroSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="inicio" className="hero">
      <div className="hero__inner" ref={ref}>

        <div className={`animate${isVisible ? ' in-view' : ''}`}>
          <div className="hero__eyebrow">✦ Profissional de TI &amp; Administração</div>
        </div>

        <h1 className={`hero__name animate animate--delay-1${isVisible ? ' in-view' : ''}`}>
          Jonnathan<br />
          <span className="hero__name-highlight">Quintela</span>
        </h1>

        <p className={`hero__subtitle animate animate--delay-2${isVisible ? ' in-view' : ''}`}>
          Administração · Engenharia da Computação
        </p>

        <p className={`hero__description animate animate--delay-3${isVisible ? ' in-view' : ''}`}>
          Profissional com sólida experiência administrativa aliada a habilidades técnicas em
          tecnologia. Organizado, proativo e sempre focado em otimizar processos e agregar
          valor às atividades internas.
        </p>

        <div className={`hero__actions animate animate--delay-4${isVisible ? ' in-view' : ''}`}>
          <button className="btn-primary" onClick={() => scrollTo('habilidades')}>
            ⚡ Ver Habilidades
          </button>
          <button className="btn-outline" onClick={() => scrollTo('formacao')}>
            🎓 Minha Formação
          </button>
        </div>

        <div className={`hero__stats animate animate--delay-5${isVisible ? ' in-view' : ''}`}>
          <div className="hero__stat">
            <div className="hero__stat-value">28</div>
            <div className="hero__stat-label">Anos</div>
          </div>
          <div className="hero__stat-sep" />
          <div className="hero__stat">
            <div className="hero__stat-value">6+</div>
            <div className="hero__stat-label">Habilidades</div>
          </div>
          <div className="hero__stat-sep" />
          <div className="hero__stat">
            <div className="hero__stat-value">2026</div>
            <div className="hero__stat-label">Formação</div>
          </div>
        </div>

      </div>

      <div
        className="hero__scroll-hint"
        onClick={() => scrollTo('sobre')}
        title="Rolar para baixo"
      >
        <div className="hero__scroll-dot" />
      </div>
    </section>
  );
};

const ExperienceSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="sobre" className="section experience">
      <div className="container">

        <div
          className={`section-header animate${isVisible ? ' in-view' : ''}`}
          ref={ref}
        >
          <div className="section-badge">📋 Experiência</div>
          <h2 className="section-title">Perfil Profissional</h2>
          <span className="section-divider" />
        </div>

        <div className={`experience__card animate animate--delay-2${isVisible ? ' in-view' : ''}`}>
          <p className="experience__text">
            Profissional com sólida experiência na área administrativa, atuando no suporte a
            rotinas organizacionais, <strong>controle e elaboração de documentos</strong>,
            atendimento, <strong>elaboração de relatórios</strong> e apoio a{' '}
            <strong>setores financeiros</strong>.
          </p>
        </div>

      </div>
    </section>
  );
};

const OBJECTIVE_TAGS = [
  'Organizado', 'Proativo', 'Responsável', 'Colaborativo',
  'Focado em Resultados', 'Comunicativo',
];

const ObjectiveSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="objetivo" className="section objective">
      <div className="container">

        <div
          className={`section-header animate${isVisible ? ' in-view' : ''}`}
          ref={ref}
        >
          <div className="section-badge">🎯 Objetivo</div>
          <h2 className="section-title">Objetivo Profissional</h2>
          <span className="section-divider" />
        </div>

        <div className={`objective__card animate animate--delay-2${isVisible ? ' in-view' : ''}`}>
          <p className="objective__text">
            Desejo ter a oportunidade de me desenvolver profissionalmente, aplicando meus
            conhecimentos e contribuindo para um ambiente de trabalho colaborativo. Isso não
            só impulsionará o meu crescimento profissional, mas também reforça o meu
            compromisso com os objetivos e o sucesso da empresa. Sou organizado, proativo e
            com forte senso de responsabilidade — busco sempre otimizar processos e
            contribuir para o bom desempenho das atividades internas.
          </p>

          <div className="objective__tags">
            {OBJECTIVE_TAGS.map((tag) => (
              <span key={tag} className="objective__tag">{tag}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const AboutSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="sobre-mim" className="section about">
      <div className="container">

        <div
          className={`section-header animate${isVisible ? ' in-view' : ''}`}
          ref={ref}
        >
          <div className="section-badge">👤 Sobre Mim</div>
          <h2 className="section-title">Quem sou eu</h2>
          <span className="section-divider" />
        </div>

        <div className="about__grid">

          <div className={`about__content animate animate--delay-1${isVisible ? ' in-view' : ''}`}>
            <p className="about__greeting">Olá! 👋</p>
            <h3 className="about__headline">
              Sou o <span>Jonnathan.</span>
            </h3>
            <p className="about__text">
              Sou um profissional movido pela curiosidade e pela busca constante por novos
              conhecimentos. Acredito que o aprendizado contínuo é a chave para a inovação,
              e aplico esse entusiasmo em tudo o que desenvolvo.
            </p>
            <p className="about__text">
              Fora do ambiente de trabalho, busco o equilíbrio praticando esportes e sou
              um entusiasta do cinema, sempre em busca de boas histórias e novas perspectivas.
            </p>

            <div className="about__interests">
              <div className="about__interest">
                <span className="about__interest-icon">🏃</span>
                <span>Esportes</span>
              </div>
              <div className="about__interest">
                <span className="about__interest-icon">🎬</span>
                <span>Cinema</span>
              </div>
              <div className="about__interest">
                <span className="about__interest-icon">📚</span>
                <span>Aprendizado</span>
              </div>
            </div>
          </div>

          <div className={`about__photo-wrap animate animate--delay-2${isVisible ? ' in-view' : ''}`}>
            <div className="about__photo-blob" />
            <div className="about__photo" />
          </div>

        </div>
      </div>
    </section>
  );
};

const EDUCATION = [
  {
    icon: '🎓',
    type: 'Ensino Superior',
    name: 'Faculdade IBMR',
    course: 'Engenharia da Computação',
    year: 'Conclusão prevista: Dezembro de 2026',
  },
  {
    icon: '💻',
    type: 'Curso Livre',
    name: 'JavaScript',
    course: 'Desenvolvimento Web',
    year: 'Conclusão em 2024',
  },
  {
    icon: '🖥️',
    type: 'Curso Técnico',
    name: 'Informática Profissional',
    course: 'Sistemas e Manutenção',
    year: 'Conclusão em 2016',
  },
];

const EducationSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="formacao" className="section education">
      <div className="container">

        <div
          className={`section-header animate${isVisible ? ' in-view' : ''}`}
          ref={ref}
        >
          <div className="section-badge">🏫 Formação</div>
          <h2 className="section-title">Educação &amp; Formação</h2>
          <span className="section-divider" />
        </div>

        <div className="education__grid">
          {EDUCATION.map((item, i) => (
            <div
              key={item.name}
              className={`education__card animate animate--delay-${i + 1}${isVisible ? ' in-view' : ''}`}
            >
              <div className="education__icon">{item.icon}</div>
              <div className="education__type">{item.type}</div>
              <h3 className="education__name">{item.name}</h3>
              <p className="education__course">{item.course}</p>
              <span className="education__year">📅 {item.year}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

const SKILLS = [
  { icon: '🐍', name: 'Python',              level: 'Intermediário',      pct: 65 },
  { icon: '📊', name: 'Pandas / Dados',      level: 'Análise de Dados',   pct: 70 },
  { icon: '📋', name: 'Excel',               level: 'Avançado',           pct: 82 },
  { icon: '🌐', name: 'JavaScript',          level: 'Intermediário',      pct: 55 },
  { icon: '🔧', name: 'Manutenção HW',       level: 'Avançado',           pct: 75 },
  { icon: '🤖', name: 'Inteligência Artificial',level: 'Intermediário',  pct: 50 },
  { icon: '🗣️', name: 'Inglês',             level: 'Intermediário',      pct: 55 },
];

const SkillsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="habilidades" className="section skills">
      <div className="container">

        <div
          className={`section-header animate${isVisible ? ' in-view' : ''}`}
          ref={ref}
        >
          <div className="section-badge">⚡ Habilidades</div>
          <h2 className="section-title">Skills &amp; Competências</h2>
          <span className="section-divider" />
        </div>

        <div className="skills__grid">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              className={`skill-card animate animate--delay-${i + 1}${isVisible ? ' in-view' : ''}`}
            >
              <div className="skill-card__bg" />
              <span className="skill-card__icon">{skill.icon}</span>
              <div className="skill-card__name">{skill.name}</div>
              <div className="skill-card__level">{skill.level}</div>
              <div className="skill-card__bar">
                <div
                  className="skill-card__bar-fill"
                  style={{ width: `${skill.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__brand">
              Jonnathan <span>Quintela</span>
            </div>
            <p className="footer__tagline">Administração &amp; Tecnologia</p>
          </div>

          <ul className="footer__nav">
            {FOOTER_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="footer__nav-link"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="footer__copy">
          © {new Date().getFullYear()} Jonnathan Quintela. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

// ==========================================
// MAIN APP
// ==========================================
function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ExperienceSection />
        <ObjectiveSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
