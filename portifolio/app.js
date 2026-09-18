'use strict';

const tracks = {
  all: {
    name: 'Visão geral',
    title: 'Quatro perspectivas. Uma base sólida.',
    description: 'Experiência em ERP, análise de sistemas e Scrum, com foco atual em qualidade e automação. Explore as conexões que fazem sentido para o seu time.',
    skills: ['qa', 'systems', 'erp', 'product']
  },
  qa: {
    name: 'QA Automation',
    title: 'Qualidade que entende o negócio.',
    description: 'Python, PyTest e Playwright para automação, Postman para testes de API e SQL para investigação. O conhecimento funcional de ERP dá contexto à atuação em qualidade.',
    skills: ['qa', 'systems', 'erp']
  },
  systems: {
    name: 'Analista de Sistemas',
    title: 'Do problema de negócio à análise do sistema.',
    description: 'Mais de 17 anos em software, com suporte, implantação, requisitos e proximidade com desenvolvimento. Vivência em Desktop e Cloud, bancos SQL e documentação.',
    skills: ['systems', 'erp', 'qa']
  },
  erp: {
    name: 'ERP fiscal/contábil',
    title: 'Complexidade fiscal. Contexto de ponta a ponta.',
    description: 'Experiência em ERP fiscal e contábil, da implantação e suporte à sustentação fiscal e importação de NFS-e municipal. Uma base de domínio conectada à análise e à qualidade.',
    skills: ['erp', 'systems', 'qa']
  },
  product: {
    name: 'Product Owner',
    title: 'Uma direção de produto, com base em negócio.',
    description: 'Experiência como Scrum Master, análise de requisitos e conhecimento de ERP como base para a transição para Product Owner. A atuação em produto parte dessa trajetória; PO é o direcionamento de carreira.',
    skills: ['product', 'systems', 'erp']
  }
};

const cases = {
  quality: {
    category: '01 / QUALIDADE DE SOFTWARE',
    title: 'Qualidade com contexto de negócio.',
    intro: 'A experiência com sistemas de gestão e análise funcional se conecta à atuação mais recente em QA e automação de testes.',
    context: 'Vivência em aplicações Desktop e Cloud, com aprofundamento em Python, PyTest e Playwright e experiência em testes de API com Postman.',
    contributions: ['Atuação com QA e automação de testes usando Python, PyTest e Playwright.', 'Testes de API com Postman e uso de SQL na análise de dados e investigação de problemas.', 'Conhecimento de rotinas de ERP fiscal e contábil como contexto para compreender o comportamento esperado dos sistemas.'],
    connection: 'Aderência a QA Automation e Análise de Sistemas: combina repertório técnico e entendimento funcional, com proximidade entre qualidade e negócio.',
    tags: ['Python', 'PyTest', 'Playwright', 'Postman', 'SQL'],
    note: 'Este recorte descreve a experiência informada. Indicadores de cobertura, volume de testes e ganhos de desempenho ainda não estão documentados neste portfólio.'
  },
  fiscal: {
    category: '02 / ERP FISCAL & CONTÁBIL',
    title: 'A regra fiscal encontra o sistema.',
    intro: 'Atuação em sustentação fiscal e importação de NFS-e municipal no contexto de sistemas de gestão.',
    context: 'Na Questor Sistemas, o trabalho com rotinas fiscais e contábeis aproximou necessidades da operação, requisitos de negócio e análise de sistemas.',
    contributions: ['Atuação em sustentação fiscal e atividades relacionadas à importação de NFS-e municipal.', 'Análise de necessidades de negócio e colaboração com equipes de desenvolvimento.', 'Bagagem de suporte e implantação de ERP para compreender o contexto dos usuários.'],
    connection: 'Aderência a ERP e Análise de Sistemas. O conhecimento das necessidades de clientes e das regras fiscais também compõe a base de negócio para uma direção de produto.',
    tags: ['ERP', 'Fiscal', 'Contábil', 'NFS-e', 'Análise de sistemas'],
    note: 'Os nomes de municípios, detalhes de integrações e resultados quantitativos não foram informados e não são apresentados como evidências deste case.'
  },
  quiu: {
    category: '03 / AUTOMAÇÃO & PRODUTO',
    title: 'Automação próxima da operação.',
    intro: 'Vivência com o Quiu, produto de automação, e testes no seu contexto Cloud.',
    context: 'Experiência relacionada ao produto Quiu na Questor Sistemas, conectada ao repertório em ERP, análise e qualidade de software.',
    contributions: ['Atuação relacionada ao Quiu e ao seu contexto de automação de rotinas.', 'Trabalho com testes no contexto Cloud Quiu.', 'Conexão entre a vivência em ERP e o aprofundamento em qualidade de software.'],
    connection: 'Um ponto de encontro entre QA, Sistemas, ERP e visão de produto. A experiência é apresentada sem atribuir autoria integral ou responsabilidade por todo o produto.',
    tags: ['Quiu', 'Automação', 'Cloud', 'Qualidade', 'ERP'],
    note: 'Escopo técnico detalhado, arquitetura e resultados mensurados do projeto não foram disponibilizados para este portfólio.'
  },
  scrum: {
    category: '04 / AGILIDADE & COLABORAÇÃO',
    title: 'Pessoas, negócio e entrega.',
    intro: 'Atuação como Scrum Master e colaboração entre áreas para o desenvolvimento de software.',
    context: 'Na Questor Sistemas, a experiência em equipes ágeis incluiu atuação como Scrum Master. Em 2022, houve o reconhecimento Performei, relacionado a Scrum Master e entregas estratégicas.',
    contributions: ['Atuação como Scrum Master em equipes ágeis.', 'Colaboração com equipes de desenvolvimento e interlocução entre demandas de negócio e tecnologia.', 'Reconhecimento Performei em 2022.'],
    connection: 'Base para oportunidades que valorizam colaboração, análise de negócio e visão de produto. Product Owner é um direcionamento profissional, sem atribuição de experiência anterior no cargo.',
    tags: ['Scrum Master', 'Agile', 'Colaboração', 'Visão de produto'],
    note: 'O MBA em Gestão de Projetos e Metodologias Ágeis está em andamento, com TCC voltado ao apoio da IA generativa a equipes Scrum.'
  }
};

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const skillCards = [...document.querySelectorAll('[data-skill]')];
const caseCards = [...document.querySelectorAll('[data-case]')];
const skillGrid = document.querySelector('#skill-grid');
const title = document.querySelector('#fit-title');
const description = document.querySelector('#fit-description');
let selectedTrack = 'all';

