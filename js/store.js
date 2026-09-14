// Store centrale con persistenza in localStorage
const STORAGE_KEY = 'treasure-hunt-manager-data';

function uid() {
  return 'id-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

const defaultData = {
  paths: [],     // percorsi: {id, name, description, roomIds: []}
  rooms: [],     // stanze: {id, name, description, x, y}
  puzzles: [],   // enigmi: {id, name, description, roomId, solution}
  objects: [],   // oggetti: {id, name, description, roomId}
  links: []      // collegamenti: {id, fromType, fromId, toType, toId, note}
};

const Store = {
  data: null,

  load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        this.data = JSON.parse(raw);
      } catch (e) {
        console.error('Errore parsing dati salvati, reset.', e);
        this.data = structuredClone(defaultData);
      }
    } else {
      this.data = structuredClone(defaultData);
    }
    // Garantisce che tutte le chiavi esistano anche dopo aggiornamenti futuri
    for (const key of Object.keys(defaultData)) {
      if (!this.data[key]) this.data[key] = [];
    }
    return this.data;
  },

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  },

  exportJSON() {
    return JSON.stringify(this.data, null, 2);
  },

  importJSON(jsonString) {
    const parsed = JSON.parse(jsonString);
    this.data = parsed;
    this.save();
  },

  // ---- CRUD generico ----
  add(collection, item) {
    item.id = uid();
    this.data[collection].push(item);
    this.save();
    return item;
  },
  update(collection, id, patch) {
    const idx = this.data[collection].findIndex(i => i.id === id);
    if (idx >= 0) {
      this.data[collection][idx] = { ...this.data[collection][idx], ...patch };
      this.save();
    }
  },
  remove(collection, id) {
    this.data[collection] = this.data[collection].filter(i => i.id !== id);
    // rimuove anche i collegamenti che referenziano l'elemento cancellato
    this.data.links = this.data.links.filter(l => l.fromId !== id && l.toId !== id);
    this.save();
  },
  getAll(collection) {
    return this.data[collection];
  },
  getById(collection, id) {
    return this.data[collection].find(i => i.id === id);
  }
};

Store.load();
