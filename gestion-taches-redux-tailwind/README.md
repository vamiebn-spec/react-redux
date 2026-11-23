# TaskFlow — React, Redux Toolkit et Tailwind CSS

Application responsive de gestion de tâches.

## Fonctionnalités
- Ajouter une tâche
- Modifier sa description
- Supprimer une tâche
- Marquer une tâche comme terminée / non terminée
- Filtrer : toutes, en cours, terminées
- Statistiques et barre de progression
- Sauvegarde automatique dans `localStorage`

## Installation et lancement

Prérequis : Node.js installé sur votre ordinateur.

1. Décompressez le ZIP.
2. Ouvrez le dossier `gestion-taches-redux-tailwind` dans VS Code.
3. Ouvrez le terminal intégré.
4. Lancez ces commandes une par une :

```bash
npm install
npm run dev
```

5. Ouvrez l'adresse affichée dans le terminal, généralement `http://localhost:5173`.

## Structure du projet

```text
src/
├── app/
│   └── store.js
├── components/
│   ├── AddTask.jsx
│   ├── ListTask.jsx
│   └── Tache.jsx
├── features/
│   └── tasks/
│       └── tasksSlice.js
├── App.jsx
├── main.jsx
└── index.css
```

- `store.js` : configure le store Redux global.
- `tasksSlice.js` : définit l'état initial et les actions Redux.
- `AddTask.jsx` : formulaire pour ajouter une tâche.
- `ListTask.jsx` : filtres et affichage de la liste.
- `Tache.jsx` : affichage, modification, validation et suppression d'une tâche.
- `App.jsx` : assemble les composants.

## Technologies
React, Redux Toolkit, React Redux, Tailwind CSS, Vite et Lucide React.
