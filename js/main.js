// Router semplice tra le viste
const views = {
  dashboard: renderDashboard,
  editor: renderEditor,
  links: renderLinks,
  flow: renderFlow,
  map: renderMap
};

function navigateTo(viewName) {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });
  const root = document.getElementById('app-root');
  root.innerHTML = '';
  views[viewName](root);
  localStorage.setItem('last-view', viewName);
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => navigateTo(btn.dataset.view));
});

document.getElementById('btn-export').addEventListener('click', () => {
  const blob = new Blob([Store.exportJSON()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'treasure-hunt-data.json';
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById('btn-import').addEventListener('click', () => {
  document.getElementById('file-import').click();
});

document.getElementById('file-import').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      Store.importJSON(ev.target.result);
      alert('Dati importati con successo!');
      navigateTo(localStorage.getItem('last-view') || 'dashboard');
    } catch (err) {
      alert('Errore nel file JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
});

// Avvio
const startView = localStorage.getItem('last-view') || 'dashboard';
navigateTo(startView);
