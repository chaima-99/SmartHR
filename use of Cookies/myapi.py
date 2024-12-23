from fastapi import FastAPI, Request, Response, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from typing import Dict
from uuid import uuid4

# Création d'une application FastAPI
app = FastAPI()

# Un dictionnaire pour stocker les sessions côté serveur
# Clé : ID de session unique, Valeur : nom d'utilisateur
sessions: Dict[str, str] = {}

# Page d'accueil : Vérifie si l'utilisateur est connecté via le cookie
@app.get("/")
def home(request: Request):
    # Récupère l'ID de session depuis les cookies
    session_id = request.cookies.get("session_id")
    
    # Si l'ID de session est valide, renvoyer un message de bienvenue
    if session_id and session_id in sessions:
        username = sessions[session_id]
        return {"message": f"Bienvenue, {username} !"}
    
    # Si aucune session active, informer l'utilisateur
    return {"message": "Vous n'êtes pas connecté."}

# Route pour se connecter et créer une session utilisateur
@app.post("/login")
def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):

    # Simule une vérification d'utilisateur avec un utilisateur fictif
    if form_data.username == "admin" and form_data.password == "admin123":
        # Crée un ID unique pour la session
        session_id = str(uuid4())
        
        # Associe cet ID de session avec le nom d'utilisateur dans le dictionnaire des sessions
        sessions[session_id] = form_data.username
        
        # Ajoute un cookie au client pour stocker l'ID de session
        response.set_cookie(key="session_id", value=session_id, httponly=True)#key: nom du cookie, value: valeur du cookie, httponly: empêche le JavaScript d'accéder au cookie
        
        # Renvoyer un message de succès
        return {"message": "Connexion réussie !"}
    
    # Si les identifiants sont incorrects, renvoyer une erreur 401 (Non autorisé)
    raise HTTPException(status_code=401, detail="Identifiants incorrects")

# Route pour se déconnecter et supprimer la session
@app.post("/logout")
def logout(request: Request, response: Response):
    try:
        # Récupère l'ID de session depuis les cookies
        session_id = request.cookies.get("session_id")
    except Exception as e:
        return {"message":e}
    # Si une session existe, la supprimer côté serveur
    if session_id in sessions:
        del sessions[session_id]  # Supprime la session du dictionnaire
            
        # Supprime le cookie côté client
        response.delete_cookie(key="session_id")
            
        # Renvoyer un message de succès
        return {"message": "Déconnexion réussie."}
        # Si une erreur se produit, renvoyer un message d'erreur
        # Si aucune session n'existe, informer l'utilisateur
    return {"message": "Vous n'étiez pas connecté."}

# Route protégée : Accessible uniquement si l'utilisateur est connecté
@app.get("/dashboard")
def dashboard(request: Request):
    """
    Permet d'accéder au tableau de bord si l'utilisateur est authentifié.
    """
    # Récupère l'ID de session depuis les cookies
    session_id = request.cookies.get("session_id")
    
    # Vérifie si la session est valide
    if session_id and session_id in sessions:
        username = sessions[session_id]
        return {"message": f"Bienvenue sur votre tableau de bord, {username} !"}
    
    # Si la session est invalide, renvoyer une erreur 401
    raise HTTPException(status_code=401, detail="Non autorisé. Veuillez vous connecter.")
