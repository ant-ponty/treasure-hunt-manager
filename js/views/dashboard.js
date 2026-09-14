function renderDashboard(root) {
  const { paths, rooms, puzzles, objects, links } = Store.data;

  root.innerHTML = `
    <div class="card">
      <h2>Dashboard</h2>
      <div class="grid">
        <div class="stat-box"><div class="num">${paths.length}</div>Percorsi</div>
        <div class="stat-box"><div class="num">${rooms.length}</div>Stanze</div>
        <div class="stat-box"><div class="num">${puzzles.length}</div>Enigmi</div>
        <div class="stat-box"><div class="num">${objects.length}</div>Oggetti</div>
        <div class="stat-box"><div class="num">${links.length}</div>Collegamenti</div>
      </div>
    </div>

    <div class="card">
      <h2>Riepilogo rapido</h2>
      <p>Usa il menu in alto per gestire percorsi, stanze, enigmi e oggetti, creare collegamenti tra loro, visualizzare la mappa delle stanze o il diagramma di flusso dell'intera avventura.</p>
      <p>Tutti i dati vengono salvati automaticamente in locale (localStorage). Usa "Esporta JSON" per fare un backup e "Importa JSON" per ripristinarlo o trasferirlo su un altro dispositivo.</p>
    </div>

    <div class="card">
      <h2>Ultimi elementi aggiunti</h2>
      <div class="grid">
        ${[...rooms].slice(-3).reverse().map(r => `<div class="item-row"><span>🏠 ${r.name}</span></div>`).join('') || '<p>Nessuna stanza ancora.</p>'}
        ${[...puzzles].slice(-3).reverse().map(p => `<div class="item-row"><span>🧩 ${p.name}</span></div>`).join('')}
        ${[...objects].slice(-3).reverse().map(o => `<div class="item-row"><span>🎒 ${o.name}</span></div>`).join('')}
      </div>
    </div>
  `;
}
