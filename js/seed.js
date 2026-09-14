// Dati precaricati: escape room "Missione Agenti Speciali"
// Creata per Miriam (12) e Laura (9) - tema avventuroso/investigativo con animali
// Corridoio di casa: ogni porta chiusa = una stanza. Nessuna tecnologia richiesta.
// Questo file popola l'app SOLO se non esistono già dati salvati in localStorage,
// così non sovrascrive mai eventuali modifiche già fatte.

(function () {
  var STORAGE_KEY = 'treasureHuntData';

  function alreadyHasData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      var data = JSON.parse(raw);
      if (!data) return false;
      var keys = ['paths', 'rooms', 'puzzles', 'items'];
      return keys.some(function (k) {
        return Array.isArray(data[k]) && data[k].length > 0;
      });
    } catch (e) {
      return false;
    }
  }

  function uid(prefix) {
    return prefix + '-' + Math.random().toString(36).slice(2, 9);
  }

  function buildSeedData() {
    // Percorso unico condiviso da entrambe le agenti
    var pathId = uid('path');
    var paths = [
      {
        id: pathId,
        name: 'Missione Agenti Speciali',
        description: 'Percorso cooperativo condiviso per le agenti Miriam e Laura. Le due sorelle collaborano, con lo stesso livello di difficolta, per arrivare insieme al premio finale nascosto nell\'ultima stanza.'
      }
    ];

    // Stanze: il corridoio di casa, ogni porta chiusa e una stanza
    var room1 = uid('room');
    var room2 = uid('room');
    var room3 = uid('room');
    var room4 = uid('room');

    var rooms = [
      {
        id: room1,
        name: 'Quartier Generale',
        description: 'Stanza di partenza della missione. Qui le agenti ricevono le prime istruzioni segrete.',
        pathId: pathId,
        order: 1
      },
      {
        id: room2,
        name: 'Laboratorio Segreto',
        description: 'Seconda porta del corridoio: qui si trovano gli indizi matematici per proseguire.',
        pathId: pathId,
        order: 2
      },
      {
        id: room3,
        name: 'Archivio Misterioso',
        description: 'Terza porta del corridoio: contiene indizi legati al tempo e agli orologi.',
        pathId: pathId,
        order: 3
      },
      {
        id: room4,
        name: 'Camera del Tesoro',
        description: 'Ultima porta del corridoio: qui e nascosto il premio finale della missione.',
        pathId: pathId,
        order: 4
      }
    ];

    // Enigmi
    var puzzle1 = uid('puzzle');
    var puzzle2 = uid('puzzle');
    var puzzle3 = uid('puzzle');

    var puzzles = [
      {
        id: puzzle1,
        name: 'Calcolo in codice',
        description: 'Risolvere una serie di moltiplicazioni e divisioni: il risultato finale e la combinazione del Lucchetto A.',
        roomId: room2
      },
      {
        id: puzzle2,
        name: 'L\'ora degli agenti',
        description: 'Leggere correttamente alcuni orari su un orologio analogico disegnato: le cifre lette in ordine formano il codice del Lucchetto B.',
        roomId: room3
      },
      {
        id: puzzle3,
        name: 'Il bigliettino cifrato',
        description: 'Un bigliettino nascosto rivela, con un piccolo indovinello, la combinazione della Scatola dei Segreti.',
        roomId: room3
      }
    ];

    // Oggetti fisici
    var item1 = uid('item'); // Lucchetto A
    var item2 = uid('item'); // Lucchetto B
    var item3 = uid('item'); // Bigliettino indizio
    var item4 = uid('item'); // Scatola dei segreti
    var item5 = uid('item'); // Chiave
    var item6 = uid('item'); // Premio finale

    var items = [
      {
        id: item1,
        name: 'Lucchetto A (numerico)',
        description: 'Lucchetto a combinazione numerica collegato all\'enigma "Calcolo in codice".',
        roomId: room2
      },
      {
        id: item2,
        name: 'Lucchetto B (numerico)',
        description: 'Lucchetto a combinazione numerica collegato all\'enigma "L\'ora degli agenti".',
        roomId: room3
      },
      {
        id: item3,
        name: 'Bigliettino indizio',
        description: 'Piccolo bigliettino con un indovinello che porta alla combinazione della Scatola dei Segreti.',
        roomId: room3
      },
      {
        id: item4,
        name: 'Scatola dei Segreti',
        description: 'Scatola chiusa con combinazione, svelata dal bigliettino indizio. Contiene la chiave finale.',
        roomId: room3
      },
      {
        id: item5,
        name: 'Chiave della Camera del Tesoro',
        description: 'Chiave che apre l\'ultima porta del corridoio, la Camera del Tesoro.',
        roomId: room3
      },
      {
        id: item6,
        name: 'Premio finale',
        description: 'Il tesoro nascosto che conclude la missione delle due agenti speciali.',
        roomId: room4
      }
    ];

    // Collegamenti tra oggetti/enigmi (es. lucchetto <-> enigma del suo codice)
    var links = [
      {
        id: uid('link'),
        fromType: 'puzzle', fromId: puzzle1,
        toType: 'item', toId: item1,
        label: 'Il risultato del calcolo apre questo lucchetto'
      },
      {
        id: uid('link'),
        fromType: 'puzzle', fromId: puzzle2,
        toType: 'item', toId: item2,
        label: 'Gli orari letti correttamente aprono questo lucchetto'
      },
      {
        id: uid('link'),
        fromType: 'puzzle', fromId: puzzle3,
        toType: 'item', toId: item4,
        label: 'Il bigliettino svela la combinazione della scatola'
      },
      {
        id: uid('link'),
        fromType: 'item', fromId: item4,
        toType: 'item', toId: item5,
        label: 'La scatola, una volta apera, contiene la chiave'
      },
      {
        id: uid('link'),
        fromType: 'item', fromId: item5,
        toType: 'room', toId: room4,
        label: 'La chiave apre la porta della Camera del Tesoro'
      },
      {
        id: uid('link'),
        fromType: 'item', fromId: item1,
        toType: 'room', toId: room3,
        label: 'Aperto il Lucchetto A si passa alla stanza successiva'
      },
      {
        id: uid('link'),
        fromType: 'item', fromId: item2,
        toType: 'room', toId: room3,
        label: 'Aperto il Lucchetto B si sbloccano gli indizi successivi'
      }
    ];

    return {
      paths: paths,
      rooms: rooms,
      puzzles: puzzles,
      items: items,
      links: links
    };
  }

  function seedIfEmpty() {
    if (alreadyHasData()) {
      return;
    }
    var data = buildSeedData();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log('Escape room "Missione Agenti Speciali" precaricata con successo.');
    } catch (e) {
      console.error('Errore durante il precaricamento della escape room:', e);
    }
  }

  seedIfEmpty();
})();
