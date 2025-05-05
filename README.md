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

AstroBite est une application de fast food galactique au style immersif et original, conçue pour offrir une expérience utilisateur hors du commun.
Chaque burger représente une planète, chaque boisson une étoile filante — plongez dans une interface spatiale moderne.
Le projet inclut également un dashboard d'administration complet pour gérer les produits, les commandes et les utilisateurs, tout en étant structuré sur une architecture microservices.


---

## 🛠️ Stack Technique

-Frontend : React.js + TailwindCSS + Vite + Framer Motion

-Backend : Node.js + Express.js

-Microservices :

-User Service : Gestion des utilisateurs

-Order Service : Gestion des commandes

-Food Service : Gestion des produits alimentaires

-Base de données : MongoDB

-Authentification : JWT (JSON Web Token)

-Admin Dashboard : React + Accès basé sur les rôles (Role-based access)


---

## 📸 Aperçu

> (https://astro-bite.vercel.app)

---

## 🚀 Lancer localement
### 1. Cloner le repo

```bash

git clone https://github.com/Sara-Mediouni/AstroBite.git
cd astrobite
``` 
### 2. Installer les dépendances
``` bash
cd frontend
npm run dev

cd ../admin
npm run dev

cd ../backend
nodemon server
```
### 3. Créer un fichier `.env` dans /backend avec les variables suivantes :
Créer un fichier .env pour chaque microservice dans les répertoires appropriés :

### User Service (/backend/user-service/.env) :

```bash 
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4001
```
### Order Service (/backend/order-service/.env) :

```bash 
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4002
```
### Food Service (/backend/food-service/.env) :
```bash 
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4003
```

### API Gateway (/backend/gateway/.env) :
```bash 
USER_SERVICE_URL=http://localhost:4001
ORDER_SERVICE_URL=http://localhost:4002
FOOD_SERVICE_URL=http://localhost:4003

```


### 4. Démarrer le backend
cd backend/user-service
nodemon server.js

cd ../order-service
nodemon server.js

cd ../food-service
nodemon server.js

cd ../api-gateway
nodemon server.js


### 5. Démarrer le frontend client
cd ../frontend
npm run dev

### 6. Démarrer le dashboard admin (optionnel)
cd ../admin
npm run dev

## 📂 Organisation du projet

```bash
/AstroBite
  /frontend               # Application frontend (React)
  /admin                  # Dashboard admin (React)
  /backend
    /user-service 
    .env        # Microservice pour la gestion des utilisateurs
    /order-service  
    .env      # Microservice pour la gestion des commandes
    /food-service 
    .env        # Microservice pour la gestion des produits alimentaires
    /gateway              # API Gateway pour orchestrer les requêtes
  .env                    # Fichier de configuration avec les URL des microservices
  README.md               # Documentation du projet


```

### Microservices :
### User Service : Gérez les utilisateurs (inscription, profil, etc.).

### Order Service : Traitez les commandes passées par les utilisateurs.

### Food Service : Gérez les plats proposés dans le menu.

### Chaque service est responsable d'une fonctionnalité spécifique et l'API Gateway redirige les requêtes vers les services appropriés.


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

