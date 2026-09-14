function renderEditor(root) {
  root.innerHTML = `
    <div class="card">
      <h2>Percorsi</h2>
      <button class="btn-add" onclick="openEditModal('paths')">+ Aggiungi Percorso</button>
      <div id="list-paths"></div>
    </div>
    <div class="card">
      <h2>Stanze</h2>
      <button class="btn-add" onclick="openEditModal('rooms')">+ Aggiungi Stanza</button>
      <div id="list-rooms"></div>
    </div>
    <div class="card">
      <h2>Enigmi</h2>
      <button class="btn-add" onclick="openEditModal('puzzles')">+ Aggiungi Enigma</button>
      <div id="list-puzzles"></div>
    </div>
    <div class="card">
      <h2>Oggetti</h2>
      <button class="btn-add" onclick="openEditModal('objects')">+ Aggiungi Oggetto</button>
      <div id="list-objects"></div>
    </div>
    <div id="modal-root"></div>
  `;
  refreshEditorLists();
}

function refreshEditorLists() {
  renderList('paths', 'list-paths');
  renderList('rooms', 'list-rooms');
  renderList('puzzles', 'list-puzzles');
  renderList('objects', 'list-objects');
}

function renderList(collection, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const items = Store.getAll(collection);
  container.innerHTML = items.map(item => `
    <div class="item-row">
      <span>${item.name}${item.roomId ? ' <span class="tag">' + (Store.getById('rooms', item.roomId)?.name || '') + '</span>' : ''}</span>
      <span>
        <button class="small btn-edit" onclick="openEditModal('${collection}', '${item.id}')">Modifica</button>
        <button class="small btn-delete" onclick="deleteItem('${collection}', '${item.id}')">Elimina</button>
      </span>
    </div>
  `).join('') || '<p>Nessun elemento.</p>';
}

function deleteItem(collection, id) {
  if (confirm('Confermi eliminazione?')) {
    Store.remove(collection, id);
    refreshEditorLists();
  }
}

const fieldsByCollection = {
  paths: [
    { key: 'name', label: 'Nome percorso', type: 'text' },
    { key: 'description', label: 'Descrizione', type: 'textarea' }
  ],
  rooms: [
    { key: 'name', label: 'Nome stanza', type: 'text' },
    { key: 'description', label: 'Descrizione', type: 'textarea' },
    { key: 'x', label: 'Posizione X (mappa)', type: 'number' },
    { key: 'y', label: 'Posizione Y (mappa)', type: 'number' }
  ],
  puzzles: [
    { key: 'name', label: 'Nome enigma', type: 'text' },
    { key: 'description', label: 'Descrizione', type: 'textarea' },
    { key: 'solution', label: 'Soluzione', type: 'text' },
    { key: 'roomId', label: 'Stanza', type: 'select', collection: 'rooms' }
  ],
  objects: [
    { key: 'name', label: 'Nome oggetto', type: 'text' },
    { key: 'description', label: 'Descrizione', type: 'textarea' },
    { key: 'roomId', label: 'Stanza', type: 'select', collection: 'rooms' }
  ]
};

function openEditModal(collection, id) {
  const isEdit = !!id;
  const item = isEdit ? Store.getById(collection, id) : {};
  const fields = fieldsByCollection[collection];

  const modalRoot = document.getElementById('modal-root');
  modalRoot.innerHTML = `
    <div class="modal-bg">
      <div class="modal">
        <h3>${isEdit ? 'Modifica' : 'Nuovo'} - ${collection}</h3>
        <form id="edit-form">
          ${fields.map(f => renderField(f, item)).join('')}
          <div class="modal-actions">
            <button type="button" onclick="closeModal()">Annulla</button>
            <button type="submit" class="btn-add">Salva</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('edit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const patch = {};
    fields.forEach(f => {
      const val = document.getElementById('field-' + f.key).value;
      patch[f.key] = f.type === 'number' ? Number(val) : val;
    });
    if (isEdit) {
      Store.update(collection, id, patch);
    } else {
      Store.add(collection, patch);
    }
    closeModal();
    refreshEditorLists();
  });
}

function renderField(f, item) {
  const value = item[f.key] ?? '';
  if (f.type === 'textarea') {
    return `<label>${f.label}</label><textarea id="field-${f.key}" rows="3">${value}</textarea>`;
  }
  if (f.type === 'select') {
    const options = Store.getAll(f.collection);
    return `<label>${f.label}</label><select id="field-${f.key}">
      <option value="">-- nessuna --</option>
      ${options.map(o => `<option value="${o.id}" ${o.id === value ? 'selected' : ''}>${o.name}</option>`).join('')}
    </select>`;
  }
  return `<label>${f.label}</label><input id="field-${f.key}" type="${f.type}" value="${value}">`;
}

function closeModal() {
  document.getElementById('modal-root').innerHTML = '';
}
