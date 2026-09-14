# Treasure Hunt Manager

Webapp per gestire dinamicamente una caccia al tesoro / escape room fai-da-te: percorsi, stanze, enigmi, oggetti e i collegamenti logici tra loro (es. lucchetto ↔ enigma che ne svela il codice).

## Come usarla

1. Apri `index.html` in un browser (funziona anche offline, nessun server richiesto).
2. Naviga tra le sezioni dal menu in alto:
   - **Dashboard**: riepilogo generale.
   - **Percorsi/Stanze/Enigmi/Oggetti**: crea, modifica ed elimina liberamente ogni elemento, con nomi e descrizioni editabili.
   - **Collegamenti**: crea relazioni tra un qualsiasi elemento e un altro (es. oggetto → enigma), con una nota opzionale (es. il codice risolutivo).
   - **Diagramma di Flusso**: visualizza la sequenza logica stanza → enigmi.
   - **Mappa Stanze**: vista d'insieme di ogni stanza con enigmi e oggetti contenuti.
3. Tutti i dati sono salvati automaticamente nel **localStorage** del browser (persistenza locale, nessun server necessario).
4. Usa **Esporta JSON** per fare un backup scaricabile, e **Importa JSON** per ripristinarlo o trasferirlo su un altro dispositivo/browser.

## Struttura del progetto

```
index.html
css/style.css
js/store.js         → gestione dati e persistenza (localStorage)
js/main.js           → router tra le viste
js/views/dashboard.js
js/views/editor.js   → CRUD percorsi, stanze, enigmi, oggetti
js/views/links.js    → gestione collegamenti tra elementi
js/views/flow.js     → diagramma di flusso
js/views/map.js      → mappa visiva delle stanze
```

Nessuna dipendenza esterna: solo HTML, CSS e JavaScript puro.
