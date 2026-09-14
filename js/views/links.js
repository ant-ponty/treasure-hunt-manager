function renderLinks(root) {
  root.innerHTML = `
    <div class="card">
      <h2>Collegamenti tra oggetti, enigmi e stanze</h2>
      <p>Es: collega un lucchetto (oggetto) all'enigma che ne rivela il codice.</p>
      <button class="btn-add" onclick="openLinkModal()">+ Nuovo Collegamento</button>
      <div id="list-links"></div>
    </div>
    <div id="modal-root"></div>
  `;
  refreshLinksList();
}

function entityLabel(type, id) {
  const collMap = { path: 'paths', room: 'rooms', puzzle: 'puzzles', object: 'objects' };
  const item = Store.getById(collMap[type], id);
  return item ? item.name : '(eliminato)';
}

function refreshLinksList() {
  const container = document.getElementById('list-links');
  const links = Store.getAll('links');
  container.innerHTML = links.map(l => `
    <div class="item-row">
      <span>🔗 <b>${entityLabel(l.fromType, l.fromId)}</b> (${l.fromType}) → <b>${entityLabel(l.toType, l.toId)}</b> (${l.toType}) ${l.note ? '<span class="tag">' + l.note + '</span>' : ''}</span>
      <span>
        <button class="small btn-delete" onclick="deleteLink('${l.id}')">Elimina</button>
      </span>
    </div>
  `).join('') || '<p>Nessun collegamento ancora.</p>';
}

function deleteLink(id) {
  Store.remove('links', id);
  refreshLinksList();
}

function openLinkModal() {
  const modalRoot = document.getElementById('modal-root');
  const types = [
    { value: 'path', label: 'Percorso', collection: 'paths' },
    { value: 'room', label: 'Stanza', collection: 'rooms' },
    { value: 'puzzle', label: 'Enigma', collection: 'puzzles' },
    { value: 'object', label: 'Oggetto', collection: 'objects' }
  ];

  function optionsFor(collection) {
    return Store.getAll(collection).map(i => `<option value="${i.id}">${i.name}</option>`).join('');
  }

  modalRoot.innerHTML = `
    <div class="modal-bg">
      <div class="modal">
        <h3>Nuovo Collegamento</h3>
        <form id="link-form">
          <label>Da (tipo)</label>
          <select id="from-type">${types.map(t => `<option value="${t.value}">${t.label}</option>`).join('')}</select>
          <label>Da (elemento)</label>
          <select id="from-id">${optionsFor('paths')}</select>

          <label>A (tipo)</label>
          <select id="to-type">${types.map(t => `<option value="${t.value}">${t.label}</option>`).join('')}</select>
          <label>A (elemento)</label>
          <select id="to-id">${optionsFor('paths')}</select>

          <label>Nota (opzionale)</label>
          <input id="link-note" type="text" placeholder="es. codice: 3-9-12">

          <div class="modal-actions">
            <button type="button" onclick="closeModal()">Annulla</button>
            <button type="submit" class="btn-add">Salva</button>
          </div>
        </form>
      </div>
    </div>
  `;

  function bindTypeChange(typeSelectId, idSelectId) {
    document.getElementById(typeSelectId).addEventListener('change', (e) => {
      const t = types.find(t => t.value === e.target.value);
      document.getElementById(idSelectId).innerHTML = optionsFor(t.collection);
    });
  }
  bindTypeChange('from-type', 'from-id');
  bindTypeChange('to-type', 'to-id');

  document.getElementById('link-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const link = {
      fromType: document.getElementById('from-type').value,
      fromId: document.getElementById('from-id').value,
      toType: document.getElementById('to-type').value,
      toId: document.getElementById('to-id').value,
      note: document.getElementById('link-note').value
    };
    Store.add('links', link);
    closeModal();
    refreshLinksList();
  });
}
