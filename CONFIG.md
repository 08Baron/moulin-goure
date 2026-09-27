# Configuration du projet Moulin Gouré

## 📁 Structure du projet

```
site-moulin-gouré/
├── index.html              # Page d'accueil principale
├── historique.html         # Historique du moulin
├── vlog.html               # Actualités et témoignages
├── galerie.html            # Galerie photo
├── visites.html            # Visites et réservations
├── contact.html            # Page de contact
├── mentions-legales.html   # Mentions légales
├── admin/                  # Panel d'administration
│   ├── index.html          # Interface d'admin
│   └── config.json         # Configuration du site
├── css/                    # Styles CSS
│   ├── style.css           # Styles principaux
│   ├── animations.css      # Animations et transitions
│   └── responsive.css      # Styles responsive
├── js/                     # Scripts JavaScript
│   ├── main.js             # Script principal du site
│   └── animations.js       # Scripts d'animations
└── images/                 # Images du site
    ├── gallery/            # Galerie photo
    └── other/             # Images diverses
```

## 🎨 Palette de couleurs

### Couleurs principales
- **Primaire** : `#6a11cb` (violet profond)
- **Secondaire** : `#2575fc` (bleu vif)
- **Accent** : `#ffd700` (or)
- **Fonds** : `#fff` (blanc)
- **Textes** : `#333` (gris foncé)

### Dégradés
```css
/* Dégradé principal */
background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);

/* Dégradé secondaire */
background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
```

## 📱 Responsive Design

### Points de rupture
- **Mobile** : max-width 768px
- **Tablette** : 769px à 1024px
- **Desktop** : min-width 1025px

### Composants responsive
- Navigation mobile avec hamburger menu
- Grille de galerie adaptable
- Textes fluides selon la taille d'écran
- Images responsives

## 🖋️ Typographie

### Polices recommandées
- **Titres** : Playfair Display (serif)
- **Corps de texte** : Roboto (sans-serif)

### Tailles de police
```css
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
p { font-size: 1rem; }
```

## 🛠️ Fonctionnalités techniques

### JavaScript
- Navigation mobile
- Animations au scroll
- Gestion de formulaires
- Filtrage de galerie
- Synchronisation de la cagnotte

### Animations
- Fade in au chargement
- Slide in des éléments
- Hover effects sur les cartes
- Transitions fluides

## 🔧 Panel d'administration

### Configuration
- `config.json` : Contient toutes les configurations du site
- Interface utilisateur intuitive
- Sauvegarde dans le navigateur (localStorage)

### Fonctionnalités de l'admin
- Modification des textes
- Configuration des couleurs
- Activation/désactivation des fonctionnalités
- Gestion des réseaux sociaux

## 📊 Optimisations

### Performance
- Fichiers CSS/JS minifiés (dans la version finale)
- Images optimisées
- Lazy loading pour les images
- Code asynchrone pour les requêtes

### Accessibilité
- Structure sémantique HTML5
- Contraste de couleurs suffisant
- Navigation au clavier
- Alt text sur les images

## 📦 Dépendances

### Outils de développement
```json
{
  "http-server": "^14.1.1",
  "concurrently": "^8.2.0",
  "nodemon": "^3.0.1"
}
```

### Scripts disponibles
- `npm start` : Démarrage du serveur local
- `npm run dev` : Développement avec auto-reload
- `npm run build` : Préparation pour le déploiement

## 🔄 Mise à jour du contenu

### Procédure standard
1. Accédez au panel d'admin (`/admin/index.html`)
2. Modifiez les textes ou configurations nécessaires
3. Sauvegardez les modifications
4. Vérifiez le site en local
5. Déployez sur l'hébergeur

### Bonnes pratiques
- Sauvegardez toujours une version avant de modifier
- Testez les modifications locales
- Vérifiez la compatibilité responsive
- Mettez à jour régulièrement le contenu

## 📋 Checklist de déploiement

### Avant le déploiement
- [ ] Vérifier tous les liens internes
- [ ] Valider le code HTML/CSS
- [ ] Tester sur différents navigateurs
- [ ] Vérifier l'accessibilité
- [ ] Optimiser les images
- [ ] Testez le formulaire de contact

### Après le déploiement
- [ ] Vérifier que tous les fichiers sont présents
- [ ] Confirmer le fonctionnement des animations
- [ ] Tester la navigation mobile
- [ ] Vérifier la cagnotte et les fonctionnalités dynamiques
- [ ] Mettre à jour les liens dans les réseaux sociaux

## 🛡️ Sécurité

### Bonnes pratiques
- Ne jamais stocker de données sensibles dans le code client
- Utiliser des URLs sécurisées (HTTPS)
- Valider toujours les entrées utilisateur
- Mettre à jour régulièrement les scripts et dépendances

## 📈 Maintenance

### Fréquence de maintenance
- Mise à jour du contenu : mensuelle
- Vérification des liens : hebdomadaire
- Tests de performance : trimestriels
- Sauvegardes : quotidiennes

---

**Configuration mise à jour le 2023**