# 🍔✨ **AstroBite** — Fast Food Galactique

> *"Une aventure culinaire interstellaire au cœur du cosmos."* 🚀🌌

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer--Motion-EF008F?style=for-the-badge&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 📚 Table des matières

- [✨ Présentation](#-présentation)
- [🛠️ Stack Technique](#️-stack-technique)
- [📸 Aperçu](#-aperçu)
- [🚀 Lancer localement](#-lancer-localement)
- [📋 Fonctionnalités principales](#-fonctionnalités-principales)
- [📂 Organisation du projet](#-organisation-du-projet)
- [⚠️ Remarques](#️-remarques)

---

## ✨ Présentation

**AstroBite** est une application de fast food galactique au style immersif et original, conçue pour offrir une **expérience utilisateur hors du commun**.  
Chaque burger représente une planète, chaque boisson une étoile filante — plongez dans une interface spatiale moderne.  
Le projet inclut également un **dashboard d'administration** complet pour gérer les produits, les commandes et les utilisateurs.

---

## 🛠️ Stack Technique

- **Frontend** : React.js + TailwindCSS + Vite + Framer Motion
- **Backend** : Node.js + Express.js
- **Base de données** : MongoDB
- **Authentification** : JWT
- **Admin Dashboard** : React + Role-based access

---

## 📸 Aperçu

> (https://astro-bite.vercel.app)

---

## 🚀 Lancer localement

```bash
# 1. Cloner le repo
git clone https://github.com/Sara-Mediouni/AstroBite.git
cd astrobite

# 2. Installer les dépendances
cd frontend
npm run dev

cd ../admin
npm run dev

cd ../backend
nodemon server

# 3. Créer un fichier `.env` dans /backend avec les variables suivantes :
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_API_KEY=your_stripe_secret
PORT=4000

# 4. Démarrer le backend
cd backend
nodemon server

# 5. Démarrer le frontend client
cd ../frontend
npm run dev

# 6. Démarrer le dashboard admin (optionnel)
cd ../admin
npm run dev
```
## 📋 Fonctionnalités principales
## 🌠 Utilisateur
-🍔 Parcourir un menu galactique

-🛒 Ajouter des articles au panier

-💳 Paiement fictif intégré

-📦 Suivi du statut de commande

## 🪐 Admin Dashboard
-📦 Gestion des produits

-👤 Gestion des utilisateurs

-🧾 Suivi et mise à jour des commandes

## ⚠️ Remarques
Le backend nécessite une base de données MongoDB (local ou cloud Mongo Atlas).

Un système d'authentification JWT est implémenté pour sécuriser les routes utilisateur/admin.

Ce projet est conçu pour mettre en valeur la créativité UI/UX ainsi qu’une structure Full Stack professionnelle dans un portfolio.