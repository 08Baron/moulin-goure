// Script de validation de la structure du projet Moulin Gouré

const fs = require('fs');
const path = require('path');

// Liste des fichiers requis
const requiredFiles = [
    'index.html',
    'historique.html',
    'vlog.html',
    'galerie.html',
    'visites.html',
    'contact.html',
    'mentions-legales.html',
    'admin/index.html',
    'css/style.css',
    'css/animations.css',
    'css/responsive.css',
    'js/main.js',
    'js/animations.js',
    'admin/config.json',
    'README.md',
    'DEPLOIEMENT.md',
    'CONFIG.md',
    'TECH.md',
    'package.json',
    'robots.txt',
    'sitemap.xml'
];

// Vérification de la structure
function validateStructure() {
    console.log('Validation de la structure du projet Moulin Gouré...\n');

    let allValid = true;

    requiredFiles.forEach(filePath => {
        const fullPath = path.join(__dirname, filePath);
        if (fs.existsSync(fullPath)) {
            console.log(`✅ ${filePath} - Présent`);
        } else {
            console.log(`❌ ${filePath} - Manquant`);
            allValid = false;
        }
    });

    console.log('\n' + '='.repeat(50));

    if (allValid) {
        console.log('🎉 Tous les fichiers requis sont présents !');
        console.log('Le projet est correctement structuré.');
    } else {
        console.log('⚠️  Certains fichiers sont manquants.');
        console.log('Veuillez vérifier la structure du projet.');
    }

    return allValid;
}

// Vérification des dossiers
function validateDirectories() {
    const directories = ['css', 'js', 'admin', 'images'];

    console.log('\nValidation des dossiers...');

    directories.forEach(dir => {
        const dirPath = path.join(__dirname, dir);
        if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
            console.log(`✅ ${dir}/ - Présent`);
        } else {
            console.log(`❌ ${dir}/ - Manquant ou non valide`);
        }
    });
}

// Vérification des dépendances
function validateDependencies() {
    console.log('\nValidation des dépendances...');

    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
        console.log('✅ package.json - Présent');

        if (packageJson.dependencies) {
            console.log('✅ Dépendances définies');
        } else {
            console.log('⚠️  Aucune dépendance définie');
        }
    } catch (error) {
        console.log('❌ package.json - Non valide ou manquant');
    }
}

// Exécution des validations
validateStructure();
validateDirectories();
validateDependencies();

console.log('\n' + '='.repeat(50));
console.log('Vérification terminée.');