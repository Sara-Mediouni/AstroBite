# 🍔✨ AstroBite — Fast Food Galactique

> *"Une aventure culinaire interstellaire au cœur du cosmos."* 🚀🌌

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer--Motion-EF008F?style=for-the-badge&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

![Tests](https://img.shields.io/badge/tests-passing-brightgreen?style=for-the-badge)
![Coverage](https://img.shields.io/badge/coverage-90%25-yellowgreen?style=for-the-badge)
![GitHub Actions](https://img.shields.io/github/actions/workflow/status/Sara-Mediouni/AstroBite/tests.yml?style=for-the-badge)

---

## 📚 Table des matières

- [✨ Présentation](#-présentation)
- [🛠️ Stack Technique](#️-stack-technique)
- [🧩 Table des Services](#-table-des-services)
- [📸 Aperçu](#-aperçu)
- [🚀 Lancer localement](#-lancer-localement)
- [📂 Organisation du projet](#-organisation-du-projet)
- [📋 Fonctionnalités principales](#-fonctionnalités-principales)
- [⚠️ Remarques](#️-remarques)

---

## ✨ Présentation

AstroBite est une application de **fast food galactique** immersive avec des visuels dynamiques, une navigation fluide, et une architecture microservices performante. Chaque élément du menu est inspiré du cosmos.  
Un **dashboard admin** permet de gérer produits, utilisateurs et commandes.

---

## 🛠️ Stack Technique

| Domaine         | Outils & Technologies                          |
|-----------------|------------------------------------------------|
| Frontend        | React, TailwindCSS, Vite, Framer Motion        |
| Backend         | Node.js, Express.js                            |
| Authentification| JWT                                            |
| Base de données | MongoDB                                        |
| CI/CD           | GitHub Actions                                 |
| Tests           | Mocha, Chai, Sinon, React Testing Library, Jest                             |
| Architecture    | Microservices + API Gateway                    |

---

## 🧩 Table des Services

| Service         | Port | Description                             | Dossier                  |
|-----------------|------|-----------------------------------------|--------------------------|
| User Service    | 4001 | Gère l’inscription, connexion, profil   | `/backend/user-service`  |
| Order Service   | 4002 | Gère les commandes des utilisateurs     | `/backend/order-service` |
| Food Service    | 4003 | Gère les produits alimentaires          | `/backend/food-service`  |
| API Gateway     | 4000 | Redirige les requêtes vers les services | `/backend/gateway`       |

---

## 📸 Aperçu

> 🌐 [astro-bite.vercel.app](https://astro-bite.vercel.app)

---

## 🚀 Lancer localement

### 1. Cloner le dépôt

```bash
git clone https://github.com/Sara-Mediouni/AstroBite.git
cd AstroBite
```
### 2. Installer les dépendances

cd frontend && npm install
cd ../admin && npm install
cd ../backend/user-service && npm install
cd ../backend/order-service && npm install
cd ../backend/food-service && npm install
cd ../backend/gateway && npm install


### 3. Créer les fichiers .env
#### /backend/user-service/.env
```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4001
```

#### /backend/order-service/.env

```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4002
```
#### /backend/food-service/.env

```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4003
```

#### /backend/gateway/.env

```bash
USER_SERVICE_URL=http://localhost:4001
ORDER_SERVICE_URL=http://localhost:4002
FOOD_SERVICE_URL=http://localhost:4003

```
## 4. Démarrer les services backend
```bash
# Dans 4 terminaux séparés
cd backend/user-service && nodemon server.js
cd backend/order-service && nodemon server.js
cd backend/food-service && nodemon server.js
cd backend/gateway && nodemon server.js



```

## 5. Démarrer le frontend
```bash

cd frontend
npm run dev


```

## 6. Démarrer l’admin dashboard (optionnel)
```bash

cd admin
npm run dev

```

## 📂 Organisation du projet

```bash
/AstroBite
│
├── frontend               # Interface utilisateur principale
├── admin                  # Dashboard d'administration
└── backend
    ├── user-service       # Service utilisateurs
    ├── order-service      # Service commandes
    ├── food-service       # Service menu
    └── gateway            # API Gateway (proxy d’entrée)

```

##  Fonctionnalités principales
### 🌠 Utilisateur
🍔 Navigation dans le menu galactique

🛒 Ajout au panier

💳 Paiement simulé

📦 Suivi des commandes

### 🪐 Admin Dashboard
📦 Gestion CRUD des produits

👤 Gestion des utilisateurs

🧾 Suivi et mise à jour des commandes

## ⚠️ Remarques
-Nécessite une base MongoDB (locale ou MongoDB Atlas).

-Authentification sécurisée via JWT.

-Des tests unitaires sont présents dans chaque microservice.

-CI/CD automatisé avec GitHub Actions.