function applyTrack(key, updateUrl = true, announce = true) {
  if (!Object.hasOwn(tracks, key)) key = 'all';
  const track = tracks[key];
  selectedTrack = key;
  filterButtons.forEach(button => {
    const active = button.dataset.filter === key;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  title.textContent = track.title;
  description.textContent = track.description;
  skillGrid.classList.toggle('filtered', key !== 'all');
  skillCards.forEach(card => {
    const skill = card.dataset.skill;
    card.dataset.related = String(track.skills.includes(skill));
    card.dataset.featured = String(skill === key);
    card.style.order = String(track.skills.indexOf(skill));
  });
  let count = 0;
  caseCards.forEach(card => {
    const matches = key === 'all' || card.dataset.tracks.split(' ').includes(key);
    card.hidden = !matches;
    if (matches) count++;
  });
  const shortcut = document.querySelector('#case-shortcut');
  shortcut.replaceChildren(document.createTextNode(`Ver os ${count} cases `));
  const arrow = document.createElement('span');
  arrow.textContent = '↓';
  arrow.setAttribute('aria-hidden', 'true');
  shortcut.append(arrow);
  document.querySelector('#case-count').textContent = key === 'all' ? `${count} experiências selecionadas` : `${count} cases relacionados`;
  document.querySelector('#case-filter-state').hidden = key === 'all';
  document.querySelector('#case-filter-label').textContent = `Perspectiva: ${track.name}`;
  if (announce) document.querySelector('#filter-status').textContent = `${track.name}: ${track.skills.length} áreas de competência e ${count} cases relacionados.`;
  if (updateUrl) {
    const url = new URL(location.href);
    if (key === 'all') url.searchParams.delete('foco');
    else url.searchParams.set('foco', key);
    history.replaceState(null, '', url);
  }
}

filterButtons.forEach(button => button.addEventListener('click', () => applyTrack(button.dataset.filter)));
document.querySelectorAll('[data-track]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.track;
  applyTrack(key);
  document.querySelector('#competencias').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  document.querySelector(`[data-filter="${key}"]`).focus({preventScroll: true});
}));
document.querySelector('#reset-filter').addEventListener('click', () => {
  applyTrack('all');
  document.querySelector('.case-open').focus({preventScroll: true});
});
applyTrack(new URL(location.href).searchParams.get('foco') || 'all', false, false);
window.addEventListener('popstate', () => applyTrack(new URL(location.href).searchParams.get('foco') || 'all', false));

const dialog = document.querySelector('#case-dialog');
let dialogTrigger = null;
function addBlock(container, heading, content, list = false) {
  const block = document.createElement('div');
  block.className = 'dialog-block';
  const h3 = document.createElement('h3');
  h3.textContent = heading;
  block.append(h3);
  const text = document.createElement(list ? 'ul' : 'p');
  if (list) content.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    text.append(li);
  });
  else text.textContent = content;
  block.append(text);
  container.append(block);
}
document.querySelectorAll('[data-detail]').forEach(button => button.addEventListener('click', () => {
  const entry = cases[button.dataset.detail];
  if (!entry) return;
  dialogTrigger = button;
  document.querySelector('#dialog-category').textContent = entry.category;
  document.querySelector('#dialog-title').textContent = entry.title;
  document.querySelector('#dialog-intro').textContent = entry.intro;
  const details = document.querySelector('#dialog-details');
  details.replaceChildren();
  const tags = document.createElement('div');
  tags.className = 'tags';
  entry.tags.forEach(tag => {
    const span = document.createElement('span');
    span.textContent = tag;
    tags.append(span);
  });
  details.append(tags);
  addBlock(details, 'Contexto', entry.context);
  addBlock(details, 'Minha atuação', entry.contributions, true);
  addBlock(details, 'Conexão com a oportunidade', entry.connection);
  const note = document.createElement('p');
  note.className = 'dialog-boundary';
  note.textContent = entry.note;
  details.append(note);
  document.body.style.overflow = 'hidden';
  dialog.showModal();
  dialog.scrollTop = 0;
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  if (dialogTrigger) dialogTrigger.focus({preventScroll: true});
});
document.querySelector('#dialog-contact').addEventListener('click', () => dialog.close());

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
}
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  mobileNav.hidden = expanded;
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});
matchMedia('(min-width: 681px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.desktop-nav a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-90px 0px -65% 0px', threshold: 0});
  links.forEach(link => {
    const element = document.querySelector(link.hash);
    if (element) observer.observe(element);
  });
}
