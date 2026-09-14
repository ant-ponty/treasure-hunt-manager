function renderFlow(root) {
  const rooms = Store.getAll('rooms');
  const puzzles = Store.getAll('puzzles');

  let flowHtml = '';
  rooms.forEach((room, idx) => {
    const roomPuzzles = puzzles.filter(p => p.roomId === room.id);
    flowHtml += `<div class="flow-node">🏠 ${room.name}</div>`;
    roomPuzzles.forEach(p => {
      flowHtml += `<span class="flow-arrow">→</span><div class="flow-node" style="background:#b08a2b;">🧩 ${p.name}</div>`;
    });
    if (idx < rooms.length - 1) {
      flowHtml += `<span class="flow-arrow">→</span>`;
    }
  });

  root.innerHTML = `
    <div class="card">
      <h2>Diagramma di Flusso del Gioco</h2>
      <p>Sequenza stanze → enigmi contenuti. Basato sull'ordine di creazione delle stanze.</p>
      <div style="line-height: 2.6;">${flowHtml || '<p>Aggiungi stanze ed enigmi per generare il diagramma.</p>'}</div>
    </div>
  `;
}
