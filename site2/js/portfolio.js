// ============================================================================
// 01. LINK DELLE OPERE — modifica solo le stringhe vuote per attivare i player.
// Sono accettati link pubblici YouTube e SoundCloud, non codice HTML di embed.
// ============================================================================
const mediaLinks = {
  'work-01': '', // Forme di risonanza — YouTube
  'work-02': '', // Geografie del suono — SoundCloud
  'work-03': '', // Sistemi sensibili — YouTube
};

// ============================================================================
// 02. FILTRI — le categorie si trovano negli attributi data-category di works.html.
// ============================================================================
const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');
const resultCount = document.querySelector('#result-count');
filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((filter) =>
      filter.setAttribute('aria-pressed', String(filter === button)),
    );
    let count = 0;
    cards.forEach((card) => {
      card.hidden =
        button.dataset.filter !== 'all' &&
        card.dataset.category !== button.dataset.filter;
      if (!card.hidden) count++;
    });
    if (resultCount)
      resultCount.textContent = `${String(count).padStart(2, '0')} ${count === 1 ? 'PROGETTO' : 'PROGETTI'}`;
  });
});

// ============================================================================
// 03. PLAYER — nessun caricamento di servizi esterni senza un link configurato.
// ============================================================================
function getPlayer(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:') return null;
  const host = url.hostname.replace(/^www\./, '');
  if (host === 'soundcloud.com' && url.pathname.split('/').filter(Boolean).length >= 2) {
    return {
      provider: 'SoundCloud',
      src: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url.href)}&color=%23755292&auto_play=false`,
    };
  }
  let id;
  if (host === 'youtu.be') id = url.pathname.slice(1);
  if (['youtube.com', 'm.youtube.com'].includes(host)) {
    id =
      url.searchParams.get('v') ||
      url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1];
  }
  if (id && /^[\w-]{11}$/.test(id))
    return { provider: 'YouTube', src: `https://www.youtube-nocookie.com/embed/${id}` };
  return null;
}

document.querySelectorAll('[data-media]').forEach((slot) => {
  const value = mediaLinks[slot.dataset.media];
  if (!value) return;
  try {
    const player = getPlayer(value);
    if (!player) return;
    const iframe = document.createElement('iframe');
    iframe.src = player.src;
    iframe.title = `${document.querySelector('h1').textContent} — ${player.provider}`;
    iframe.loading = 'lazy';
    iframe.allow = 'encrypted-media; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    if (player.provider === 'SoundCloud') iframe.className = 'soundcloud';
    slot.replaceChildren(iframe);
    slot.classList.add('is-loaded');
  } catch {
    // Un link non valido lascia visibile il segnaposto.
  }
});
