# Guide de Déploiement du Site Web du Moulin Gouré

## 🌐 Options d'hébergement

### Option 1 : Hébergement gratuit (recommandé pour un site statique)

#### GitHub Pages
1. Créez un dépôt GitHub pour votre projet
2. Téléchargez les fichiers du site dans le dépôt
3. Activez GitHub Pages dans les paramètres du dépôt
4. Le site sera accessible à l'adresse : `https://votre-nom.github.io/nom-du-depot`

#### Netlify
1. Connectez-vous à [Netlify](https://www.netlify.com/)
2. Déposez le dossier du site ou connectez votre dépôt GitHub
3. Netlify déploie automatiquement le site
4. URL de déploiement : `https://votre-site.netlify.app/`

#### Vercel
1. Connectez-vous à [Vercel](https://vercel.com/)
2. Importez votre projet GitHub ou déposez les fichiers
3. Vercel déploie automatiquement le site
4. URL de déploiement : `https://votre-site.vercel.app/`

### Option 2 : Hébergement traditionnel

#### Serveur web local
1. Installez un serveur web (Apache, Nginx, ou Node.js)
2. Copiez tous les fichiers dans le répertoire racine du serveur
3. Accédez au site via `http://localhost` ou l'IP du serveur

#### Hébergeur web
1. Téléchargez les fichiers via FTP/SFTP sur votre hébergeur
2. Assurez-vous que le serveur supporte HTML/CSS/JS
3. Accédez au site via l'URL fournie par votre hébergeur

## 📁 Structure de déploiement

### Fichiers à déployer
```
site-moulin-gouré/
├── index.html              # Page d'accueil
├── historique.html         # Historique du moulin
├── vlog.html               # Actualités et témoignages
├── galerie.html            # Galerie photo
├── visites.html            # Visites
├── contact.html            # Contact
├── mentions-legales.html   # Mentions légales
├── admin/                  # Panel d'administration
│   ├── index.html          # Interface d'admin
│   └── config.json         # Configuration
├── css/
│   ├── style.css           # Styles principaux
│   ├── animations.css      # Animations
│   └── responsive.css      # Responsive
├── js/
│   ├── main.js             # Script principal
│   └── animations.js       # Scripts d'animations
└── images/                 # Images du site
```

## 🔧 Configuration requise

### Navigateurs supportés
- Chrome 60+
- Firefox 55+
- Safari 10+
- Edge 16+

### Prérequis serveur (si hébergement local)
- Serveur web compatible (Apache, Nginx, IIS)
- PHP 7.0+ (optionnel, pour les scripts avancés)
- Accès en écriture au dossier (pour le panel d'admin)

## 🚀 Processus de déploiement

### Déploiement GitHub Pages
```bash
# Clonez le dépôt
git clone https://github.com/votre-nom/site-moulin-gouré.git
cd site-moulin-gouré

# Ajoutez vos fichiers
git add .
git commit -m "Déploiement initial"
git push origin main
```

### Déploiement avec Netlify
1. Connectez votre dépôt GitHub à Netlify
2. Configurez le dossier de build (racine du projet)
3. Cliquez sur "Deploy"

### Déploiement manuel
```bash
# Copiez tous les fichiers dans le dossier racine du serveur
scp -r ./* utilisateur@serveur:/chemin/vers/racine/
```

## 🛡️ Sécurité

### Bonnes pratiques
- Utilisez des URLs sécurisées (HTTPS)
- Sauvegardez régulièrement les fichiers
- Vérifiez l'intégrité des fichiers déployés
- Mettez à jour régulièrement le contenu

## 🧪 Tests et validation

### Validation HTML
```bash
# Utilisez un validateur HTML5
# https://validator.w3.org/
```

### Validation CSS
```bash
# Utilisez un validateur CSS
# https://jigsaw.w3.org/css-validator/
```

### Tests de compatibilité
- Testez sur différents navigateurs
- Vérifiez le responsive design
- Validez l'accessibilité

## 🔄 Mises à jour

### Mise à jour du contenu
1. Modifiez les fichiers HTML/CSS/JS
2. Testez localement
3. Déployez sur le serveur
4. Vérifiez la mise à jour en ligne

### Mise à jour des images
1. Remplacez les anciennes images par les nouvelles
2. Mettez à jour les chemins si nécessaire
3. Testez l'affichage

## 📊 Suivi et maintenance

### Outils de suivi
- Google Analytics (facultatif)
- Statistiques de trafic
- Tests d'accessibilité

### Maintenance régulière
- Mise à jour du contenu
- Vérification des liens
- Optimisation des performances
- Sauvegardes régulières

## 📞 Support technique

### Pour les problèmes de déploiement
1. Vérifiez les permissions des fichiers
2. Testez l'accès au site local
3. Consultez les logs du serveur
4. Contactez votre hébergeur si nécessaire

### Assistance
Pour toute assistance technique, contactez : contact@moulingoure.fr

---

**Bon déploiement !**