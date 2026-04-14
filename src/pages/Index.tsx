import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/384d1c3d-4814-4144-bdb1-e1609426d4e3/files/1f3acc34-bb8b-425a-b1ca-53e249998fe5.jpg";
const METALS_IMAGE = "https://cdn.poehali.dev/projects/384d1c3d-4814-4144-bdb1-e1609426d4e3/files/e089663d-3bb7-4a54-8e58-26ddc121f57c.jpg";
const FACTORY_IMAGE = "https://cdn.poehali.dev/projects/384d1c3d-4814-4144-bdb1-e1609426d4e3/files/9ed97aad-d62c-4dda-9976-ecc06044c046.jpg";

const products = [
  {
    name: "СД-100",
    desc: "Компактная установка для малых объёмов переработки",
    capacity: "до 100 кг/ч",
    weight: "850 кг",
    power: "15 кВт",
    tag: "Стартовый",
  },
  {
    name: "СД-500",
    desc: "Производительная линия для средних предприятий",
    capacity: "до 500 кг/ч",
    weight: "2 400 кг",
    power: "45 кВт",
    tag: "Популярный",
    highlight: true,
  },
  {
    name: "СД-1000",
    desc: "Промышленная установка максимальной мощности",
    capacity: "до 1 000 кг/ч",
    weight: "4 800 кг",
    power: "90 кВт",
    tag: "Флагман",
  },
];

const advantages = [
  { icon: "Zap", title: "Высокая производительность", text: "Современные дробильные валы обеспечивают эффективное разделение компонентов платы на фракции" },
  { icon: "Shield", title: "Надёжность и долговечность", text: "Все узлы изготовлены из износостойких сплавов и рассчитаны на многолетнюю эксплуатацию" },
  { icon: "Settings", title: "Простота обслуживания", text: "Модульная конструкция позволяет быстро заменить любой компонент без остановки производства" },
  { icon: "Leaf", title: "Экологичность", text: "Замкнутый цикл переработки исключает вредные выбросы и соответствует экологическим нормам РФ" },
  { icon: "BarChart2", title: "Высокое извлечение металлов", text: "Степень извлечения золота, серебра и меди — свыше 98%, что гарантирует максимальный экономический эффект" },
  { icon: "Headphones", title: "Сервис и поддержка", text: "Монтаж, обучение персонала, гарантийное и постгарантийное обслуживание по всей России" },
];

const steps = [
  { num: "01", title: "Загрузка сырья", text: "Платы подаются на конвейер и проходят предварительную сортировку" },
  { num: "02", title: "Дробление", text: "Валковый шредер измельчает платы до фракций 2–10 мм" },
  { num: "03", title: "Сепарация", text: "Электростатический и магнитный сепаратор разделяют металлы и полимеры" },
  { num: "04", title: "Сбор готовой фракции", text: "Металлический концентрат собирается в биг-бэги для дальнейшей аффинажной переработки" },
];

