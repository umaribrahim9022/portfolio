import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "About", href: "about" },
  { label: "Experience", href: "experience" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Education", href: "education" },
  { label: "Contact", href: "contact" },
];

const SKILLS = {
  Languages: ["Python", "JavaScript", "SQL", "HTML5", "CSS3"],
  "Data Science / ML": ["Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "Matplotlib"],
  "Web & Frameworks": ["React.js", "Node.js", "Tailwind CSS", "RESTful APIs", "MongoDB"],
  Tools: ["Git", "GitHub", "VS Code", "Compiler Construction", "Flex/Lex"],
};

const EXPERIENCE = [
  {
    role: "Intern — AI/ML Engineering",
    company: "Developers Hub Corporation",
    date: "APR 2026 – MAY 2026",
    emoji: "🤖",
    bullets: [
      "Led team to build stock predictors, heart disease classifiers, and health chatbots using Python, Regression & LLM Prompt Engineering.",
      "Managed end-to-end delivery: EDA, model evaluation (ROC-AUC), and GitHub documentation.",
    ],
  },
  {
    role: "Intern — AI/ML Engineering",
    company: "Code Alpha",
    date: "MAR 2026 – APR 2026",
    emoji: "⚡",
    bullets: [
      "Built and deployed ML models for classification and regression using Scikit-Learn.",
      "Cleaned complex datasets with Pandas & NumPy, achieving 95%+ data integrity for model training.",
    ],
  },
];

const GITHUB_PROJECTS = [
  {
    title: "Medi-Predict AI Model",
    desc: "Symptom descriptions se diseases predict karne ke liye NLP-driven system (Linear SVM) jo Streamlit interface ke sath aati hai.",
    url: "https://github.com/umaribrahim9022/Medi-Predict-AI-model",
    tags: ["Python", "Streamlit", "SVM", "NLP", "Scikit-Learn"]
  },
  {
    title: "Fake News Detection",
    desc: "NLP semantic signatures detect kar ke 98.05% accuracy se fake news classify karne ke liye Veritas AI machine learning system.",
    url: "https://github.com/umaribrahim9022/Fake-News-Detection-",
    tags: ["Python", "NLP", "TF-IDF", "Scikit-Learn"]
  },
  {
    title: "Fake Job Post Detection",
    desc: "Job seekers ko fraud se bachane ke liye Natural Language Processing (NLP) aur TF-IDF vectorization par mabni ML application.",
    url: "https://github.com/umaribrahim9022/Fake-Job-Post-Detection-",
    tags: ["Python", "NLP", "TF-IDF", "Classification"]
  }
];



// ---- STYLES ----
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', 'Syne', sans-serif; background: #06080f; color: #e8e8f0; line-height: 1.7; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #06080f; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #7c6ef5, #5dd9b8); border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #9384f8, #74e4c8); }

  .portfolio-root {
    --bg: #060810;
    --bg2: #0a1628;
    --bg3: #131d2e;
    --accent: #64ffda;
    --accent2: #7c6ef5;
    --text: #e8e8f0;
    --muted: #9099a8;
    --border: rgba(100, 255, 218, 0.12);
    --card: rgba(10, 22, 40, 0.8);
    --hover-card: rgba(19, 29, 46, 0.95);
    --hover-border: rgba(100, 255, 218, 0.35);
    min-height: 100vh;
    background: linear-gradient(135deg, var(--bg) 0%, #0d1521 50%, #060810 100%);
    position: relative;
  }

  /* GRID BG */
  .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(100,255,218,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(100,255,218,0.03) 1px, transparent 1px),
      radial-gradient(circle at 20% 50%, rgba(124,110,245,0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(93,217,184,0.04) 0%, transparent 50%);
    background-size: 70px 70px, 70px 70px, 100% 100%, 100% 100%;
  }

  /* HEADER */
  .header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    background: linear-gradient(180deg, rgba(6,8,15,0.6) 0%, rgba(6,8,15,0.2) 100%);
    backdrop-filter: blur(25px) saturate(180%);
    border-bottom: 1px solid var(--border);
    height: 64px;
    display: flex; align-items: center;
    padding: 0 5%;
    justify-content: space-between;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .header.scrolled {
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    border-bottom-color: var(--hover-border);
  }
  .logo {
    font-family: 'Instrument Serif', serif;
    font-size: 1.15rem;
    color: var(--accent2);
    text-decoration: none;
    letter-spacing: 0.1em;
    cursor: pointer;
    font-weight: 700;
    transition: color 0.3s;
  }
  .logo:hover { color: var(--accent); }
  .logo span { color: var(--accent); font-weight: 600; }

  /* PROFILE IMAGE */
  .profile-container {
    width: 45px; height: 45px; border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgba(100,255,218,0.4);
    box-shadow: 0 0 15px rgba(100,255,218,0.15);
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;
    flex-shrink: 0;
  }
  .profile-container:hover {
    transform: scale(1.08) rotate(2deg);
    box-shadow: 0 0 25px rgba(100,255,218,0.35);
  }
  .profile-image {
    width: 100%; height: 100%;
    object-fit: cover;
    transform: scale(1.25); /* Zooming in */
    object-position: top center; /* Usually faces are near top */
    transition: filter 0.3s;
  }
  .profile-container:hover .profile-image {
    filter: brightness(1.1);
  }

  /* DESKTOP NAV */
  .nav-desktop { display: flex; gap: 2.5rem; align-items: center; }
  .nav-link {
    background: none; border: none; cursor: pointer;
    color: var(--muted); font-family: 'Inter', sans-serif;
    font-size: 0.8rem; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 8px 0;
    position: relative;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: 0; left: 0;
    width: 0; height: 2px; background: linear-gradient(90deg, var(--accent2), var(--accent));
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .nav-link:hover { color: var(--text); }
  .nav-link:hover::after { width: 100%; }
  .nav-link.active { color: var(--accent); }
  .nav-link.active::after { width: 100%; }

  /* HAMBURGER */
  .hamburger {
    display: none; background: none; border: none; cursor: pointer;
    flex-direction: column; gap: 6px; padding: 4px;
    transition: transform 0.3s;
  }
  .hamburger:hover { transform: scale(1.1); }
  .hamburger span {
    display: block; width: 24px; height: 2px;
    background: var(--text); border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

  /* MOBILE MENU */
  .mobile-menu {
    display: none; position: fixed; top: 64px; left: 0; right: 0; bottom: 0;
    background: linear-gradient(180deg, rgba(6,8,15,0.98) 0%, rgba(10,22,40,0.95) 100%);
    backdrop-filter: blur(25px);
    z-index: 999;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
  }
  .mobile-menu.open { display: flex; }
  .mobile-nav-link {
    background: none; border: none; cursor: pointer;
    color: var(--text); font-family: 'Inter', sans-serif;
    font-size: 1.4rem; font-weight: 700;
    letter-spacing: 0.05em;
    transition: color 0.3s;
  }
  .mobile-nav-link:hover { color: var(--accent); }

  /* DOWNLOAD BTN */
  .btn-download {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, var(--accent), #5dd9b8);
    color: #000;
    padding: 10px 20px; border-radius: 6px;
    font-size: 0.78rem; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase;
    text-decoration: none; border: none; cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'Inter', sans-serif;
    box-shadow: 0 4px 16px rgba(100,255,218,0.2);
  }
  .btn-download:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(100,255,218,0.35);
  }

  /* MAIN */
  main { position: relative; z-index: 1; }

  /* SECTIONS */
  section {
    padding: 110px 10%;
    position: relative;
  }
  section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  section:nth-child(even) {
    background: linear-gradient(180deg, rgba(10,22,40,0.3) 0%, transparent 100%);
  }

  /* SECTION HEADER */
  h2 {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 3rem;
    line-height: 1.15;
    display: flex;
    align-items: center;
    gap: 2rem;
    position: relative;
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  h2::after {
    content: '';
    display: block;
    height: 1px;
    flex: 1;
    background: linear-gradient(90deg, var(--accent), transparent);
    max-width: 300px;
  }
  h2 span {
    -webkit-text-fill-color: var(--accent);
  }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 80px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(124,110,245,0.08) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 20s ease-in-out infinite;
  }
  .hero::after {
    content: '';
    position: absolute;
    bottom: -20%;
    right: -5%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(93,217,184,0.06) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 25s ease-in-out infinite reverse;
  }
  @keyframes float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, -20px); } }

  .hero-tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
  }
  .hero-tag::before {
    content: '';
    display: inline-block;
    width: 40px;
    height: 1px;
    background: linear-gradient(90deg, var(--accent), transparent);
  }

  .hero-title {
    font-size: clamp(3.5rem, 8vw, 7rem);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.04em;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    background: linear-gradient(135deg, #e8e8f0 0%, var(--accent2) 50%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-title .outline {
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 2px var(--accent);
  }

  .hero-desc {
    font-size: 1.05rem;
    color: var(--muted);
    max-width: 560px;
    margin-bottom: 2.5rem;
    line-height: 1.8;
    font-weight: 400;
  }

  .hero-btns {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 26px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    letter-spacing: 0.03em;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    border: none;
    position: relative;
    overflow: hidden;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.1);
    transition: left 0.3s;
    z-index: -1;
  }

  .btn:hover::before {
    left: 100%;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--accent), #5dd9b8);
    color: #000;
    box-shadow: 0 4px 16px rgba(100,255,218,0.2);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(100,255,218,0.35);
  }

  .btn-outline {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
  }

  .btn-outline:hover {
    border-color: var(--hover-border);
    color: var(--accent);
    transform: translateY(-3px);
  }

  /* TOP BENTO ROW */
  .hero-bento-top {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 1.25rem;
    margin-top: 4rem;
    max-width: 1050px;
    width: 100%;
  }

  .bento-image-card {
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    min-height: 320px;
    display: flex;
    align-items: flex-end;
    background-image: url('coding_avatar.png');
    background-size: cover;
    background-position: center;
    border: 1px solid rgba(255,255,255,0.05);
    transition: transform 0.3s, border-color 0.3s;
  }

  .bento-image-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(6,8,16,0.95) 0%, transparent 60%);
    pointer-events: none;
    z-index: 1;
  }

  .bento-image-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255,255,255,0.12);
  }

  .bento-image-content {
    padding: 2.5rem;
    position: relative;
    z-index: 2;
  }

  .bento-globe-card {
    background: var(--bg);
    border-radius: 20px;
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.05);
    transition: transform 0.3s, border-color 0.3s;
  }

  .bento-globe-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255,255,255,0.12);
  }

  .bento-globe-graphic {
    position: absolute;
    bottom: -80px;
    right: -20px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: 1px dashed rgba(100,255,218,0.3);
    background: radial-gradient(circle at center, rgba(124,110,245,0.1) 0%, transparent 70%);
    z-index: 1;
  }

  .bento-globe-graphic::after {
    content: '';
    position: absolute;
    inset: 10px;
    border-radius: 50%;
    border: 1px solid rgba(124,110,245,0.2);
  }

  .bento-tech-card {
    background: var(--bg);
    border-radius: 20px;
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.05);
    transition: transform 0.3s, border-color 0.3s;
  }

  .bento-tech-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255,255,255,0.12);
  }

  .tech-tags-grid {
    position: absolute;
    right: -20px;
    top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    opacity: 0.6;
    transform: rotate(5deg);
    z-index: 1;
  }

  .tech-tag-pill {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    color: #fff;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-family: 'Space Mono', monospace;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .hero-bento-top {
      grid-template-columns: 1fr;
    }
  }

  /* BENTO HERO CARDS */
  .hero-bento {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 1.25rem;
    margin-top: 1.25rem;
    max-width: 1050px;
    width: 100%;
  }

  .bento-col {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .bento-card {
    border-radius: 20px;
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s;
    border: 1px solid rgba(255,255,255,0.05);
    background: #0a0e17;
  }

  .bento-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255,255,255,0.12);
  }

  .bento-card-dark {
    background: var(--bg);
  }

  .bento-card-accent {
    background: linear-gradient(135deg, var(--bg2) 0%, var(--bg3) 100%);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .bento-card-accent::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(100,255,218,0.12) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .bento-card.h-full {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .bento-bg-grid {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.4;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 30px 30px;
  }

  .bento-code-bg {
    position: absolute;
    right: -20px;
    top: 25%;
    font-family: 'Space Mono', monospace;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.12);
    white-space: pre;
    pointer-events: none;
    z-index: 1;
    text-align: left;
    line-height: 1.6;
  }

  .bento-title {
    font-family: 'Inter', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.35;
    position: relative;
    z-index: 2;
  }

  .bento-title-lg {
    font-family: 'Inter', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: #fff;
    line-height: 1.25;
    position: relative;
    z-index: 2;
    margin-bottom: 1.5rem;
  }

  .bento-label {
    color: #9ca3af;
    font-size: 0.85rem;
    font-family: 'Space Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1rem;
    position: relative;
    z-index: 2;
  }

  .bento-copy-btn {
    background: #18181b;
    color: #e4e4e7;
    border: 1px solid rgba(255,255,255,0.08);
    padding: 12px 24px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 2;
    transition: all 0.2s ease;
  }

  .bento-copy-btn:hover {
    background: #27272a;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  @media (max-width: 768px) {
    .hero-bento {
      grid-template-columns: 1fr;
    }
  }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .about-text p { color: #7a7a8c; margin-bottom: 1rem; font-size: 1rem; }
  .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .stat-card {
    background: linear-gradient(135deg, rgba(124,110,245,0.05), rgba(93,217,184,0.02));
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(100,255,218,0.05), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .stat-card:hover {
    border-color: var(--hover-border);
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(100,255,218,0.1);
  }

  .stat-card:hover::before {
    opacity: 1;
  }

  .stat-num {
    font-size: 2.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
    line-height: 1;
  }

  .stat-lbl {
    font-size: 0.8rem;
    color: var(--muted);
    margin-top: 0.4rem;
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  /* EXPERIENCE */
  .exp-list { display: flex; flex-direction: column; gap: 1.5rem; }
  .exp-card {
    background: linear-gradient(135deg, rgba(10,22,40,0.8), rgba(19,29,46,0.6));
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 2rem;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.5rem;
    align-items: start;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .exp-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .exp-card:hover {
    border-color: var(--hover-border);
    transform: translateX(8px);
    box-shadow: 0 8px 24px rgba(100,255,218,0.1);
  }

  .exp-card:hover::before {
    transform: scaleX(1);
  }

  .exp-icon {
    width: 52px;
    height: 52px;
    background: linear-gradient(135deg, rgba(124,110,245,0.2), rgba(93,217,184,0.1));
    border: 1px solid rgba(100,255,218,0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
    transition: all 0.3s;
  }

  .exp-card:hover .exp-icon {
    background: linear-gradient(135deg, rgba(124,110,245,0.4), rgba(93,217,184,0.2));
    transform: scale(1.1) rotate(5deg);
  }

  .exp-role {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 2px;
    color: var(--text);
  }

  .exp-company {
    color: var(--accent);
    font-size: 0.9rem;
    font-weight: 700;
  }

  .exp-date {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: var(--muted);
    margin: 0.5rem 0 1rem;
    letter-spacing: 0.05em;
  }

  .exp-bullets {
    list-style: none;
  }

  .exp-bullets li {
    color: var(--muted);
    font-size: 0.92rem;
    padding: 5px 0 5px 1.2rem;
    position: relative;
    margin-bottom: 0.5rem;
  }

  .exp-bullets li::before {
    content: '▹';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-weight: 700;
  }

  /* SKILLS */
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; }
  .skill-group {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(124,110,245,0.18);
    border-radius: 14px; padding: 1.5rem;
    transition: border-color 0.2s;
  }
  .skill-group:hover { border-color: rgba(124,110,245,0.4); }
  .skill-group-title {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem; color: #5dd9b8;
    letter-spacing: 0.12em; text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-tag {
    background: rgba(124,110,245,0.1);
    border: 1px solid rgba(124,110,245,0.2);
    color: #e8e8f0; font-size: 0.8rem;
    padding: 5px 13px; border-radius: 100px;
    font-weight: 600; transition: all 0.2s; cursor: default;
  }
  .skill-tag:hover { background: rgba(124,110,245,0.28); border-color: #7c6ef5; color: #7c6ef5; }

  /* PROJECTS */
  .project-card {
    background: rgba(17, 34, 64, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(100, 255, 218, 0.15);
    border-radius: 20px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .project-card:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: #64ffda;
    box-shadow: 0 15px 35px rgba(100, 255, 218, 0.15);
    background: rgba(17, 34, 64, 0.9);
  }
  .project-card::after {
    content: '';
    position: absolute;
    top: -50px; right: -50px;
    width: 150px; height: 150px;
    background: radial-gradient(circle, rgba(100, 255, 218, 0.15) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
    border-radius: 50%;
  }
  .project-card:hover::after {
    opacity: 1;
  }
  .proj-badge {
    align-self: flex-start; margin-bottom: 1rem;
    font-family: 'Space Mono', monospace; font-size: 0.65rem;
    letter-spacing: 0.12em; color: #64ffda;
    background: rgba(100,255,218,0.1);
    border: 1px solid rgba(100,255,218,0.25);
    padding: 4px 10px; border-radius: 100px;
  }
  .proj-title { font-size: 1.35rem; font-weight: 800; margin-bottom: 0.6rem; }
  .proj-desc { color: #7a7a8c; margin-bottom: 1rem; font-size: 0.95rem; }
  .proj-stack { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 1.25rem; }
  .stack-tag {
    font-family: 'Space Mono', monospace; font-size: 0.7rem;
    color: #5dd9b8; background: rgba(93,217,184,0.08);
    border: 1px solid rgba(93,217,184,0.2);
    padding: 4px 10px; border-radius: 4px; letter-spacing: 0.05em;
  }

  /* OTHER PROJECTS GRID */
  .projects-subtitle {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 4rem;
    margin-bottom: 2rem;
    position: relative;
    display: inline-block;
  }
  .projects-subtitle::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 40px;
    height: 2px;
    background: #5dd9b8;
  }
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }
  .repo-card {
    background: rgba(17, 34, 64, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(100, 255, 218, 0.15);
    border-radius: 20px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
  }
  .repo-card:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: #64ffda;
    box-shadow: 0 15px 35px rgba(100, 255, 218, 0.15);
    background: rgba(17, 34, 64, 0.9);
  }
  .repo-card::after {
    content: '';
    position: absolute;
    bottom: -50px; left: -50px;
    width: 150px; height: 150px;
    background: radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
    border-radius: 50%;
  }
  .repo-card:hover::after {
    opacity: 1;
  }
  .repo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
  }
  .repo-link-btn {
    color: #7a7a8c;
    transition: color 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .repo-link-btn svg {
    width: 20px;
    height: 20px;
  }
  .repo-link-btn:hover {
    color: #7c6ef5;
  }
  .repo-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
    color: #e8e8f0;
  }
  .repo-desc {
    font-size: 0.85rem;
    color: #7a7a8c;
    line-height: 1.6;
    margin-bottom: 1.25rem;
  }
  .repo-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: auto;
  }
  .repo-tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.68rem;
    color: #5dd9b8;
    background: rgba(93,217,184,0.06);
    border: 1px solid rgba(93,217,184,0.15);
    padding: 2px 8px;
    border-radius: 4px;
  }


  /* EDUCATION */
  .edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .edu-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(124,110,245,0.18);
    border-radius: 14px; padding: 2rem;
    transition: border-color 0.2s, transform 0.2s;
  }
  .edu-card:hover { border-color: rgba(124,110,245,0.5); transform: translateY(-3px); }
  .edu-degree { font-size: 1.05rem; font-weight: 700; margin-bottom: 4px; }
  .edu-school { color: #5dd9b8; font-weight: 600; font-size: 0.9rem; margin-bottom: 8px; }
  .edu-date {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem; color: #7a7a8c; letter-spacing: 0.05em;
  }
  .cert-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 2.5rem; }
  .cert-item {
    display: flex; align-items: center; gap: 1rem;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(124,110,245,0.18);
    border-radius: 10px; padding: 1.25rem 1.5rem;
    transition: border-color 0.2s;
  }
  .cert-item:hover { border-color: rgba(124,110,245,0.45); }
  .cert-dot { width: 10px; height: 10px; border-radius: 50%; background: #5dd9b8; flex-shrink: 0; }
  .cert-name { font-weight: 700; font-size: 0.95rem; }
  .cert-issuer { font-size: 0.82rem; color: #7a7a8c; }

  /* CONTACT */
  .contact-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  .contact-info h2 { margin-bottom: 1rem; }
  .contact-info p { color: #7a7a8c; margin-bottom: 2rem; }
  .contact-links-col { display: flex; flex-direction: column; gap: 0.85rem; }
  .contact-link-item {
    display: flex; align-items: center; gap: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(124,110,245,0.18);
    border-radius: 10px; padding: 1rem 1.25rem;
    text-decoration: none; color: #e8e8f0;
    transition: all 0.2s; font-size: 0.9rem; font-weight: 600;
  }
  .contact-link-item:hover { border-color: #7c6ef5; color: #7c6ef5; transform: translateX(4px); }
  .contact-link-item svg { width: 20px; height: 20px; flex-shrink: 0; color: #7c6ef5; }

  /* CONTACT FORM */
  .contact-form { display: flex; flex-direction: column; gap: 1rem; }
  .form-title {
    font-size: 1.1rem; font-weight: 700;
    margin-bottom: 0.5rem; color: #e8e8f0;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-label {
    font-size: 0.78rem; font-weight: 700;
    color: #7a7a8c; letter-spacing: 0.06em; text-transform: uppercase;
    font-family: 'Space Mono', monospace;
  }
  .form-input, .form-textarea {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,110,245,0.2);
    border-radius: 8px; padding: 12px 14px;
    color: #e8e8f0; font-size: 0.95rem;
    font-family: 'Syne', sans-serif;
    outline: none; transition: border-color 0.2s, background 0.2s;
    width: 100%;
  }
  .form-input:focus, .form-textarea:focus {
    border-color: #7c6ef5; background: rgba(124,110,245,0.06);
  }
  .form-input::placeholder, .form-textarea::placeholder { color: #4a4a5a; }
  .form-textarea { resize: vertical; min-height: 130px; }
  .form-submit {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 8px; background: #7c6ef5; color: #fff;
    padding: 14px 28px; border-radius: 9px;
    font-size: 0.95rem; font-weight: 700;
    border: none; cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    font-family: 'Syne', sans-serif; width: 100%;
    letter-spacing: 0.03em;
  }
  .form-submit:hover:not(:disabled) { background: #9384f8; transform: translateY(-2px); }
  .form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
  .form-success {
    background: rgba(93,217,184,0.1); border: 1px solid rgba(93,217,184,0.3);
    border-radius: 10px; padding: 1rem 1.25rem;
    color: #5dd9b8; font-size: 0.9rem; font-weight: 600;
    display: flex; align-items: center; gap: 10px;
  }

  /* FOOTER */
  footer {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 2.5rem;
    color: var(--muted);
    font-size: 0.8rem;
    border-top: 1px solid var(--border);
    font-family: 'Space Mono', monospace;
    letter-spacing: 0.06em;
    background: linear-gradient(180deg, transparent, rgba(100,255,218,0.02));
  }

  /* CUSTOM CURSOR */
  .cursor-dot, .cursor-outline {
    position: fixed; top: 0; left: 0; transform: translate(-50%, -50%);
    border-radius: 50%; pointer-events: none; z-index: 9999;
  }
  .cursor-dot { width: 8px; height: 8px; background: var(--accent); transition: width 0.2s, height 0.2s; }
  .cursor-outline { width: 40px; height: 40px; border: 1px solid var(--accent); transition: width 0.2s, height 0.2s, background 0.2s; }
  .portfolio-root.hovering-link .cursor-dot { width: 0; height: 0; }
  .portfolio-root.hovering-link .cursor-outline { width: 50px; height: 50px; background: rgba(255,255,255,0.1); }

  /* SCROLL REVEAL ANIMATIONS */
  .reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }

  /* CUSTOM ANIMATIONS */
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(100, 255, 218, 0.2);
    }
    50% {
      box-shadow: 0 0 40px rgba(100, 255, 218, 0.4);
    }
  }

  .fade-up {
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.4s; }
  .delay-5 { animation-delay: 0.5s; }

  /* ASYMMETRY */
  .exp-card:nth-child(even) {
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    .exp-card:nth-child(even) {
      transform: none;
    }
    section {
      padding: 80px 6%;
    }
    .nav-desktop {
      display: none;
    }
    .hamburger {
      display: flex;
    }
    .about-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
    .edu-grid {
      grid-template-columns: 1fr;
    }
    .contact-inner {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
    .form-row {
      grid-template-columns: 1fr;
    }
    .hero-title {
      font-size: 3rem;
    }
    h2 {
      font-size: 1.8rem;
    }
    .hero-cards {
      grid-template-columns: 1fr;
    }
  }

  /* GLOBAL ENHANCEMENTS */
  .skill-group, .project-card, .repo-card, .edu-card, .cert-item {
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .skill-group::before, .project-card::before, .repo-card::before, .edu-card::before, .cert-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .skill-group:hover, .project-card:hover, .repo-card:hover, .edu-card:hover, .cert-item:hover {
    transform: translateY(-8px);
    border-color: var(--hover-border);
    box-shadow: 0 12px 32px rgba(100,255,218,0.12);
  }

  .skill-group:hover::before, .project-card:hover::before, .repo-card:hover::before, .edu-card:hover::before, .cert-item:hover::before {
    opacity: 1;
  }

  /* TERMINAL NAVIGATION */
  .terminal-container {
    max-width: 700px; margin: 0 auto;
    background: #0d1117; border: 1px solid var(--border);
    border-radius: 10px; overflow: hidden;
    box-shadow: 0 10px 30px rgba(2, 12, 27, 0.85);
    font-family: 'Space Mono', monospace;
  }
  .term-header {
    background: #161b22; padding: 10px 16px;
    display: flex; align-items: center;
    border-bottom: 1px solid var(--border);
  }
  .term-dots { display: flex; gap: 6px; }
  .term-dot { width: 12px; height: 12px; border-radius: 50%; }
  .term-dot.r { background: #ff5f56; }
  .term-dot.y { background: #ffbd2e; }
  .term-dot.g { background: #27c93f; }
  .term-title { flex: 1; text-align: center; color: var(--muted); font-size: 0.8rem; letter-spacing: 0.05em; }
  .term-body {
    padding: 20px; height: 250px; overflow-y: auto;
    font-size: 0.9rem; display: flex; flex-direction: column;
  }
  .term-line { margin-bottom: 8px; line-height: 1.5; }
  .term-line.system { color: var(--muted); }
  .term-line.user { color: var(--text); }
  .term-line.success { color: var(--accent); }
  .term-line.error { color: #ff5f56; }
  .term-input-row { display: flex; align-items: center; gap: 10px; margin-top: auto; }
  .term-prompt { color: #27c93f; }
  .term-input {
    background: transparent; border: none; color: var(--text);
    font-family: 'Space Mono', monospace; font-size: 0.9rem;
    outline: none; flex: 1; width: 100%;
  }

  /* AI CHAT WIDGET */
  .chat-toggle-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), #5dd9b8);
    color: #000;
    border: none;
    box-shadow: 0 4px 20px rgba(100,255,218,0.4);
    cursor: pointer;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;
  }
  .chat-toggle-btn:hover {
    transform: scale(1.1) translateY(-5px);
    box-shadow: 0 8px 25px rgba(100,255,218,0.5);
  }
  .chat-toggle-btn.open {
    background: var(--bg2);
    color: var(--text);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  }
  
  .chat-widget-container {
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 350px;
    height: 500px;
    max-height: calc(100vh - 120px);
    background: rgba(6, 8, 15, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(100,255,218,0.2);
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    z-index: 9998;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: chatSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  @keyframes chatSlideUp {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  .chat-header {
    padding: 15px 20px;
    background: rgba(100,255,218,0.1);
    border-bottom: 1px solid rgba(100,255,218,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .chat-header-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .chat-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--accent);
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chat-header h4 {
    margin: 0;
    font-size: 1rem;
    color: var(--text);
  }
  .chat-header span {
    font-size: 0.75rem;
    color: var(--accent);
  }
  .chat-close {
    background: none;
    border: none;
    color: var(--muted);
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.2s;
  }
  .chat-close:hover { color: var(--accent); }

  .chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .chat-messages::-webkit-scrollbar { width: 6px; }
  .chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
  
  .chat-bubble {
    max-width: 80%;
    padding: 12px 16px;
    border-radius: 18px;
    font-size: 0.9rem;
    line-height: 1.4;
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .chat-bubble.ai {
    background: var(--bg2);
    color: var(--text);
    align-self: flex-start;
    border-bottom-left-radius: 4px;
    border: 1px solid rgba(255,255,255,0.05);
  }
  .chat-bubble.user {
    background: rgba(100,255,218,0.15);
    color: var(--text);
    align-self: flex-end;
    border-bottom-right-radius: 4px;
    border: 1px solid rgba(100,255,218,0.3);
  }
  
  .chat-bubble.typing {
    display: flex;
    gap: 5px;
    padding: 15px 16px;
  }
  .chat-bubble.typing span {
    width: 6px; height: 6px;
    background: var(--accent);
    border-radius: 50%;
    animation: typingBounce 1.4s infinite ease-in-out both;
  }
  .chat-bubble.typing span:nth-child(1) { animation-delay: -0.32s; }
  .chat-bubble.typing span:nth-child(2) { animation-delay: -0.16s; }
  @keyframes typingBounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }

  .chat-input-area {
    padding: 15px;
    background: var(--bg);
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex;
    gap: 10px;
  }
  .chat-input-area input {
    flex: 1;
    background: var(--bg2);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    padding: 10px 15px;
    color: var(--text);
    font-family: 'Inter', sans-serif;
  }
  .chat-input-area input:focus {
    outline: none;
    border-color: var(--accent);
  }
  .chat-input-area button {
    background: var(--accent);
    color: #000;
    border: none;
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s;
  }
  .chat-input-area button:hover {
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    .chat-widget-container {
      width: calc(100vw - 40px);
      right: 20px;
      bottom: 90px;
    }
  }
`;

// ---- SVG ICONS ----
const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6.29 6.29l.83-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
    <path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" />
  </svg>
);
const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="m22 2-7 20-4-9-9-4 20-7z" /><path d="M22 2 11 13" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ---- CONTACT FORM ----
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1800);
  };

  if (sent) {
    return (
      <div>
        <p className="form-title">Send a Message</p>
        <div className="form-success">
          <IconCheck /> Message send ho gaya! Umar jald hi reply karega.
        </div>
        <button
          className="btn btn-outline"
          style={{ marginTop: "1rem", fontSize: "0.85rem", padding: "10px 20px" }}
          onClick={() => setSent(false)}
        >
          Dobara Bhejo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <p className="form-title">Send a Message</p>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            className="form-input" name="name" type="text"
            placeholder="Aapka naam" value={form.name}
            onChange={handleChange} required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input" name="email" type="email"
            placeholder="email@example.com" value={form.email}
            onChange={handleChange} required
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Subject</label>
        <input
          className="form-input" name="subject" type="text"
          placeholder="Message ka subject" value={form.subject}
          onChange={handleChange} required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Message</label>
        <textarea
          className="form-textarea" name="message"
          placeholder="Apna message yahan likhein..."
          value={form.message} onChange={handleChange} required
        />
      </div>
      <button type="submit" className="form-submit" disabled={sending}>
        {sending ? (
          <>Bhej raha hun...</>
        ) : (
          <><IconSend /> Message Bhejo</>
        )}
      </button>
    </form>
  );
}

// ---- TERMINAL NAV COMPONENT ----
function TerminalNav() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to UmarOS v1.0.0' },
    { type: 'system', text: 'Type a section name (about, experience, skills, projects, education, contact) to navigate.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `> ${cmd}` }];
    const validSections = ['about', 'experience', 'skills', 'projects', 'education', 'contact'];

    if (validSections.includes(cmd)) {
      newHistory.push({ type: 'success', text: `Navigating to ${cmd}...` });
      document.getElementById(cmd)?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else {
      newHistory.push({ type: 'error', text: `Invalid command: ${cmd}. Type a valid section name.` });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <section id="terminal" style={{ padding: "20px 10% 80px 10%" }}>
      <div className="terminal-container">
        <div className="term-header">
          <div className="term-dots">
            <div className="term-dot r"></div>
            <div className="term-dot y"></div>
            <div className="term-dot g"></div>
          </div>
          <div className="term-title">guest@umar-portfolio:~</div>
        </div>
        <div className="term-body">
          {history.map((line, i) => (
            <div key={i} className={`term-line ${line.type}`}>{line.text}</div>
          ))}
          <form onSubmit={handleSubmit} className="term-input-row">
            <span className="term-prompt">$</span>
            <input
              type="text"
              className="term-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              autoComplete="off"
              spellCheck="false"
            />
          </form>
          <div ref={endRef} />
        </div>
      </div>
    </section>
  );
}

// ---- AI CHAT WIDGET ----
function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I am Umar\'s AI Assistant. How can I help you today?' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    const txt = inputVal.trim();
    if (!txt) return;

    setMessages(prev => [...prev, { sender: 'user', text: txt }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "Maaf karna, main theek se samjha nahi. 😅 Aap Umar ki skills, projects ya contact details ke baare mein pooch sakte hain!";
      const lower = txt.toLowerCase();

      // Greetings
      if (/hi|hello|hey|salam|assalam|hy/i.test(lower)) {
        aiResponse = "Hello! 👋 I am Umar's AI assistant. Aap Umar ki skills, projects ya experience ke baare mein pooch sakte hain.";
      }
      else if (/kaise ho|how are you|kya haal/i.test(lower)) {
        aiResponse = "Main theek hun, shukriya! Aap batayein main aapki kya madad kar sakta hun?";
      }
      else if (/kon ho|who are you|your name|tumhara naam/i.test(lower)) {
        aiResponse = "Main Umar ka AI Chat Assistant hun. Main yahan aapko Umar ke portfolio mein guide karne ke liye hun!";
      }
      // Skills / Tech
      else if (/skill|tech|stack|aata hai|kya janta/i.test(lower)) {
        aiResponse = "Umar ek Full-Stack & AI/ML Engineer hain. Unhein React, Next.js, Node.js, Python, aur Machine Learning mein maharat haasil hai. 🚀";
      }
      // Projects
      else if (/project|kam|work|banya hai|portfolio/i.test(lower)) {
        aiResponse = "Umar ne 'Medi-Cure' (AI healthcare system), 'AI Content Detector', aur 'Smart Trash Bin' jaise behtareen projects banaye hain. Projects section dekhiye!";
      }
      // Experience
      else if (/experience|job|intern|kaam kiya/i.test(lower)) {
        aiResponse = "Umar ne Cloudtek mein Generative AI Intern aur Technaureus mein ML Engineer Intern ke taur par kaam kiya hai.";
      }
      // Education
      else if (/education|parhai|degree|university/i.test(lower)) {
        aiResponse = "Umar University of Central Punjab (UCP), Lahore se BSc Computer Science kar rahe hain (2023 - 2027). 🎓";
      }
      // Contact
      else if (/contact|rabta|email|phone|number|hire/i.test(lower)) {
        aiResponse = "Aap Umar ko email kar sakte hain: umaribrahim220099@gmail.com ya call karein: +92 307-4129153 📞";
      }
      // Location
      else if (/kaha se|where|city|location|rehta/i.test(lower)) {
        aiResponse = "Umar Lahore, Pakistan mein base karte hain.";
      }
      // Services
      else if (/service|freelance|banwana/i.test(lower)) {
        aiResponse = "Haan, Umar freelance web development aur AI solutions provide karte hain. Aap unse contact karke project discuss kar sakte hain!";
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 1200);
  };

  return (
    <>
      <button 
        className={`chat-toggle-btn ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/></svg>
        )}
      </button>

      {isOpen && (
        <div className="chat-widget-container">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a2 2 0 0 1 2 2c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2zM4 14v7M20 14v7M10 22h4M6 10h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z"/></svg>
              </div>
              <div>
                <h4>Umar's AI</h4>
                <span>Always online</span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>&times;</button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble ai typing">
                <span></span><span></span><span></span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button type="submit">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

// ---- MAIN PORTFOLIO ----
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map((n) => n.href);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    // Reveal Animations
    const elementsToReveal = document.querySelectorAll('section h2, .about-text, .about-stats, .exp-card, .skill-group, .project-card, .repo-card, .edu-card, .cert-item, .contact-links');
    elementsToReveal.forEach(el => el.classList.add('reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    elementsToReveal.forEach(el => observer.observe(el));

    // Ambient Glow
    const ambientGlow = document.getElementById('ambient-glow');
    // Custom Cursor
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const onMouseMove = (e) => {
      if (ambientGlow) {
        ambientGlow.style.top = e.clientY + 'px';
        ambientGlow.style.left = e.clientX + 'px';
      }
      if (cursorDot && cursorOutline) {
        cursorDot.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        setTimeout(() => {
          cursorOutline.style.top = e.clientY + 'px';
          cursorOutline.style.left = e.clientX + 'px';
        }, 50);
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    const links = document.querySelectorAll('a, button, .nav-link, .btn, .btn-download');
    const rootEl = document.querySelector('.portfolio-root');
    const onMouseEnter = () => rootEl?.classList.add('hovering-link');
    const onMouseLeave = () => rootEl?.classList.remove('hovering-link');
    links.forEach(link => {
      link.addEventListener('mouseenter', onMouseEnter);
      link.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      elementsToReveal.forEach(el => observer.unobserve(el));
      links.forEach(link => {
        link.removeEventListener('mouseenter', onMouseEnter);
        link.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="portfolio-root">
      <style>{css}</style>
      <div className="grid-bg" />

      {/* HEADER */}
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="profile-container" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img 
            src="/Umar.png" 
            alt="Umar Ibrahim" 
            className="profile-image" 
          />
        </div>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              className={`nav-link${activeSection === l.href ? " active" : ""}`}
              onClick={() => scrollTo(l.href)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a href="/Umar_Ibrahim_CV.pdf" download className="btn-download">
            <IconDownload /> Download CV
          </a>
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <button key={l.href} className="mobile-nav-link" onClick={() => scrollTo(l.href)}>
            {l.label}
          </button>
        ))}
        <a href="/Umar_Ibrahim_CV.pdf" download className="btn-download" style={{ marginTop: "1rem" }}>
          <IconDownload /> Download CV
        </a>
      </div>

      <main>
        {/* ===== HERO ===== */}
        <section className="hero" style={{ padding: "0 10%" }}>
          <div className="hero-glow-1" />
          <div className="hero-glow-2" />
          <p className="hero-tag fade-up delay-1">AI/ML Engineer & Full Stack Developer</p>
          <h1 className="hero-title fade-up delay-2">
            Umar<br /><span className="outline">Ibrahim</span>
          </h1>
          <p className="hero-desc">Building intelligent, data-driven systems — from NLP classifiers to full-stack web apps.</p>
          <div className="hero-btns fade-up delay-4">
            <a href="https://www.linkedin.com/in/umar-ibrahim-322872375/" target="_blank" rel="noreferrer" className="btn btn-primary">
              <IconLinkedIn /> LinkedIn
            </a>
            <a href="https://github.com/umaribrahim9022" target="_blank" rel="noreferrer" className="btn btn-outline">
              <IconGitHub /> GitHub
            </a>
            <button className="btn btn-outline" onClick={() => scrollTo("contact")}>
              <IconMail /> Contact Me
            </button>
          </div>

          {/* TOP BENTO ROW */}
          <div className="hero-bento-top fade-up delay-5">
            <div className="bento-image-card">
              <div className="bento-image-content">
                <h3 className="bento-title-lg" style={{ fontSize: "2.2rem", marginBottom: 0, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                  I prioritize client collaboration, fostering open communication
                </h3>
              </div>
            </div>
            <div className="bento-col">
              <div className="bento-globe-card">
                <div className="bento-globe-graphic"></div>
                <h3 className="bento-title" style={{ position: 'relative', zIndex: 2 }}>
                  I'm very flexible with time zone communications
                </h3>
              </div>
              <div className="bento-tech-card">
                <div className="tech-tags-grid">
                  <div className="tech-tag-pill">ReactJS</div>
                  <div className="tech-tag-pill">Javascript</div>
                  <div className="tech-tag-pill">NextJS</div>
                  <div className="tech-tag-pill">Typescript</div>
                  <div className="tech-tag-pill">MySQL</div>
                  <div className="tech-tag-pill">Git</div>
                </div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <p className="bento-label" style={{ marginBottom: "0.5rem" }}>I constantly try to improve</p>
                  <h3 className="bento-title-lg" style={{ marginBottom: 0 }}>My tech stack</h3>
                </div>
              </div>
            </div>
          </div>

          {/* BENTO HERO CARDS */}
          <div className="hero-bento fade-up delay-5">
            <div className="bento-col">
              <div className="bento-card bento-card-dark">
                <div className="bento-bg-grid"></div>
                <h3 className="bento-title">AI/ML Engineer & Full Stack Developer.</h3>
              </div>
              <div className="bento-card bento-card-accent">
                <h3 className="bento-title-lg" style={{ fontSize: "1.6rem" }}>Do you want to start a project together?</h3>
                <button className="bento-copy-btn" onClick={() => {
                  navigator.clipboard.writeText("umaribrahim220099@gmail.com");
                  alert("Email copied!");
                }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy my email address
                </button>
              </div>
            </div>
            <div className="bento-col">
              <div className="bento-card bento-card-dark h-full">
                <div className="bento-bg-grid"></div>
                <div className="bento-code-bg">
{`# Core DS Libraries
import pandas as pd
import numpy as np

# ML Models & DL
from sklearn.svm import SVC
from tensorflow import keras`}
                </div>
                <p className="bento-label">Who me?</p>
                <h3 className="bento-title-lg" style={{ fontSize: "1.8rem" }}>I specialize in building intelligent, data-driven systems and web apps.</h3>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TERMINAL ===== */}
        <TerminalNav />

        {/* ===== ABOUT ===== */}
        <section id="about">
          <h2>Who I <span>Am</span></h2>
          <div className="about-grid">
            <div className="about-text">
              <p>Main AI/ML Engineering aur Full Stack Web Development mein specialise karta hun aur intelligent, data-driven solutions banata hun.</p>
              <p>Maine intern teams lead ki hain, end-to-end ML solutions banaye hain — stock predictors se lekar NLP classifiers tak — aur modern frameworks use karte hue production-ready web applications deliver ki hain.</p>
              <p>Abhi mera Final Year Project chal raha hai: Ethical AI context-intent classifier jo educational environments mein AI ka misuse rokta hai.</p>
            </div>
            <div className="about-stats">
              {[["2+", "Internships"], ["95%+", "Data Integrity"], ["2027", "BSc Graduate"], ["2", "Certifications"]].map(([n, l]) => (
                <div className="stat-card" key={l}>
                  <span className="stat-num">{n}</span>
                  <p className="stat-lbl">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== EXPERIENCE ===== */}
        <section id="experience">
          <h2>Work <span>Experience</span></h2>
          <div className="exp-list">
            {EXPERIENCE.map((exp) => (
              <div className="exp-card" key={exp.company}>
                <div className="exp-icon">{exp.emoji}</div>
                <div>
                  <p className="exp-role">{exp.role}</p>
                  <p className="exp-company">{exp.company}</p>
                  <p className="exp-date">{exp.date}</p>
                  <ul className="exp-bullets">
                    {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SKILLS ===== */}
        <section id="skills">
          <h2>Technical <span>Skills</span></h2>
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([group, tags]) => (
              <div className="skill-group" key={group}>
                <p className="skill-group-title">{group}</p>
                <div className="skill-tags">
                  {tags.map((t) => <span className="skill-tag" key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section id="projects">
          <h2>Featured <span>Project</span></h2>
          <div className="project-card">
            <span className="proj-badge">FINAL YEAR PROJECT</span>
            <p className="proj-title">Ethical AI — Context-Intent Classifier</p>
            <p className="proj-desc">
              Ek NLP-based system jo AI ka misuse rokta hai — dynamically Learning, Exam, aur Child-Safe modes mein switch karta hai user ke context aur intent ke basis par. EdTech aur parental-control markets ko target karta hai.
            </p>
            <div className="proj-stack">
              {["Python", "TensorFlow", "NLP", "React.js", "Node.js"].map((t) => (
                <span className="stack-tag" key={t}>{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href="https://github.com/umaribrahim9022" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: "10px 20px", fontSize: "0.85rem" }}>
                <IconGitHub /> GitHub par Dekho
              </a>
            </div>
          </div>

          <h3 className="projects-subtitle">More AI / ML Projects</h3>
          <div className="projects-grid">
            {GITHUB_PROJECTS.map((project) => (
              <div className="repo-card" key={project.title}>
                <div className="repo-header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px", color: "var(--accent)" }}>
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                  <a href={project.url} target="_blank" rel="noreferrer" className="repo-link-btn" title="View Repository">
                    <IconGitHub />
                  </a>
                </div>
                <div>
                  <h4 className="repo-title">{project.title}</h4>
                  <p className="repo-desc">{project.desc}</p>
                </div>
                <div className="repo-tags">
                  {project.tags.map((tag) => (
                    <span className="repo-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}

            {/* Custom CTA redirect card */}
            <div className="repo-card" style={{ borderStyle: "dashed", borderColor: "rgba(124,110,245,0.35)", backgroundColor: "rgba(124,110,245,0.01)" }}>
              <div className="repo-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ width: "24px", height: "24px", color: "var(--accent2)" }}>
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <a href="https://github.com/umaribrahim9022" target="_blank" rel="noreferrer" className="repo-link-btn" title="Visit Profile">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ width: "20px", height: "20px" }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
                  </svg>
                </a>
              </div>
              <div>
                <h4 className="repo-title">Explore Other Repositories</h4>
                <p className="repo-desc" style={{ fontSize: "0.88rem" }}>
                  Mere baki projects dekhne ke liye GitHub profile visit karein, jin mein Blender 3D animations, SQL databases, internship tasks, C++ tools aur web clones shamil hain.
                </p>
              </div>
              <div className="repo-tags">
                <span className="repo-tag" style={{ color: "var(--accent)", borderColor: "rgba(124,110,245,0.2)", backgroundColor: "rgba(124,110,245,0.05)" }}>SQL</span>
                <span className="repo-tag" style={{ color: "var(--accent)", borderColor: "rgba(124,110,245,0.2)", backgroundColor: "rgba(124,110,245,0.05)" }}>Blender</span>
                <span className="repo-tag" style={{ color: "var(--accent)", borderColor: "rgba(124,110,245,0.2)", backgroundColor: "rgba(124,110,245,0.05)" }}>C++</span>
                <span className="repo-tag" style={{ color: "var(--accent)", borderColor: "rgba(124,110,245,0.2)", backgroundColor: "rgba(124,110,245,0.05)" }}>Web Clones</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== EDUCATION ===== */}
        <section id="education">
          <h2>My <span>Education</span></h2>
          <div className="edu-grid">
            <div className="edu-card">
              <p className="edu-degree">BSc Computer Science</p>
              <p className="edu-school">University of Central Punjab, Lahore</p>
              <p className="edu-date">MAR 2023 – JAN 2027</p>
            </div>
            <div className="edu-card">
              <p className="edu-degree">ICS (Intermediate)</p>
              <p className="edu-school">Punjab College, Pattoki</p>
              <p className="edu-date">MAY 2020 – JUL 2022</p>
            </div>
          </div>
          <div className="cert-list">
            {[["Web Development", "Skill Development Centre"], ["AI / Machine Learning", "NAVTTC"]].map(([name, issuer]) => (
              <div className="cert-item" key={name}>
                <div className="cert-dot" />
                <div>
                  <p className="cert-name">{name}</p>
                  <p className="cert-issuer">{issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact">
          <div className="contact-inner">
            <div className="contact-info">
              <h2>Get In <span>Touch</span></h2>
              <p>Opportunities, collaborations, ya koi interesting project — sab ke liye open hun! Neeche links ya form se reach out karo.</p>
              <div className="contact-links-col">
                <a href="mailto:umaribrahim220099@gmail.com" className="contact-link-item">
                  <IconMail /> umaribrahim220099@gmail.com
                </a>
                <a href="tel:+923074129153" className="contact-link-item">
                  <IconPhone /> +92 307-4129153
                </a>
                <a href="https://www.linkedin.com/in/umar-ibrahim-322872375/" target="_blank" rel="noreferrer" className="contact-link-item">
                  <IconLinkedIn /> LinkedIn Profile
                </a>
                <a href="https://github.com/umaribrahim9022" target="_blank" rel="noreferrer" className="contact-link-item">
                  <IconGitHub /> GitHub Profile
                </a>
                <a href="https://www.instagram.com/umar_ibrahim_22" target="_blank" rel="noreferrer" className="contact-link-item">
                  <IconInstagram /> Instagram Profile
                </a>
                <a href="https://www.facebook.com/umar.ibrahim.2209/" target="_blank" rel="noreferrer" className="contact-link-item">
                  <IconFacebook /> Facebook Profile
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer>
        <p>Designed &amp; Built by Umar Ibrahim &nbsp;·&nbsp;</p>
      </footer>

      <div className="ambient-glow" id="ambient-glow" />
      <div className="cursor-dot" id="cursor-dot" />
      <div className="cursor-outline" id="cursor-outline" />

      {/* AI CHAT WIDGET */}
      <AIChatWidget />
    </div>
  );
}
