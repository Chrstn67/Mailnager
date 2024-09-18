# Mailnager API
Organisez et suivez vos Candidatures.

## Conception Base de donnée MongoDB
```Json

Offre
{
    "id": number,
    "lien": string,
    "date": date,
    "contrat": [
        "CDI", 
        "CDD", 
        "Stage", 
        "Alternance", 
        "Intérim"
        ],
    "horaire": [
        "Temps plein", 
        "Temps partiel", 
        "Mi-temps"
        ],
    "entreprise": {
        "nom": string,
        "ville": string
    },
    "métier": string
}
```