import { useState, type ReactNode } from "react";
import "./App.css";
import rufo from "./assets/companions/rufo-habla.webp";
import rufoExplore from "./assets/companions/rufo-explora.webp";
import rufoCelebrate from "./assets/companions/rufo-celebra.webp";

type Tab = "Inicio" | "Bitácora" | "Mapa" | "Especies" | "Perfil";
type IconName =
  | "home"
  | "book"
  | "map"
  | "paw"
  | "user"
  | "bell"
  | "plus"
  | "arrow"
  | "pin"
  | "search"
  | "camera"
  | "leaf"
  | "flame"
  | "chevron";

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" />
        <path d="M4 5v16m4-14h8m-8 4h8" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
        <path d="M9 3v15m6-12v15" />
      </>
    ),
    paw: (
      <>
        <circle cx="7" cy="7" r="2" />
        <circle cx="17" cy="7" r="2" />
        <circle cx="4" cy="13" r="2" />
        <circle cx="20" cy="13" r="2" />
        <path d="M12 11c-2.7 0-6 5-4 7 1.1 1.1 2.3-.3 4-.3s2.9 1.4 4 .3c2-2-1.3-7-4-7z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 5 5" />
      </>
    ),
    camera: (
      <>
        <path d="M4 7h3l1.5-2h7L17 7h3v13H4z" />
        <circle cx="12" cy="13" r="4" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-7 10-16Z" />
        <path d="M4 21c2-5 6-8 11-11" />
      </>
    ),
    flame: (
      <>
        <path d="M12 22a7 7 0 0 0 7-7c0-3-2-5-4-7 0 3-1 4-2 4 0-5-3-9-5-10 1 5-4 7-4 13a8 8 0 0 0 8 7Z" />
        <path d="M12 22a4 4 0 0 0 4-4c0-2-2-4-3-5 0 2-1 3-2 3 0-2-1-3-2-4 0 3-1 3-1 6a4 4 0 0 0 4 4Z" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const tabs: { name: Tab; icon: IconName }[] = [
  { name: "Inicio", icon: "home" },
  { name: "Bitácora", icon: "book" },
  { name: "Mapa", icon: "map" },
  { name: "Especies", icon: "paw" },
  { name: "Perfil", icon: "user" },
];

function Button({
  children,
  secondary = false,
  onClick,
}: {
  children: ReactNode;
  secondary?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`action-button${secondary ? " secondary" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Home({ setTab }: { setTab: (tab: Tab) => void }) {
  return (
    <div className="page home-page">
      <header className="home-header">
        <div>
          <p className="eyebrow">MARTES, 17 DE NOVIEMBRE</p>
          <h1>¡Hola, Andre!</h1>
        </div>
        <button
          className="icon-button notification"
          aria-label="Notificaciones"
        >
          <Icon name="bell" />
          <i />
        </button>
      </header>
      <section className="companion-tip">
        <div className="mascot-avatar">
          <img src={rufo} alt="Rufo, tu compañero" />
        </div>
        <div className="speech">
          <p className="speech-label">Rufo te aconseja hoy</p>
          <p>¡Cada paseo guarda un descubrimiento! 🍃</p>
        </div>
      </section>
      <section className="mission-card">
        <div className="mission-info">
          <img src={rufoExplore} alt="" />
          <div>
            <p className="eyebrow">MISIÓN DE HOY · RUFO</p>
            <h2>Explora un nuevo rincón</h2>
            <p className="muted">Registra una especie durante tu paseo.</p>
          </div>
        </div>
        <Button secondary onClick={() => setTab("Bitácora")}>
          Ver misión <Icon name="arrow" size={18} />
        </Button>
      </section>
      <section className="progress-card">
        <div className="progress-head">
          <img src={rufoCelebrate} alt="" />
          <div className="progress-copy">
            <p className="eyebrow">TU PROGRESO</p>
            <h2>Nivel 3 · Explorador</h2>
            <div className="progress-track">
              <span />
            </div>
            <p className="muted small">72/100 puntos para el nivel 4</p>
          </div>
        </div>
        <div className="stats">
          <span>
            <Icon name="flame" size={19} /> 5 días de racha
          </span>
          <i />
          <span>📸 12 avistamientos</span>
          <i />
          <span>🌿 8 especies</span>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <h2>Curiosidad de la naturaleza</h2>
          <button className="text-link">Otra curiosidad</button>
        </div>
        <article className="curiosity-card">
          <div className="curiosity-art">
            <div className="sun" />
            <div className="hills hills-back" />
            <div className="hills hills-front" />
            <span className="bird">🐦</span>
            <span className="flower">🌼</span>
          </div>
          <div className="curiosity-copy">
            <p className="eyebrow green">🐦 AVE</p>
            <h3>El colibrí coliazul</h3>
            <p>
              Puede batir sus alas hasta 80 veces por segundo mientras se
              mantiene suspendido en el aire.
            </p>
            <button className="text-link" onClick={() => setTab("Especies")}>
              Descubrir más <Icon name="arrow" size={16} />
            </button>
          </div>
        </article>
      </section>
      <section className="section nearby-section">
        <div className="section-heading">
          <h2>Descubrimientos cerca de ti</h2>
          <button className="text-link" onClick={() => setTab("Mapa")}>
            Ver mapa
          </button>
        </div>
        <article className="nearby-card">
          <div className="nearby-photo">
            <span className="photo-emoji">🦋</span>
            <span className="photo-tag">HOY · 9:42 AM</span>
          </div>
          <div className="nearby-copy">
            <div>
              <h3>Mariposa morfo azul</h3>
              <p>
                <Icon name="pin" size={15} /> Parque de los Novios · 1.2 km
              </p>
            </div>
            <img src={rufoExplore} alt="" />
          </div>
        </article>
      </section>
      <Button onClick={() => setTab("Bitácora")}>
        <Icon name="plus" /> Nuevo avistamiento
      </Button>
    </div>
  );
}

const sightings = [
  {
    icon: "🦜",
    name: "Loro orejiamarillo",
    place: "Jardín Botánico · Bogotá",
    date: "Hoy · 10:24 AM",
    color: "mint",
    tag: "NUEVO",
  },
  {
    icon: "🦋",
    name: "Mariposa morfo azul",
    place: "Parque de los Novios · Bogotá",
    date: "Ayer · 4:18 PM",
    color: "blue",
    tag: "",
  },
  {
    icon: "🌺",
    name: "Heliconia roja",
    place: "Quebrada La Vieja · Bogotá",
    date: "15 nov · 8:52 AM",
    color: "peach",
    tag: "",
  },
];

function Journal() {
  const [community, setCommunity] = useState(false);
  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">TUS DESCUBRIMIENTOS</p>
          <h1>Bitácora</h1>
        </div>
        <button className="round-add" aria-label="Nuevo avistamiento">
          <Icon name="plus" />
        </button>
      </div>
      <div className="segmented">
        <button
          className={!community ? "selected" : ""}
          onClick={() => setCommunity(false)}
        >
          Mis avistamientos
        </button>
        <button
          className={community ? "selected" : ""}
          onClick={() => setCommunity(true)}
        >
          Comunidad
        </button>
      </div>
      <div className="journal-summary">
        <div className="summary-icon">🌱</div>
        <div>
          <strong>
            {community ? "Un mundo por descubrir" : "¡Vas por buen camino!"}
          </strong>
          <p>
            {community
              ? "Mira lo que encontraron otros exploradores."
              : "Ya registraste 12 momentos de naturaleza."}
          </p>
        </div>
      </div>
      <div className="list-label">
        {community ? "CERCA DE TI" : "RECIENTES"}
        <span>3 registros</span>
      </div>
      <div className="sighting-list">
        {sightings.map((s, i) => (
          <article className="sighting-row" key={s.name}>
            <div className={`sighting-thumb ${s.color}`}>
              <span>{s.icon}</span>
            </div>
            <div className="sighting-details">
              <div className="sighting-title">
                {s.name}
                {i === 0 && !community && (
                  <span className="new-pill">{s.tag}</span>
                )}
              </div>
              <p>
                <Icon name="pin" size={14} />
                {s.place}
              </p>
              <small>{s.date}</small>
            </div>
            <Icon name="chevron" size={18} />
          </article>
        ))}
      </div>
      <Button>
        <Icon name="plus" /> Nuevo avistamiento
      </Button>
    </div>
  );
}

function MapPage() {
  return (
    <div className="page map-page">
      <div className="page-title-row map-title">
        <div>
          <p className="eyebrow">EXPLORA TU ENTORNO</p>
          <h1>Mapa</h1>
        </div>
        <button className="icon-button">
          <Icon name="search" />
        </button>
      </div>
      <div className="map-canvas">
        <div className="map-land land-one" />
        <div className="map-land land-two" />
        <div className="map-water">
          <span>QUEBRADA LA VIEJA</span>
        </div>
        <div className="map-street street-one" />
        <div className="map-street street-two" />
        <div className="map-street street-three" />
        <div className="map-park park-one" />
        <div className="map-park park-two" />
        <span className="map-label label-park">Parque El Virrey</span>
        <span className="map-label label-city">CHAPINERO</span>
        <span className="map-marker marker-a">🦜</span>
        <span className="map-marker marker-b">🦋</span>
        <span className="map-marker marker-c">🌺</span>
        <span className="you-marker">
          <i />
        </span>
        <button className="map-locate">
          <Icon name="pin" />
        </button>
        <span className="map-scale">500 m</span>
      </div>
      <div className="map-bottom">
        <div>
          <span className="online-dot" />
          Explorando cerca de ti
        </div>
        <strong>
          8 avistamientos <Icon name="chevron" size={17} />
        </strong>
      </div>
      <section className="section map-near">
        <h2>Lo que vive por aquí</h2>
        <div className="species-chips">
          <span>
            🦜 Aves <b>12</b>
          </span>
          <span>
            🦋 Insectos <b>8</b>
          </span>
          <span>
            🌿 Plantas <b>6</b>
          </span>
        </div>
      </section>
    </div>
  );
}

const species = [
  {
    icon: "🦜",
    name: "Loro orejiamarillo",
    latin: "Ognorhynchus icterotis",
    type: "Aves",
    color: "mint",
  },
  {
    icon: "🦋",
    name: "Mariposa morfo azul",
    latin: "Morpho menelaus",
    type: "Insectos",
    color: "blue",
  },
  {
    icon: "🐸",
    name: "Rana de lluvia",
    latin: "Pristimantis bogotensis",
    type: "Anfibios",
    color: "lavender",
  },
  {
    icon: "🌺",
    name: "Heliconia roja",
    latin: "Heliconia bihai",
    type: "Plantas",
    color: "peach",
  },
];
function Species() {
  const [filter, setFilter] = useState("Todas");
  const filters = ["Todas", "Aves", "Plantas", "Insectos"];
  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">FAUNA Y FLORA LOCAL</p>
          <h1>Especies</h1>
        </div>
        <button className="icon-button">
          <Icon name="search" />
        </button>
      </div>
      <div className="species-intro">
        <span>🌿</span>
        <div>
          <strong>La naturaleza que te rodea</strong>
          <p>Conoce las especies de tu región.</p>
        </div>
      </div>
      <div className="filter-row">
        {filters.map((f) => (
          <button
            key={f}
            className={filter === f ? "filter-active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="species-list">
        {species
          .filter((s) => filter === "Todas" || s.type === filter)
          .map((s) => (
            <article className="species-card" key={s.name}>
              <div className={`species-art ${s.color}`}>
                <span>{s.icon}</span>
                <span className="favorite">♡</span>
              </div>
              <div className="species-info">
                <span className="species-type">{s.type}</span>
                <h3>{s.name}</h3>
                <p>{s.latin}</p>
                <span className="status">
                  <span /> Registrada cerca de ti
                </span>
              </div>
              <Icon name="chevron" size={17} />
            </article>
          ))}
      </div>
    </div>
  );
}

function Profile() {
  const [companion, setCompanion] = useState("Rufo");
  return (
    <div className="page profile-page">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">TU ESPACIO NATURAL</p>
          <h1>Perfil</h1>
        </div>
        <button className="icon-button">•••</button>
      </div>
      <section className="profile-hero">
        <div className="profile-avatar">
          <img src={rufo} alt="" />
        </div>
        <h2>Andre Rodríguez</h2>
        <p>Bogotá, Colombia · Explorador desde 2025</p>
        <button className="text-link">
          Editar perfil <Icon name="arrow" size={16} />
        </button>
      </section>
      <div className="profile-stats">
        <div>
          <strong>12</strong>
          <span>avistamientos</span>
        </div>
        <div>
          <strong>8</strong>
          <span>especies</span>
        </div>
        <div>
          <strong>5 🔥</strong>
          <span>días de racha</span>
        </div>
      </div>
      <section className="profile-section">
        <div className="section-heading">
          <h2>Tu compañero</h2>
          <button className="text-link">Cambiar</button>
        </div>
        <div className="companion-picker">
          {[
            ["Rufo", "🦊"],
            ["Iris", "🐦"],
            ["Bruno", "🐻"],
            ["Pepa", "🐸"],
          ].map(([name, emoji]) => (
            <button
              onClick={() => setCompanion(name)}
              className={companion === name ? "companion-selected" : ""}
              key={name}
            >
              <span>{emoji}</span>
              {name}
            </button>
          ))}
        </div>
        <p className="companion-caption">
          <strong>{companion}</strong> te acompaña en cada paseo y celebra cada
          nuevo descubrimiento.
        </p>
      </section>
      <div className="settings-list">
        <button>
          <span>🔔</span> Notificaciones <Icon name="chevron" size={18} />
        </button>
        <button>
          <span>🛡️</span> Privacidad y cuenta <Icon name="chevron" size={18} />
        </button>
        <button>
          <span>❔</span> Ayuda y ajustes <Icon name="chevron" size={18} />
        </button>
      </div>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState<Tab>("Inicio");
  return (
    <div className="app-shell">
      <main className="screen-content">
        {tab === "Inicio" ? (
          <Home setTab={setTab} />
        ) : tab === "Bitácora" ? (
          <Journal />
        ) : tab === "Mapa" ? (
          <MapPage />
        ) : tab === "Especies" ? (
          <Species />
        ) : (
          <Profile />
        )}
      </main>
      <nav className="bottom-nav" aria-label="Navegación principal">
        {tabs.map((item) => (
          <button
            key={item.name}
            className={tab === item.name ? "nav-active" : ""}
            onClick={() => setTab(item.name)}
          >
            <span className="nav-icon">
              <Icon name={item.icon} size={22} />
            </span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
