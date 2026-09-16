// FILTRI DEL PORTFOLIO — le categorie sono negli attributi data-category di works.html.
const filters = document.querySelectorAll('[data-filter]');
const works = document.querySelectorAll('[data-category]');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((filter) =>
      filter.setAttribute('aria-pressed', String(filter === button)),
    );
    works.forEach((work) => {
      work.hidden =
        button.dataset.filter !== 'all' &&
        work.dataset.category !== button.dataset.filter;
    });
  });
});

// PLAYER ON DEMAND — l'iframe viene creato soltanto al clic sul pulsante.
document.querySelectorAll('.media-trigger').forEach((button) => {
  button.addEventListener('click', () => {
    const work = button.closest('.work-template');
    const preview = work?.querySelector('.template-visual');

    if (!preview || preview.querySelector('iframe')) return;

    const player = document.createElement('iframe');
    player.src = button.dataset.embedUrl;
    player.title = button.dataset.mediaTitle;
    player.loading = 'lazy';
    player.allow = 'autoplay; encrypted-media; picture-in-picture';
    player.allowFullscreen = true;

    preview.replaceChildren(player);
    preview.classList.add('has-player');
    button.textContent = 'Player aperto';
    button.disabled = true;
  });
});
