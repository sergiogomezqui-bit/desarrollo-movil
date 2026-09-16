/**
 * Para agregar una entrega nueva (Challenge, práctica, parcial...) se agrega
 * un objeto aquí abajo, en ENTREGAS. No hay que tocar nada más.
 *
 *   tipo         'Challenge' | 'Práctica' | 'Parcial'
 *   numero       texto corto para el circulito, ej: '1', 'P1'
 *   titulo       nombre exacto de la entrega, ej: 'Challenge 5'
 *   resumen      1-2 frases simples de qué hace
 *   tecnologias  claves de TECNOLOGIAS usadas
 *   rama         nombre de la rama en GitHub
 *   demo         true si esa rama tiene demo desplegada
 */

const REPO_NOMBRE = 'desarrollo-movil'
const REPO_URL = 'https://github.com/sergiogomezqui-bit/desarrollo-movil'
const SITE = 'portafoliodesarrollomovil.netlify.app'

const ENTREGAS = [
  {
    tipo: 'Challenge',
    numero: '1',
    titulo: 'Challenge 1',
    resumen: 'Una agenda de contactos: agregar, listar y eliminar.',
    tecnologias: ['react'],
    rama: 'challenge-1',
    demo: true,
  },
  {
    tipo: 'Challenge',
    numero: '2',
    titulo: 'Challenge 2',
    resumen: 'La misma agenda, pero instalable como app (PWA).',
    tecnologias: ['react', 'pwa'],
    rama: 'challenge-2',
    demo: true,
  },
  {
    tipo: 'Challenge',
    numero: '3',
    titulo: 'Challenge 3',
    resumen: 'Lista de tareas: agregar, marcar como hecha y borrar.',
    tecnologias: ['ionic'],
    rama: 'challenge-3',
    demo: true,
  },
  {
    tipo: 'Challenge',
    numero: '4',
    titulo: 'Challenge 4',
    resumen: 'Login que recuerda la sesión hasta que uno cierra sesión.',
    tecnologias: ['ionic', 'storage'],
    rama: 'challenge-4',
    demo: true,
  },
  {
    tipo: 'Parcial',
    numero: 'P1',
    titulo: 'Parcial',
    resumen: 'Dos apps para una clínica: registro de pacientes y visitas médicas.',
    tecnologias: ['react', 'ionic', 'storage'],
    rama: 'parcial-1-sergio-gomez',
    demo: true,
  },
]

const TECNOLOGIAS = {
  react: { nombre: 'React', texto: 'Para armar las pantallas.' },
  ionic: { nombre: 'Ionic', texto: 'Componentes con look de app móvil.' },
  pwa: { nombre: 'PWA', texto: 'Se puede instalar como app.' },
  storage: { nombre: 'localStorage', texto: 'Guarda datos en el navegador.' },
}

function demoUrl(rama) {
  return `https://${rama}--${SITE}`
}

function branchUrl(rama) {
  return `${REPO_URL}/tree/${rama}`
}

function renderTechGrid() {
  const grid = document.getElementById('techGrid')
  if (!grid) return

  Object.values(TECNOLOGIAS).forEach((tech) => {
    const li = document.createElement('li')
    li.className = 'tech-card'
    li.innerHTML = `
      <h3>${tech.nombre}</h3>
      <p>${tech.texto}</p>
    `
    grid.appendChild(li)
  })
}

function renderFilters() {
  const row = document.getElementById('filterRow')
  if (!row) return

  const tipos = ['Todas', ...new Set(ENTREGAS.map((e) => e.tipo))]

  tipos.forEach((tipo, i) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'filter-chip' + (i === 0 ? ' active' : '')
    btn.textContent = tipo
    btn.addEventListener('click', () => {
      row.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'))
      btn.classList.add('active')
      applyFilter(tipo)
    })
    row.appendChild(btn)
  })
}

function applyFilter(tipo) {
  document.querySelectorAll('#timeline .card').forEach((card) => {
    const show = tipo === 'Todas' || card.dataset.tipo === tipo
    card.style.display = show ? '' : 'none'
  })
}

function renderCard(entrega) {
  const li = document.createElement('li')
  li.className = 'card reveal'
  li.dataset.tipo = entrega.tipo

  const demoBtn = entrega.demo
    ? `<a class="btn btn-primary" href="${demoUrl(entrega.rama)}" target="_blank" rel="noopener">Demo</a>`
    : ''

  const techTags = entrega.tecnologias.map((key) => `<span class="tag">${TECNOLOGIAS[key]?.nombre ?? key}</span>`).join('')

  li.innerHTML = `
    <div class="card-marker"><span>${entrega.numero}</span></div>
    <div class="card-body">
      <div class="card-top">
        <h3>${entrega.titulo}</h3>
        <span class="type-pill">${entrega.tipo}</span>
      </div>
      <p class="card-desc">${entrega.resumen}</p>
      <div class="tag-row">${techTags}</div>
      <dl class="meta-row">
        <div><dt>Repo</dt><dd>${REPO_NOMBRE}</dd></div>
        <div><dt>Rama</dt><dd>${entrega.rama}</dd></div>
      </dl>
      <div class="card-actions">
        <a class="btn btn-ghost" href="${branchUrl(entrega.rama)}" target="_blank" rel="noopener">Ver entrega</a>
        ${demoBtn}
      </div>
    </div>
  `

  return li
}

function renderTimeline() {
  const timeline = document.getElementById('timeline')
  if (!timeline) return
  ENTREGAS.forEach((entrega) => timeline.appendChild(renderCard(entrega)))
}

function renderStats() {
  const statEntregas = document.getElementById('statEntregas')
  const statRamas = document.getElementById('statRamas')
  if (statEntregas) statEntregas.textContent = ENTREGAS.length
  if (statRamas) statRamas.textContent = ENTREGAS.length + 1 // + main
}

function setupMobileNav() {
  const toggle = document.getElementById('navToggle')
  const links = document.getElementById('navLinks')
  if (!toggle || !links) return

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open')
    toggle.classList.toggle('open', isOpen)
    toggle.setAttribute('aria-expanded', String(isOpen))
  })

  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('open')
      toggle.classList.remove('open')
      toggle.setAttribute('aria-expanded', 'false')
    }),
  )
}

function setupScrollReveal() {
  const items = document.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach((el) => el.classList.add('visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 },
  )

  items.forEach((el) => observer.observe(el))
}

function setupStickyNavShadow() {
  const nav = document.getElementById('topnav')
  if (!nav) return
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

renderTechGrid()
renderFilters()
renderTimeline()
renderStats()
setupMobileNav()
setupStickyNavShadow()
setupScrollReveal()
