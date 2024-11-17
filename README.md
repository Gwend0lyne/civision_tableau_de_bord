# Tableau de Bord React & Next.js

Ce projet est un tableau de bord interactif développé avec React et Next.js, conçu pour afficher des données dynamiques filtrées par plusieurs critères (saison, âge, niveau, compte, type de passe). 
Les résultats sont présentés sous deux types de graphiques. De plus, le prix moyen de la meilleure partie est calculé en fonction de la catégorie choisie.

## Fonctionnalités principales

- **Barre de filtres** : Permet de filtrer les données selon les critères suivants :
  - Saison
  - Âge
  - Niveau
  - Existence d'un compte
  - Type de passe
- **Affichage du prix moyen** : Affiche le prix moyen de la meilleure séléction en fonction de la catégorie sélectionnée.
  - Par exemple, si on sélectionne saison et que l'hiver est la saison avec le plus de ventes, le tableau de bord affichera :  
  **Prix moyen d'achat pour la saison : hiver *272,22* €** (prix moyen des achats en hiver).

- **Graphiques** : Affichage de deux types de graphiques :
  - **Graphique en camembert** : Pour le nombre d'achats
  - **Graphique à barres** : Pour le prix total

## Technologies utilisées

- **React** : Pour la gestion des composants et l'interface utilisateur.
- **Next.js** : Pour le rendu côté serveur et la gestion des pages.
- **Chart.js** : Pour l'affichage des graphiques (camembert et barres).

## Installation

Clonez le repository et installez les dépendances :

```bash
git clone https://github.com/Gwend0lyne/civision_tableau_de_bord.git
cd civision_tableau_de_bord
npm install
```

## Lancer le projet

```bash
npm run dev
```

Le projet sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).
