# Michele Lorusso — sito personale

Sito statico, compatibile con GitHub Pages, senza build o dipendenze.

## Pagine

- `index.html`: Home, introduzione provvisoria.
- `works.html`: portfolio con filtri Audio / Audiovisivi.
- `commissions.html`: mix audio, composizioni e visual su commissione.
- `research.html`: paper, poster, talk e progetti GitHub di ricerca.
- `bio.html`: biografia e contatti.

I contenuti indicati come placeholder vanno sostituiti con informazioni reali. I contatti non sono ancora link attivi.

## Inserire SoundCloud e YouTube

In `script.js`, aggiungere i link pubblici nell'oggetto `portfolioEmbeds` (`work-1`, `work-2`, `work-3`). Sono supportati link SoundCloud ai brani e link YouTube watch, youtu.be, shorts o embed. Il player sostituisce automaticamente il placeholder corrispondente. Nessun player esterno viene caricato finché i link sono vuoti. Aggiornare titoli, descrizioni, provider e categorie in `works.html` insieme ai link.

Per aggiungere un lavoro, duplicare un `article` di Works, assegnare un nuovo identificatore `data-embed` e aggiungerlo a `portfolioEmbeds`. Aggiornare i conteggi dei filtri.

## Anteprima locale

Eseguire `python3 -m http.server 8000` nella cartella del progetto e aprire http://localhost:8000.

Lo stile condiviso è in `style.css`. La navigazione è presente in tutti e cinque i file HTML: aggiornarli insieme se cambiano le voci.

## Temi

Il selettore nella barra superiore offre Nero / lilla (predefinito), Bianco / lilla e Super Mario / NES. La preferenza viene salvata nel browser e applicata a tutte le pagine. `theme.js` ripristina la scelta prima del caricamento dello stile; `script.js` gestisce il selettore. Se lo storage non è disponibile, il cambio funziona sulla pagina corrente. I colori e gli elementi decorativi dei temi sono in fondo a `style.css`. I player esterni mantengono l’aspetto del rispettivo provider.
