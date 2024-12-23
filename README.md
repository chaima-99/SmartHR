# RH Management System - Backend API 📋

## Description

Ce projet est une **API de gestion des ressources humaines** (RH) développée avec **FastAPI**.  
Elle permet aux entreprises de gérer efficacement les informations sur les employés, les congés, les départements et plus encore.

---

## Fonctionnalités principales

- **Gestion des employés** :
  - Créer, lire, mettre à jour et supprimer les informations des employés.
  - Gestion des postes et des départements.
- **Gestion des congés** :
  - Soumettre et approuver des demandes de congés.
  - Suivi des congés restants pour chaque employé.
- **Authentification et sécurité** :
  - Authentification avec JWT.
  - Gestion des rôles (administrateur, manager, employé).
- **Reporting** :
  - Génération de rapports sur les employés, les congés et les statistiques globales.
- **Documentation interactive** :
  - Swagger UI et ReDoc disponibles pour tester l'API.

---

## Technologies utilisées

- **Backend** : [FastAPI](https://fastapi.tiangolo.com/)
- **Base de données** : PostgreSQL
- **Authentification** : JSON Web Tokens (JWT)
- **ORM** : SQLAlchemy
- **Outils complémentaires** :
  - Alembic (migrations de base de données)
  - Uvicorn (serveur ASGI)
  - Pydantic (validation des données)

---

## Prérequis

Avant de commencer, assurez-vous que les éléments suivants sont installés sur votre système :

- **Python 3.9+**
- **PostgreSQL** (ou un autre SGBD compatible)
- **Pip** (gestionnaire de paquets Python)
- **Git**

---

## Installation

1. **Cloner le dépôt** :

   ```bash
   git clone https://NorIslam04/HR-management-FastAPI-Backend
   cd HR-management-FastAPI-Backend
   
2. **Créer et activer un environnement virtuel** :

  ```bash
  python -m venv venv
  source venv/bin/activate  # Windows : venv\Scripts\activate
```

3. **Installer les dépendances** :

   ```bash
   pip install -r requirements.txt

4. **Lancer le serveur** :
   ```bash
     uvicorn app.main:app --reload
   ```

####Cet exemple est structuré pour inclure des détails sur l'installation, l'utilisation, et les endpoints. Si vous avez des fonctionnalités ou exigences supplémentaires, faites-le-moi savoir ! 😊




   