const faqs = [
  { q: "Какие платы можно перерабатывать?", a: "Материнские платы, платы телефонов, планшетов, серверное оборудование, электронные компоненты — любые ПП с металлической начинкой." },
  { q: "Какова степень извлечения металлов?", a: "Золото и серебро — до 99%, медь — до 98%, алюминий и олово — до 95%." },
  { q: "Нужно ли специальное помещение?", a: "Установка работает в закрытом помещении с вентиляцией. Площадь — от 50 м² для СД-100." },
  { q: "Как быстро окупается оборудование?", a: "При средней загрузке 8 ч/сутки срок окупаемости составляет 6–18 месяцев в зависимости от модели." },
  { q: "Есть ли рассрочка или лизинг?", a: "Да, мы работаем с ведущими лизинговыми компаниями и можем организовать финансирование под ваш проект." },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "var(--sd-dark)", color: "var(--sd-text)", minHeight: "100vh" }}>

      {/* NAVIGATION */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(20,20,20,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--sd-border)" : "none",
          transition: "all 0.3s",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8,
                background: "var(--sd-orange)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name="Cog" size={22} color="white" />
              </div>
              <span style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>
                СУПЕР<span style={{ color: "var(--sd-orange)" }}>ДРОБ</span>
              </span>
            </div>

            {/* Desktop nav */}
            <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="hidden-mobile">
              {[["about", "О компании"], ["products", "Продукция"], ["process", "Процесс"], ["faq", "FAQ"], ["contacts", "Контакты"]].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, fontFamily: "Montserrat" }}>
                  {label}
                </button>
              ))}
              <button className="btn-orange" onClick={() => scrollTo("contacts")} style={{ padding: "10px 24px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 14 }}>
                Получить КП
              </button>
            </div>

            {/* Burger */}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "white" }} className="show-mobile">
              <Icon name={menuOpen ? "X" : "Menu"} size={26} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "rgba(20,20,20,0.99)", padding: "16px 24px 24px" }}>
            {[["about", "О компании"], ["products", "Продукция"], ["process", "Процесс"], ["faq", "FAQ"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 0", background: "none", border: "none", color: "var(--sd-text)", fontSize: 16, fontFamily: "Montserrat", fontWeight: 600, cursor: "pointer", borderBottom: "1px solid var(--sd-border)" }}>
                {label}
              </button>
            ))}
            <button className="btn-orange" onClick={() => scrollTo("contacts")} style={{ marginTop: 16, width: "100%", padding: "14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 15 }}>
              Получить КП
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(20,20,20,0.95) 50%, rgba(20,20,20,0.4) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 24px", paddingTop: 80 }}>
          <div style={{ maxWidth: 640 }}>
            <div className="animate-fade-in-up" style={{
              display: "inline-block", background: "var(--sd-orange)", color: "white",
              padding: "6px 16px", borderRadius: 4, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24,
              fontFamily: "Montserrat",
            }}>
              Производство установок в России
            </div>
            <h1 className="animate-fade-in-up delay-100" style={{
              fontFamily: "Montserrat", fontWeight: 900, fontSize: "clamp(36px, 6vw, 72px)",
              lineHeight: 1.05, marginBottom: 24, letterSpacing: "-0.02em",
            }}>
              Установки для<br />
              <span style={{ color: "var(--sd-orange)" }}>переработки</span><br />
              печатных плат
            </h1>
            <p className="animate-fade-in-up delay-200" style={{ fontSize: 18, lineHeight: 1.7, color: "#d1d5db", marginBottom: 40, fontFamily: "Open Sans" }}>
              Извлекаем золото, серебро и медь из электронного лома с&nbsp;эффективностью свыше 98%. Полный цикл переработки — от шредирования до металлического концентрата.
            </p>
            <div className="animate-fade-in-up delay-300" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-orange" onClick={() => scrollTo("products")} style={{ padding: "16px 36px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 16 }}>
                Смотреть установки
              </button>
              <button onClick={() => scrollTo("process")} style={{
                padding: "16px 36px", borderRadius: 6, border: "2px solid rgba(255,255,255,0.3)",
                background: "transparent", color: "white", cursor: "pointer", fontSize: 16,
                fontFamily: "Montserrat", fontWeight: 600, transition: "border-color 0.3s",
              }}>
                Как это работает
              </button>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up delay-400" style={{ display: "flex", gap: 40, marginTop: 60, flexWrap: "wrap" }}>
              {[["98%+", "Извлечение металлов"], ["10 лет", "На рынке"], ["200+", "Установок в работе"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 36, color: "var(--sd-orange)", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.5 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.1em", fontFamily: "Montserrat" }}>ПРОКРУТИТЕ</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", background: "var(--sd-dark2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="grid-mobile">
            <div ref={addReveal} className="reveal">
              <div style={{ color: "var(--sd-orange)", fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>О компании</div>
              <h2 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.15, marginBottom: 24, letterSpacing: "-0.02em" }}>
                Российский производитель оборудования для рециклинга электроники
              </h2>
              <p style={{ color: "#9ca3af", lineHeight: 1.8, marginBottom: 20 }}>
                С 2014 года мы разрабатываем и производим установки для переработки печатных плат (ПП). Наше оборудование работает на предприятиях по всей России — от малых аффинажных мастерских до крупных рециклинговых заводов.
              </p>
              <p style={{ color: "#9ca3af", lineHeight: 1.8, marginBottom: 32 }}>
                Собственное конструкторское бюро позволяет нам проектировать установки под задачи конкретного заказчика: объём, тип сырья, площадь помещения и бюджет.
              </p>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[["2014", "Год основания"], ["Россия", "Производство"], ["ИСО 9001", "Сертификация"]].map(([v, l]) => (
                  <div key={l} style={{ borderLeft: "3px solid var(--sd-orange)", paddingLeft: 16 }}>
                    <div style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 22, color: "white" }}>{v}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div ref={addReveal} className="reveal" style={{ position: "relative" }}>
              <img src={FACTORY_IMAGE} alt="Производство" style={{ width: "100%", borderRadius: 12, objectFit: "cover", height: 420 }} />
              <div style={{
                position: "absolute", bottom: -20, left: -20,
                background: "var(--sd-orange)", color: "white",
                padding: "20px 28px", borderRadius: 10,
                fontFamily: "Montserrat",
              }}>
                <div style={{ fontWeight: 800, fontSize: 32 }}>200+</div>
                <div style={{ fontSize: 13, opacity: 0.9 }}>установок в эксплуатации</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section style={{ padding: "100px 24px", background: "var(--sd-dark)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={addReveal} className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "var(--sd-orange)", fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Преимущества</div>
            <h2 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.02em" }}>
              Почему выбирают СуперДроб
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="grid-3-mobile">
            {advantages.map((a, i) => (
              <div key={i} ref={addReveal} className="reveal card-hover" style={{
                background: "var(--sd-gray)", borderRadius: 12,
                padding: "32px", border: "1px solid var(--sd-border)",
              }}>
                <div style={{ width: 52, height: 52, borderRadius: 10, background: "rgba(232,93,4,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon name={a.icon} fallback="Star" size={24} color="var(--sd-orange)" />
                </div>
                <h3 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{a.title}</h3>
                <p style={{ color: "#9ca3af", lineHeight: 1.7, fontSize: 14 }}>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: "100px 24px", background: "var(--sd-dark2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={addReveal} className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "var(--sd-orange)", fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Продукция</div>
            <h2 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.02em" }}>
              Модельный ряд установок
            </h2>
            <p style={{ color: "#9ca3af", marginTop: 16, fontSize: 16 }}>Выберите модель под ваши производственные задачи</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="grid-3-mobile">
            {products.map((p, i) => (
              <div key={i} ref={addReveal} className="reveal card-hover" style={{
                background: p.highlight ? "linear-gradient(135deg, #e85d04 0%, #f48c06 100%)" : "var(--sd-gray)",
                borderRadius: 16, padding: "36px 32px",
                border: p.highlight ? "none" : "1px solid var(--sd-border)",
                position: "relative", overflow: "hidden",
              }}>
                {p.highlight && <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />}
                <div style={{
                  display: "inline-block", padding: "4px 12px", borderRadius: 4,
                  background: p.highlight ? "rgba(255,255,255,0.25)" : "rgba(232,93,4,0.2)",
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  fontFamily: "Montserrat", color: p.highlight ? "white" : "var(--sd-orange)",
                  marginBottom: 20,
                }}>
                  {p.tag}
                </div>
                <h3 style={{ fontFamily: "Montserrat", fontWeight: 900, fontSize: 42, letterSpacing: "-0.02em", marginBottom: 8, color: "white" }}>{p.name}</h3>
                <p style={{ color: p.highlight ? "rgba(255,255,255,0.85)" : "#9ca3af", marginBottom: 28, fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {[["Производительность", p.capacity], ["Масса установки", p.weight], ["Мощность", p.power]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${p.highlight ? "rgba(255,255,255,0.2)" : "var(--sd-border)"}`, paddingBottom: 10 }}>
                      <span style={{ fontSize: 13, color: p.highlight ? "rgba(255,255,255,0.7)" : "#6b7280" }}>{k}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "Montserrat" }}>{v}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollTo("contacts")} style={{
                  width: "100%", padding: "14px", borderRadius: 8, cursor: "pointer",
                  fontFamily: "Montserrat", fontWeight: 700, fontSize: 14,
                  background: p.highlight ? "white" : "var(--sd-orange)",
                  color: p.highlight ? "var(--sd-orange)" : "white",
                  border: "none", transition: "opacity 0.3s",
                }}>
                  Запросить КП
                </button>
              </div>
            ))}
          </div>
          <div ref={addReveal} className="reveal" style={{ marginTop: 32, textAlign: "center" }}>
            <p style={{ color: "#6b7280", fontSize: 14 }}>Нужна нестандартная конфигурация? <button onClick={() => scrollTo("contacts")} style={{ color: "var(--sd-orange)", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Свяжитесь с нами</button> — спроектируем под ваши задачи.</p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ padding: "100px 24px", background: "var(--sd-dark)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={addReveal} className="reveal" style={{ textAlign: "center", marginBottom: 70 }}>
            <div style={{ color: "var(--sd-orange)", fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Технология</div>
            <h2 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.02em" }}>
              Как работает установка
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="grid-mobile">
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {steps.map((s, i) => (
                <div key={i} ref={addReveal} className="reveal" style={{ display: "flex", gap: 24 }}>
                  <div style={{
                    flexShrink: 0, width: 60, height: 60, borderRadius: 12,
                    background: "var(--sd-gray)", border: "2px solid var(--sd-orange)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Montserrat", fontWeight: 900, fontSize: 18, color: "var(--sd-orange)",
                  }}>
                    {s.num}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ color: "#9ca3af", lineHeight: 1.7, fontSize: 14 }}>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div ref={addReveal} className="reveal">
              <img src={METALS_IMAGE} alt="Металлы после переработки" style={{ width: "100%", borderRadius: 16, objectFit: "cover", height: 460 }} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "100px 24px", background: "var(--sd-dark2)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div ref={addReveal} className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "var(--sd-orange)", fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>FAQ</div>
            <h2 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.02em" }}>
              Частые вопросы
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} ref={addReveal} className="reveal" style={{
                background: "var(--sd-gray)", borderRadius: 12,
                border: `1px solid ${activeFaq === i ? "var(--sd-orange)" : "var(--sd-border)"}`,
                overflow: "hidden", transition: "border-color 0.3s",
              }}>
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} style={{
                  width: "100%", padding: "22px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "none", border: "none", cursor: "pointer", color: "white", textAlign: "left",
                }}>
                  <span style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: 16 }}>{f.q}</span>
                  <Icon name={activeFaq === i ? "ChevronUp" : "ChevronDown"} size={20} color="var(--sd-orange)" />
                </button>
                {activeFaq === i && (
                  <div style={{ padding: "0 24px 22px", color: "#9ca3af", lineHeight: 1.8, fontSize: 15 }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" style={{ padding: "100px 24px", background: "var(--sd-dark)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="grid-mobile">
            <div ref={addReveal} className="reveal">
              <div style={{ color: "var(--sd-orange)", fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Контакты</div>
              <h2 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.02em", marginBottom: 24 }}>
                Готовы обсудить ваш проект
              </h2>
              <p style={{ color: "#9ca3af", lineHeight: 1.8, marginBottom: 40, fontSize: 16 }}>
                Оставьте заявку — наш инженер свяжется с вами в течение рабочего дня, ответит на все вопросы и рассчитает стоимость под ваши задачи.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (800) 555-00-00" },
                  { icon: "Mail", label: "Email", val: "info@superdrob.ru" },
                  { icon: "MapPin", label: "Адрес", val: "Москва, Промышленная ул., 12" },
                  { icon: "Clock", label: "Режим работы", val: "Пн–Пт: 9:00–18:00" },
                ].map(({ icon, label, val }) => (
                  <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(232,93,4,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={icon} fallback="Star" size={20} color="var(--sd-orange)" />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontFamily: "Montserrat", fontWeight: 600 }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div ref={addReveal} className="reveal" style={{ background: "var(--sd-gray)", borderRadius: 16, padding: "40px", border: "1px solid var(--sd-border)" }}>
              <h3 style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 24, marginBottom: 8 }}>Запросить коммерческое предложение</h3>
              <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 28 }}>Заполните форму — ответим в течение 2 часов</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Имя", placeholder: "Иван Иванов", type: "text" },
                  { label: "Компания", placeholder: "ООО «Рециклинг»", type: "text" },
                  { label: "Телефон", placeholder: "+7 (___) ___-__-__", type: "tel" },
                  { label: "Email", placeholder: "ivan@company.ru", type: "email" },
                ].map(({ label, placeholder, type }) => (
                  <div key={label}>
                    <label style={{ fontSize: 13, color: "#9ca3af", fontFamily: "Montserrat", fontWeight: 500, display: "block", marginBottom: 6 }}>{label}</label>
                    <input type={type} placeholder={placeholder} style={{
                      width: "100%", padding: "12px 16px", borderRadius: 8,
                      background: "var(--sd-dark2)", border: "1px solid var(--sd-border)",
                      color: "white", fontSize: 14, outline: "none", boxSizing: "border-box",
                      fontFamily: "Open Sans",
                    }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 13, color: "#9ca3af", fontFamily: "Montserrat", fontWeight: 500, display: "block", marginBottom: 6 }}>Модель / объём</label>
                  <textarea placeholder="Интересует СД-500, объём ~300 кг/ч..." rows={3} style={{
                    width: "100%", padding: "12px 16px", borderRadius: 8,
                    background: "var(--sd-dark2)", border: "1px solid var(--sd-border)",
                    color: "white", fontSize: 14, outline: "none", resize: "none",
                    boxSizing: "border-box", fontFamily: "Open Sans",
                  }} />
                </div>
                <button className="btn-orange" style={{ padding: "16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 15, marginTop: 4 }}>
                  Отправить заявку
                </button>
                <p style={{ fontSize: 11, color: "#4b5563", textAlign: "center" }}>Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111111", borderTop: "1px solid var(--sd-border)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: "var(--sd-orange)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Cog" size={18} color="white" />
            </div>
            <span style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 18 }}>
              СУПЕР<span style={{ color: "var(--sd-orange)" }}>ДРОБ</span>
            </span>
          </div>
          <div style={{ color: "#4b5563", fontSize: 13, textAlign: "center" }}>
            © 2024 СуперДроб. Производство установок для переработки ПП
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {[["phone", "Tel"], ["mail", "Email"]].map(([icon, label]) => (
              <div key={label} style={{ width: 36, height: 36, borderRadius: 8, background: "var(--sd-gray)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Icon name={icon === "phone" ? "Phone" : "Mail"} size={16} color="#9ca3af" />
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .grid-mobile { grid-template-columns: 1fr !important; gap: 40px !important; }
          .grid-3-mobile { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}