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

## Guida rapida alle modifiche

| Cosa vuoi cambiare                 | Dove intervenire                                                         |
| ---------------------------------- | ------------------------------------------------------------------------ |
| Testi, titoli e descrizioni        | Nel file HTML della pagina, sotto `CONTENUTO DELLA PAGINA`               |
| Opere del portfolio                | In `works.html`, una scheda per ogni blocco `<article>`                  |
| Link dei player                    | In `script.js`, sezione `CONTENUTI MODIFICABILI`                         |
| Colori del tema predefinito        | In `style.css`, sezione `01. COLORI PREDEFINITI`                         |
| Colori degli altri temi            | In `style.css`, sezioni `16. TEMA CHIARO` e `18. TEMA SUPER MARIO / NES` |
| Spaziature, caratteri e dimensioni | Nella sezione numerata del componente in `style.css`                     |
| Regole per tablet e telefoni       | Nelle sezioni responsive `15` e `19` di `style.css`                      |
| Menu e selettore                   | Nel blocco `BARRA SUPERIORE` di tutti i file HTML                        |

### Formattazione

I file usano due spazi per ogni livello di indentazione. `.editorconfig` fornisce
queste impostazioni agli editor compatibili e `.prettierrc.json` configura Prettier.
Per riordinare automaticamente il codice dopo le modifiche, con Node.js installato:

```sh
npx --yes prettier@3.6.2 --write '*.html' '*.css' '*.js' README.md .prettierrc.json
```

Il comando scarica il formatter se necessario; il sito continua a funzionare senza
Node.js e senza compilazione. Il blocco ASCII nella Home è escluso dalla
formattazione automatica: i suoi spazi fanno parte del disegno.

### Animazione sopra il footer NES

`nes-footer.js` disegna Mario e un Goomba in pixel art su una scena trasparente
prima del footer. Il bordo superiore dei mattoni del footer fa da pavimento. In testa al file trovi la
palette e le matrici dei personaggi; nella funzione `draw()` puoi cambiare velocità,
percorso e altezza dei salti. Il contenitore è nella sezione `20` di `style.css`.
La scena compare solo nel tema NES e si ferma quando non è visibile. Il pulsante
permette di metterla in pausa; con la preferenza di sistema per il movimento ridotto
parte ferma e può essere avviata manualmente.
