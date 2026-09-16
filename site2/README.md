# Site 2 — Michele Lorusso

Alternativa editoriale al primo sito. Tutto è contenuto in questa cartella:
HTML statico, CSS, JavaScript e visual SVG locali. Nessuna build e nessuna dipendenza.
Compatibile con GitHub Pages anche nel percorso `/site2/`.

## Pagine

- `index.html`: introduzione, lavoro in evidenza e selezione del portfolio.
- `works.html`: archivio filtrabile.
- `project-01.html`, `project-02.html`, `project-03.html`: schede dedicate con visual, contesto, dati e player.
- `commissions.html`: attività professionali e spazio per case study.
- `research.html`: paper, poster, talk e codice.
- `bio.html`: biografia e contatti.

## Modifiche frequenti

| Contenuto                      | File                                                           |
| ------------------------------ | -------------------------------------------------------------- |
| Testi e titoli                 | HTML della pagina corrispondente                               |
| Link SoundCloud / YouTube      | `js/portfolio.js`, oggetto `mediaLinks`                        |
| Colori, spaziature e caratteri | `css/style.css`, sezioni commentate                            |
| Visual dei progetti            | `assets/field.svg`, `assets/waves.svg`, `assets/particles.svg` |
| Email, social e CV             | `bio.html`                                                     |
| Navigazione e footer           | Blocchi commentati in ogni pagina HTML                         |

Per aggiungere un lavoro: duplicare una scheda in `works.html` e una pagina
`project-XX.html`; aggiornare titolo, copertina, categoria, metadati, link successivo
e ID `data-media`. Aggiungere lo stesso ID a `mediaLinks`, aggiornando i conteggi.
I player partono senza autoplay. I contatti sono segnaposto non cliccabili finché
non vengono forniti i recapiti reali.

I tre titoli e le tre immagini sono **demo**, non lavori realmente attribuiti
all’artista. Le immagini sono studi vettoriali originali creati per il layout;
non sono state copiate opere degli artisti di riferimento. Prima della pubblicazione
sostituire anche biografia, crediti e documenti mancanti.

## Anteprima

Dalla cartella principale del repository:

```sh
python3 -m http.server 8000
```

Aprire `http://localhost:8000/site2/`.

Per formattare, dalla cartella principale (Node.js necessario solo per il formatter):

```sh
npx --yes prettier@3.6.2 --write 'site2/*.html' 'site2/css/*.css' 'site2/js/*.js' 'site2/*.md'
```

## Riferimenti e scelte progettuali

Consultati il 16 settembre 2026:

- [Max Cooper — Home](https://maxcooper.net/): navigazione persistente, progetti con immagini e brevi introduzioni; distinzione tra opere, biografia, eventi e journal.
- [Ryoji Ikeda — Works](https://www.ryojiikeda.com/archive/works/): archivio con formato, anno, materiali, dimensioni e crediti.
- [Ryoichi Kurokawa — Projects](https://www.ryoichikurokawa.com/project.html): opere separate dalle informazioni biografiche e dai contatti.

Interpretazione applicata: dare priorità alle opere, offrire una pagina per ciascun
progetto e rendere facilmente consultabili ruolo, formato e crediti. La Home è una
selezione, non l’intero archivio. Commissioni e ricerca hanno spazi autonomi.

La direzione grafica è autonoma: apertura scura con un visual generativo, pagine
color carta, titoli sans-serif, corsivo editoriale e lilla discreto. La scelta di
non avviare audio automaticamente, i layout responsive e i controlli da tastiera
sono accorgimenti adottati per fruibilità e accessibilità, non caratteristiche
che si presume abbiano tutti i siti consultati.
