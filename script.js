// Inserisci i link pubblici dei tuoi lavori tra le virgolette.
// SoundCloud: https://soundcloud.com/artista/brano
// YouTube: https://www.youtube.com/watch?v=VIDEO_ID oppure https://youtu.be/VIDEO_ID
const portfolioEmbeds = {
  'work-1': '',
  'work-2': '',
  'work-3': '',
};

function embedSource(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:') return null;
  const host = url.hostname.replace(/^www\./, '');
  if (host === 'soundcloud.com' && url.pathname.split('/').filter(Boolean).length >= 2) {
    return { src: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url.href)}&color=%23dfc9ff&auto_play=false`, provider: 'SoundCloud' };
  }
  let id;
  if (host === 'youtu.be') id = url.pathname.slice(1);
  if (host === 'youtube.com' || host === 'm.youtube.com') {
    id = url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1];
  }
  if (id && /^[\w-]{11}$/.test(id)) return { src: `https://www.youtube-nocookie.com/embed/${id}`, provider: 'YouTube' };
  return null;
}

document.querySelectorAll('[data-embed]').forEach(slot => {
  const value = portfolioEmbeds[slot.dataset.embed];
  if (!value) return;
  try {
    const embed = embedSource(value);
    if (!embed) return;
    const frame = document.createElement('iframe');
    frame.src = embed.src;
    frame.title = `${embed.provider} — ${slot.closest('article').querySelector('h2').textContent}`;
    frame.loading = 'lazy';
    frame.allow = 'encrypted-media; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    frame.classList.toggle('soundcloud', embed.provider === 'SoundCloud');
    slot.replaceChildren(frame);
    slot.classList.add('has-embed');
  } catch { /* I link non validi mantengono il placeholder. */ }
});

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
  });
});

const themePicker = document.querySelector('#theme-select');
if (themePicker) {
  themePicker.value = document.documentElement.dataset.theme || 'dark';
  themePicker.addEventListener('change', () => {
    const theme = themePicker.value;
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Scelta valida per la pagina corrente. */ }
  });
}
