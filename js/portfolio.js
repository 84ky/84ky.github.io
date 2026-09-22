// FILTRI DEL PORTFOLIO — le categorie sono negli attributi data-category di works.html.
const filters = document.querySelectorAll('[data-filter]');
const works = document.querySelectorAll('[data-category]');
const workList = document.querySelector('.work-list');

// ORDINE CRONOLOGICO — data-date usa il formato YYYY-MM-DD. Le schede senza
// data restano in fondo, nell'ordine in cui compaiono nel codice.
if (workList) {
  [...works]
    .sort((first, second) => {
      const firstDate = Date.parse(first.dataset.date || '') || 0;
      const secondDate = Date.parse(second.dataset.date || '') || 0;

      return secondDate - firstDate;
    })
    .forEach((work, index) => {
      workList.append(work);
      work.querySelector('.template-index').textContent = String(index + 1).padStart(
        2,
        '0',
      );
    });
}

// DESCRIZIONI LUNGHE — il testo si espande solo quando viene richiesto.
document.querySelectorAll('.description-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const description = button.previousElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    description.classList.toggle('is-expanded', !isExpanded);
    button.setAttribute('aria-expanded', String(!isExpanded));
    button.textContent = isExpanded ? 'Leggi tutto' : 'Mostra meno';
  });
});

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
  const work = button.closest('.work-template');
  const preview = work?.querySelector('.template-visual');
  const metadataRow = button.closest('dl > div');

  if (!preview || !metadataRow) return;

  const actions = document.createElement('div');
  actions.className = 'media-actions';
  actions.append(button);
  preview.append(actions);
  metadataRow.remove();

  button.addEventListener('click', () => {
    if (preview.querySelector('iframe')) return;

    const player = document.createElement('iframe');
    player.src = button.dataset.embedUrl;
    player.title = button.dataset.mediaTitle;
    player.allow = 'autoplay; encrypted-media; picture-in-picture';
    player.allowFullscreen = true;

    if (button.dataset.mediaProvider === 'soundcloud') {
      preview.append(player);
      preview.classList.add('has-soundcloud-player');
      actions.hidden = true;
    } else {
      preview.replaceChildren(player);
    }

    preview.classList.add('has-player');
  });
});
