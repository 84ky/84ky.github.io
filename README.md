# Site 2 — portfolio con barra laterale

Versione alternativa del sito personale di Michele Lorusso. È un sito statico:
non richiede build o dipendenze ed è compatibile con GitHub Pages nel percorso
`/site2/`.

## Struttura

- `index.html` — **About**. Qui va il ritratto, accanto al testo sulla ricerca.
- `works.html` — cinque template: Audio, Audiovideo, Solo video, Installazione e
  GitHub project.
- `events.html` — template per performance, mostre, installazioni e talk.
- `blog.html` — template per articoli su fatti artistici.

La barra laterale è condivisa dalle quattro pagine. Il fondo della colonna
contiene prima le icone per email e Instagram, poi `Bari, Italy` e il copyright.
Su mobile la stessa colonna diventa una barra superiore compatta.

Il selettore fisso in basso a destra offre i temi **Scuro** e **Bianco**. La
scelta è salvata nel browser e viene mantenuta passando tra le pagine.

## Modifiche frequenti

| Cosa vuoi cambiare          | Dove                                                |
| --------------------------- | --------------------------------------------------- |
| Descrizione della ricerca   | `index.html`, sezione `Research statement`          |
| Foto                        | `index.html`, blocco commentato `FOTO`              |
| Lavori                      | `works.html`, un blocco `article` per ogni template |
| Evento                      | `events.html`, duplica `article class="event-card"` |
| Articolo                    | `blog.html`, duplica `article class="post-card"`    |
| Email e Instagram           | Le icone `social-links` in ciascuna pagina          |
| Colori, layout e responsive | `css/style.css`, sezioni numerate                   |
| Filtri dei lavori           | `js/portfolio.js`                                   |
| Tema e selettore            | `js/theme.js` e `css/style.css`                     |

I font sono **JetBrains Mono** e **Space Mono**, gli stessi usati nel sito
principale del repository. Tutti i titoli, i dettagli e le immagini dei lavori
sono segnaposto da sostituire con contenuti reali.

## Anteprima locale

Dalla cartella principale del repository:

```sh
python3 -m http.server 8000
```

Apri `http://localhost:8000/site2/`.
