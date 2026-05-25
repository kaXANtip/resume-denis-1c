import React, { useEffect, useState } from 'react';
import { Target, Zap, Briefcase, GraduationCap, Building, MapPin, Globe } from 'lucide-react';
import { MD, ProjectData } from './data';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export default function App() {
  const [selectedCase, setSelectedCase] = useState<ProjectData | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorExpand, setCursorExpand] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loaderState, setLoaderState] = useState<'visible' | 'out'>('visible');
  const [hw1, setHw1] = useState(false);
  const [hw2, setHw2] = useState(false);

  // Scroll progress & Nav
  useEffect(() => {
    const handleScroll = () => {
      const st = document.documentElement.scrollTop;
      const dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((st / dh) * 100);
      setIsScrolled(window.scrollY > 55);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom cursor — только на десктопе
  useEffect(() => {
    if (isTouchDevice()) return;
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Reveal Observer
  useEffect(() => {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -44px 0px' });
    document.querySelectorAll('.rev').forEach(el => ro.observe(el));
    return () => ro.disconnect();
  }, []);

  // Timeline Observer
  useEffect(() => {
    const tlObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const tlf = document.getElementById('tlf');
          if (tlf) tlf.style.height = '100%';
          tlObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    const expEl = document.getElementById('experience');
    if (expEl) tlObs.observe(expEl);
    return () => tlObs.disconnect();
  }, []);

  // Blob Parallax
  useEffect(() => {
    const handleBlobScroll = () => {
      const sy = window.scrollY;
      document.querySelectorAll('.blob').forEach((b, i) => {
        (b as HTMLElement).style.transform = `translateY(${sy * (0.18 + i * 0.06)}px)`;
      });
    };
    window.addEventListener('scroll', handleBlobScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleBlobScroll);
  }, []);

  // Loader & hero animation
  useEffect(() => {
    setTimeout(() => {
      setLoaderState('out');
      setTimeout(() => {
        setHw1(true);
        setTimeout(() => setHw2(true), 160);
      }, 100);
    }, 820);
  }, []);

  const ce = !isTouchDevice() ? {
    onMouseEnter: () => setCursorExpand(true),
    onMouseLeave: () => setCursorExpand(false),
  } : {};

  return (
    <>
      {/* LOADER */}
      <div id="loader" className={loaderState === 'out' ? 'out' : ''}>
        <div className="loader-mark">ДИ<span>.</span></div>
      </div>

      {/* CURSOR — только десктоп */}
      {!isTouchDevice() && (
        <div
          id="cur"
          style={{ left: cursorPos.x, top: cursorPos.y }}
          className={cursorExpand ? 'expand' : ''}
        />
      )}

      {/* PROGRESS */}
      <div id="prog" style={{ width: `${scrollProgress}%` }}></div>

      {/* MESH BG */}
      <div className="mesh-bg">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
      </div>

      {/* NAV */}
      <nav id="nav" className={isScrolled ? 'sc' : ''}>
        <a href="#hero" className="nav-logo" {...ce}>
          <div className="nav-mark">ДИ</div>
          Денис Исламов
        </a>
        <ul className="nav-links">
          <li><a href="#cases" {...ce}>Проекты</a></li>
          <li><a href="#skills" {...ce}>Стек</a></li>
          <li><a href="#experience" {...ce}>Опыт</a></li>
          <li><a href="#about" {...ce}>О себе</a></li>
        </ul>
        <a href="#contact" className="nav-cta" {...ce}>Связаться →</a>
      </nav>

      <main>
        {/* ════ HERO ════ */}
        <section id="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <div className="hero-tag">Программист 1С · Middle+ · Интеграции · Автоматизация</div>
                <h1 className="hero-name">
                  <span className="hw-block"><span className={`hw ${hw1 ? 'in' : ''}`} id="hw1">Денис</span></span>
                  <span className="hw-block"><span className={`hw hw-accent ${hw2 ? 'in' : ''}`} id="hw2">Исламов</span></span>
                </h1>
                <p className="hero-tagline">Дорабатываю 1С под конкретные задачи бизнеса. Сначала разбираюсь как устроен процесс, потом пишу. AI использую чтобы работать быстрее — не вместо головы.</p>
                <div className="hero-pills">
                  <span className="hero-pill">1С 8.3 · УТ · ERP · БП · КА</span>
                  <span className="hero-pill">СКД · Расширения · API</span>
                  <span className="hero-pill">ЕГАИС · Честный знак</span>
                  <span className="hero-pill">Python · Интеграции</span>
                </div>
                <div className="hero-btns">
                  <a href="#cases" className="btn-p" {...ce}>Смотреть проекты →</a>
                  <a href="#contact" className="btn-o" {...ce}>Написать</a>
                </div>
              </div>

              <div className="hero-right">
                <div className="fcard fc1">
                  <div className="code-bar">
                    <span className="cd" style={{ background: '#ff5f57' }}></span>
                    <span className="cd" style={{ background: '#ffbd2e' }}></span>
                    <span className="cd" style={{ background: '#28ca41' }}></span>
                    <span className="cfn">1c_integration.bsl</span>
                  </div>
                  <span className="cl"><span className="c-cm">// Обработка входящего заказа</span></span>
                  <span className="cl"><span className="c-kw">Процедура</span> <span className="c-fn">ЗагрузитьЗаказыМаркетплейса</span>()</span>
                  <span className="cl">&nbsp;&nbsp;<span className="c-fn">Ответ</span> = <span className="c-str">ОтправитьHTTPЗапрос</span>(URL);</span>
                  <span className="cl">&nbsp;&nbsp;<span className="c-fn">ЗаписатьВБазу</span>(Ответ.Данные);</span>
                  <span className="cl"><span className="c-kw">КонецПроцедуры</span></span>
                </div>
                <div className="fcard fc2">
                  <div className="fc2-lbl">Ручной труд бухгалтерии</div>
                  <div className="fc2-val" style={{ color: 'var(--accent)' }}>-80%</div>
                  <div className="fc2-sub">после настройки автозагрузки</div>
                </div>
                <div className="fcard fc3">
                  <div className="fc3-chain">Задача<span className="arr">→</span>Расширение<span className="arr">→</span>Продакшн</div>
                  <div className="fc3-badge">Без снятия с поддержки</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════ VALUE PROPOSITION ════ */}
        <section id="stats" style={{ padding: '80px 0', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', background: 'var(--bg-card)' }}>
          <div className="wrap">
            <div className="slabel rev">value</div>
            <h2 className="sec-h2 rev d1" style={{ marginBottom: '40px' }}>Как я строю работу</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div className="rev d1" style={{ background: 'var(--bg-subtle)', padding: '36px', borderRadius: 'var(--r-lg)' }}>
                <div style={{ marginBottom: '20px' }}><Target size={32} color="var(--accent)" strokeWidth={1.5} /></div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '14px', letterSpacing: '-0.3px', color: 'var(--text)' }}>Сначала разбираюсь, потом пишу</h3>
                <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.7 }}>Прихожу в отдел и смотрю как работают люди — где тормозит, где ошибки, что делается руками каждый день. Задачу пишу только после этого. Иначе можно сделать точно по ТЗ и не попасть в проблему.</p>
              </div>
              <div className="rev d2" style={{ background: 'var(--bg-subtle)', padding: '36px', borderRadius: 'var(--r-lg)' }}>
                <div style={{ marginBottom: '20px' }}><Zap size={32} color="var(--accent)" strokeWidth={1.5} /></div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '14px', letterSpacing: '-0.3px', color: 'var(--text)' }}>Код, в который не страшно зайти</h3>
                <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.7 }}>Комментирую, называю переменные по-человечески, работаю через расширения — типовая конфигурация остаётся на поддержке. Следующий разработчик должен понять что сделано, не звоня мне.</p>
              </div>
              <div className="rev d3" style={{ background: 'var(--bg-subtle)', padding: '36px', borderRadius: 'var(--r-lg)' }}>
                <div style={{ marginBottom: '20px' }}><Briefcase size={32} color="var(--accent)" strokeWidth={1.5} /></div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '14px', letterSpacing: '-0.3px', color: 'var(--text)' }}>Готово — когда люди пользуются, а не когда написано</h3>
                <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.7 }}>Написать код — это половина. Потом тест, правки по итогам, обучение если надо. Задача закрыта тогда когда сотрудники реально перешли на новый процесс, а не вернулись к старому через неделю.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════ CASES ════ */}
        <section id="cases">
          <div className="wrap">
            <div className="slabel rev">projects</div>
            <h2 className="sec-h2 rev d1">Что я строил</h2>
            <div className="featured-label rev d2">
              <span className="featured-badge">Ключевые кейсы</span>
              <span className="featured-line"></span>
            </div>
            <div className="cases-featured">
              {[MD['c1'], MD['c2'], MD['c3']].map((project) => (
                <div
                  key={project.id}
                  className="case-card feat rev d1"
                  style={{ '--ch': '#e8f4fd', '--cb': '#b0c8ec' } as React.CSSProperties}
                  onClick={() => setSelectedCase(project)}
                  {...ce}
                >
                  <div className="case-head">
                    <span className="case-ico">{project.icon}</span>
                    <div className="case-tags">
                      {project.tags.slice(0, 3).map(tag => <span key={tag} className="ctag">{tag}</span>)}
                    </div>
                  </div>
                  <div className="case-body">
                    <div className="case-metric">{project.metrics.map(m => m.v).join(' · ')}</div>
                    <h3 className="case-title">{project.title}</h3>
                    <p className="case-desc">{project.task.substring(0, 110)}…</p>
                    <div className="case-foot">
                      <div className="case-tags"><span className="ctag">{project.tags[0]}</span></div>
                      <span className="case-arr">Подробнее →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <span className="cases-rest-label rev">// остальные проекты</span>
            <div className="cases-grid">
              {['c10','c11','c12','c13','c4','c5','c6','c7','c8','c9','mf1','mf2','mf3','m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','m11','m12','m13','m14','m15','m16'].map((key, index) => {
                const project = MD[key];
                const bgStyle = index % 2 === 0
                  ? { '--ch': '#f8fafc', '--cb': '#cbd5e1' }
                  : { '--ch': '#f8f9fa', '--cb': '#e2e8f0' };
                return (
                  <div
                    key={project.id}
                    className="case-card rev d1"
                    style={bgStyle as React.CSSProperties}
                    onClick={() => setSelectedCase(project)}
                    {...ce}
                  >
                    <div className="case-head">
                      <span className="case-ico">{project.icon}</span>
                      <div className="case-tags">
                        {project.tags.slice(0, 4).map(tag => <span key={tag} className="ctag">{tag}</span>)}
                      </div>
                    </div>
                    <div className="case-body">
                      <div className="case-metric">{project.metrics.map(m => m.v).join(' · ')}</div>
                      <h3 className="case-title">{project.title}</h3>
                      <p className="case-desc">{project.task}</p>
                      <div className="case-foot">
                        <div className="case-tags"><span className="ctag">{project.tags[0]}</span></div>
                        <span className="case-arr">Подробнее →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════ SKILLS ════ */}
        <section id="skills">
          <div className="wrap">
            <div className="slabel rev">skills</div>
            <h2 className="sec-h2 rev d1">Стек</h2>
            <div className="skills-cloud">
              <span className="stag sl rev d1" {...ce}>1С 8.3</span>
              <span className="stag sl rev d1" {...ce}>УТ · ERP · БП · КА</span>
              <span className="stag sl rev d2" {...ce}>Python</span>
              <span className="stag sm rev d1" {...ce}>СКД</span>
              <span className="stag sm rev d2" {...ce}>Расширения конфигураций</span>
              <span className="stag sm rev d2" {...ce}>REST API</span>
              <span className="stag sm rev d3" {...ce}>ЕГАИС · Честный знак</span>
              <span className="stag sm rev d3" {...ce}>Cleverence SMARTS</span>
              <span className="stag sm rev d4" {...ce}>Telegram Bot API</span>
              <span className="stag ss rev d1" {...ce}>Bitrix24</span>
              <span className="stag ss rev d2" {...ce}>Prompt Engineering</span>
              <span className="stag ss rev d2" {...ce}>n8n</span>
              <span className="stag ss rev d3" {...ce}>Google Sheets API</span>
              <span className="stag ss rev d3" {...ce}>Claude</span>
              <span className="stag ss rev d4" {...ce}>CatBoost</span>
              <span className="stag ss rev d4" {...ce}>Vercel</span>
            </div>
          </div>
        </section>

        {/* ════ EXPERIENCE ════ */}
        <section id="experience">
          <div className="wrap">
            <div className="slabel rev">experience</div>
            <h2 className="sec-h2 rev d1">Опыт работы</h2>
            <div className="timeline">
              <div className="tl-bar"><div className="tl-fill" id="tlf"></div></div>
              <div className="tl-item rev d1">
                <div className="tl-dot"></div>
                <div className="tl-per">2024 — 2026</div>
                <div className="tl-role">Программист 1С / Автоматизация</div>
                <div className="tl-co">Строительная компания</div>
                <p className="tl-desc">Писал нетиповой функционал на 1С 8.3: расширения, интеграции через REST API, отчёты на СКД для собственника и финдиректора. Разобрал зависания базы при 50+ пользователях — нашёл тяжёлые запросы в циклах проведения и починил. Задачи приходили напрямую от руководства, без промежуточных звеньев.</p>
              </div>
              <div className="tl-item rev d2">
                <div className="tl-dot"></div>
                <div className="tl-per">2023 — 2025</div>
                <div className="tl-role">Программист 1С</div>
                <div className="tl-co">Торгово-производственная компания</div>
                <p className="tl-desc">Дорабатывал учёт под специфику производства: маршрутные листы, рецептуры, движение полуфабрикатов. Написал интеграцию с весовым оборудованием через COM-порт. Построил план-фактный анализ производства на СКД. Вёл базу параллельно с другим разработчиком — выстроили работу через хранилище 1С.</p>
              </div>
              <div className="tl-item rev d3">
                <div className="tl-dot"></div>
                <div className="tl-per">3+ года</div>
                <div className="tl-role">Digital-маркетолог / Автоматизация</div>
                <div className="tl-co">Digital-агентство</div>
                <p className="tl-desc">Настраивал автоматизацию и аналитику для нескольких клиентов параллельно. Писал интеграции с внешними API, строил отчётность, запускал и оптимизировал рекламные кампании.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════ ABOUT ════ */}
        <section id="about">
          <div className="wrap">
            <div className="slabel rev">about</div>
            <h2 className="sec-h2 rev d1">О себе</h2>
            <div className="about-grid">
              <div>
                <p className="about-text rev d2">
                  Пишу на 1С для конкретных бизнес-задач — дорабатываю конфигурации, строю интеграции, оптимизирую запросы. Привык работать напрямую: сам иду к руководителю отдела, разбираюсь в процессе, перевожу в код. Без лишних посредников быстрее и точнее.<br /><br />
                  Claude и ChatGPT использую каждый день — шаблонный код, однотипные запросы, документацию. Освобождает время на то где нужна голова, а не руки.<br /><br />
                  Участвовал в программе <strong>«Практикум» МШУ СКОЛКОВО</strong> совместно с руководителем компании. Разбирали кейсы, считали экономику, смотрели на бизнес глазами собственника. После этого проще объяснять зачем нужна та или иная доработка и сколько она реально стоит.
                </p>
              </div>
              <div className="about-facts">
                <div className="afact rev d1" {...ce}><span className="afact-ico"><GraduationCap size={18} /></span>Строительный университет, ПГС, 3 курс</div>
                <div className="afact rev d2" {...ce}><span className="afact-ico"><Building size={18} /></span>МШУ Сколково: Практикум</div>
                <div className="afact rev d3" {...ce}><span className="afact-ico"><MapPin size={18} /></span>Санкт-Петербург</div>
                <div className="afact rev d4" {...ce}><span className="afact-ico"><Globe size={18} /></span>English: B1/B2</div>
              </div>
            </div>
          </div>
        </section>

        {/* ════ CONTACT ════ */}
        <section id="contact">
          <div className="wrap">
            <div className="contact-box rev">
              <div className="slabel" style={{ marginBottom: '14px' }}>contact</div>
              <h2 className="contact-title">Давайте работать</h2>
              <p className="contact-sub">Готов к проектам и штату. Удалённо или в офисе — без разницы.</p>
              <div className="contact-btns">
                <a href="https://t.me/online111online" className="btn-tg" {...ce}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.603c-.15.658-.557.818-1.126.508l-3.108-2.29-1.5 1.442c-.165.166-.305.305-.627.305l.222-3.158 5.76-5.197c.25-.221-.055-.344-.386-.123L6.55 14.52l-2.942-.92c-.639-.2-.652-.638.134-.945l11.546-4.452c.532-.194 1.0.13.274.045z"/></svg>
                  Telegram
                </a>
                <a href="mailto:dengyjy@gmail.com" className="btn-p" {...ce}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Email
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>© 2025 Денис Исламов &nbsp;·&nbsp; Программист 1С &nbsp;·&nbsp; Санкт-Петербург</footer>

      {/* ════ MODAL ════ */}
      <div
        id="mbd"
        className={selectedCase ? 'open' : ''}
        onClick={(e) => { if (e.target === e.currentTarget) setSelectedCase(null); }}
      >
        <div id="mbox">
          {selectedCase && (
            <div id="mc">
              <div className="m-hd">
                <div>
                  <span className="m-emoji">{selectedCase.icon}</span>
                  <div className="m-title">{selectedCase.title}</div>
                  <div className="m-sub">{selectedCase.sub}</div>
                </div>
                <button className="m-close" onClick={() => setSelectedCase(null)} {...ce}>×</button>
              </div>
              <div className="m-sec"><div className="m-sec-lbl">Задача</div><p>{selectedCase.task}</p></div>
              <div className="m-sec"><div className="m-sec-lbl">Решение</div><p>{selectedCase.solution}</p></div>
              <div className="m-sec"><div className="m-sec-lbl">Результат</div><p>{selectedCase.result}</p></div>
              <div className="m-metrics">
                {selectedCase.metrics.map((m, i) => (
                  <div className="m-met" key={i}>
                    <div className="m-met-v">{m.v}</div>
                    <div className="m-met-l">{m.l}</div>
                  </div>
                ))}
              </div>
              <div className="m-sec">
                <div className="m-sec-lbl">Стек</div>
                <div className="m-tags">
                  {selectedCase.tags.map(t => <span className="m-tag" key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
