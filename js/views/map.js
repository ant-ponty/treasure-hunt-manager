function renderMap(root) {
  const rooms = Store.getAll('rooms');
  const puzzles = Store.getAll('puzzles');
  const objects = Store.getAll('objects');

  root.innerHTML = `
    <div class="card">
      <h2>Mappa delle Stanze</h2>
      <p>Visualizzazione di ogni stanza con enigmi e oggetti al suo interno.</p>
      <div>
        ${rooms.map(room => `
          <div class="room-box">
            <h3>🏠 ${room.name}</h3>
            <p style="font-size:0.8rem;color:#aaa;">${room.description || ''}</p>
            <b>Enigmi:</b>
            <ul>${puzzles.filter(p => p.roomId === room.id).map(p => `<li>🧩 ${p.name}</li>`).join('') || '<li><i>nessuno</i></li>'}</ul>
            <b>Oggetti:</b>
            <ul>${objects.filter(o => o.roomId === room.id).map(o => `<li>🎒 ${o.name}</li>`).join('') || '<li><i>nessuno</i></li>'}</ul>
          </div>
        `).join('') || '<p>Nessuna stanza creata ancora.</p>'}
      </div>
    </div>
  `;
}
