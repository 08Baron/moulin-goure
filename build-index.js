// Ce script tourne automatiquement à chaque déploiement Netlify (voir netlify.toml).
// Il n'y a rien à faire manuellement : dès que l'admin ajoute/modifie un fichier
// dans data/vlog/, data/timeline/ ou data/visites/, ce script régénère les fichiers
// combinés (data/vlog.json, data/timeline.json, data/visites.json) que le site public lit.
const fs = require('fs');
const path = require('path');

function buildIndex(folderName, outFile, wrapperKey, sortKey, order) {
  const dir = path.join(__dirname, 'data', folderName);
  let items = [];
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    items = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
    items.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return order === 'desc' ? 1 : -1;
      if (a[sortKey] > b[sortKey]) return order === 'desc' ? -1 : 1;
      return 0;
    });
  }
  const outPath = path.join(__dirname, 'data', outFile);
  fs.writeFileSync(outPath, JSON.stringify({ [wrapperKey]: items }, null, 2));
  console.log(`-> ${outFile}: ${items.length} élément(s)`);
}

buildIndex('vlog', 'vlog.json', 'posts', 'date', 'desc');       // articles les plus récents en premier
buildIndex('timeline', 'timeline.json', 'events', 'year', 'asc'); // frise dans l'ordre chronologique
buildIndex('visites', 'visites.json', 'visites', 'date', 'asc'); // visites les plus proches en premier

console.log('Fichiers combinés régénérés avec succès.');
