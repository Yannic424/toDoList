// On ajoute l'écoute de l'event sur les boutons
const monBoutton = document.querySelector("#ajouter");
const colonne1 = document.querySelector("#col1");
const colonne2 = document.querySelector("#col2");
const colonne3 = document.querySelector("#col3");


monBoutton.addEventListener('click', function () {
    // On assigne l'input à une variable
    let nouvelleTache = document.querySelector("#tache");

    // On controle si il y a du texte dans l'input
    if (!nouvelleTache.value) {
        // On applique nos changements
        nouvelleTache.placeholder = "Champ obligatoire";
        nouvelleTache.style.backgroundColor = "rgb(226, 63, 63)";
        nouvelleTache.classList.add("input-alerte");
        document.querySelector('.container').classList.add('blur');

        // Retirer nos changements après l'animation
        nouvelleTache.addEventListener('animationend', function () {
            nouvelleTache.classList.remove("input-alerte");
            document.querySelector('.container').classList.remove('blur');
            nouvelleTache.placeholder = "Saisir une nouvelle tache";
            nouvelleTache.style.backgroundColor = "white";
        }, { once: true }); // La condition pour que l'animation s'arrette

    } else {
        // On crée un élément div
        let ajouterDiv = document.createElement("div");
        // On crée un élément p
        let paragraphe = document.createElement("p");
        // On ajoute le texte de l'input dans le paragraphe
        paragraphe.textContent = nouvelleTache.value;
        // On applique une feuille de style
        ajouterDiv.classList.toggle("carte");




        // MES ICONES
        // Créer un élément span pour la première icône
        let arrowUpIcon = document.createElement("span");
        // Ajouter des classes à la première icône
        arrowUpIcon.classList.add("arrowUp");
        // Créer un élément span pour la deuxième icône
        let arrowDownIcon = document.createElement("span");
        // Ajouter des classes à la deuxième icône
        arrowDownIcon.classList.add("arrowDown");
        // Créer un élément span pour l'icône de suppression
        let deleteIcon = document.createElement("span");
        deleteIcon.classList.add("deleteIcon");
        // Créer un element span pour fleche de gauche
        let arrowLeftIcon = document.createElement("span");
        arrowLeftIcon.classList.add("arrowLeft")
        // Créer un element span pour fleche de droite
        let arrowRightIcon = document.createElement("span")
        arrowRightIcon.classList.add("arrowRight")



        // On ajoute le paragraphe à la div
        ajouterDiv.appendChild(paragraphe);
        // Ajouter la première icône au début de la div
        ajouterDiv.appendChild(arrowUpIcon);
        // Ajouter la deuxième icône à la suite de la première icône dans la div
        ajouterDiv.appendChild(arrowDownIcon);
        // Ajouter l'icône de suppression à la div
        ajouterDiv.appendChild(deleteIcon);
        // Ajouter l'icône de fleche vers la gauche
        ajouterDiv.appendChild(arrowLeftIcon)
        // Ajouter l'icône de fleche vers la droite 
        ajouterDiv.appendChild(arrowRightIcon)
        // On ajoute l'élément div dans la bonne colonne
        colonne1.appendChild(ajouterDiv);
        arrowLeftIcon.classList.add("redAlerte");
        ajouterDiv.classList.add("fade-in")




        // On vide l'input 
        nouvelleTache.value = "";




        // Gérer l'événement de clic sur l'icône de suppression
        deleteIcon.addEventListener('click', () => {
            // Afficher une boîte de dialogue de confirmation
            const confirmation = confirm("Voulez-vous vraiment supprimer cette tâche ?");

            // Vérifier si l'utilisateur a confirmé la suppression
            if (confirmation) {
                // Supprimer la carte parente de l'icône de suppression
                ajouterDiv.remove();
            }
        });



        // Gérer l'événement de clic sur la flèche vers le haut
        arrowUpIcon.addEventListener('click', () => {
            moveCardUp(ajouterDiv);
        });

        // Gérer l'événement de clic sur l'icône fleche du bas
        arrowDownIcon.addEventListener('click', () => {
            moveCardDown(ajouterDiv);
        })

        // Gérer l'évènement de clic sur l'icône fleche de gauche
        arrowLeftIcon.addEventListener('click', () => {
            moveToNextColumn(ajouterDiv, 'left')
        })

        // Gérer l'évènement de clic sur l'icône fleche de doite
        arrowRightIcon.addEventListener('click', () => {
            moveToNextColumn(ajouterDiv, 'right')
        })






        // MES EFFETS DE STYLE
        // Affecter un style sur le bouton delete
        deleteIcon.addEventListener('mousedown', () => {
            deleteIcon.classList.add("input-alerte")
            document.querySelector('.container').classList.add("blur")
            deleteIcon.addEventListener('mouseup', () => {
                deleteIcon.classList.remove("input-alerte")
                document.querySelector('.container').classList.remove("blur")
                /////////////
            })
        });

        // ... sur les fleches
        arrowUpIcon.addEventListener('mousedown', () => {
            arrowUpIcon.classList.add("invertClick")
            // Supprimer la classe une fois que le clic est relâché
            arrowUpIcon.addEventListener('mouseup', removeInvertClick);
        });
        arrowDownIcon.addEventListener('mousedown', () => {
            arrowDownIcon.classList.add("invertClick")
            // Supprimer la classe une fois que le clic est relâché
            arrowDownIcon.addEventListener('mouseup', removeInvertClick);
        });
        arrowLeftIcon.addEventListener('mousedown', () => {
            arrowLeftIcon.classList.add("invertClick")
            // Supprimer la classe une fois que le clic est relâché
            arrowLeftIcon.addEventListener('mouseup', removeInvertClick);
        });
        arrowRightIcon.addEventListener('mousedown', () => {
            arrowRightIcon.classList.add("invertClick")
            // Supprimer la classe une fois que le clic est relâché
            arrowRightIcon.addEventListener('mouseup', removeInvertClick);
        });
    }
});

// Fonction pour stylisé le clic du bouton
function removeInvertClick() {
    this.classList.remove("invertClick")
}

// Fonction pour déplacer une carte vers le haut
function moveCardUp(card) {
    const prevCard = card.previousElementSibling;
    if (prevCard) {
        card.parentNode.insertBefore(card, prevCard);
    }
}

// Fonction pour déplacer une carte vers le bas
function moveCardDown(card) {
    const nextCard = card.nextElementSibling;
    if (nextCard) {
        card.parentNode.insertBefore(nextCard, card);
    }
}

// Fonction pour déplacer une carte vers la droite ou vers la gauche
function moveToNextColumn(card, direction) {
    // Obtenez la colonne actuelle de la carte
    const currentColumn = card.parentNode;

    // Déterminez la prochaine colonne
    let nextColumn;
    if (direction === 'right') {
        if (currentColumn === colonne1) {
            nextColumn = colonne2;
            card.querySelector(".arrowLeft").classList.remove("redAlerte");
        } else if (currentColumn === colonne2) {
            nextColumn = colonne3;
            card.querySelector(".arrowRight").classList.add("redAlerte");
        }
        else {
            // Si la carte est déjà dans la dernière colonne, ne rien faire
            return;
        }
    } else if (direction === 'left') {
        if (currentColumn === colonne3) {
            nextColumn = colonne2;
            card.querySelector(".arrowRight").classList.remove("redAlerte");
        } else if (currentColumn === colonne2) {
            nextColumn = colonne1;
            card.querySelector(".arrowLeft").classList.add("redAlerte");
        } else {
            // Si la carte est déjà dans la première colonne, ne rien faire
            return;
        }
    }

    // Déplacez la carte vers la prochaine colonne
    nextColumn.insertBefore(card, nextColumn.firstElementChild);
}




// envoyer une alert() si l'input est vide
// rendre la totalité du fond en blur pendant la confirmation


// quand on clique sur le texte d'une carte on affiche le texte en entier
// modifier la hauteur et le retour à la ligne du texte


// Ajouter une animation de fondu out quand une div est supprimer
// ajouter une animanition de fondu in quand une div apparait dan une colonne


// ajouter un boutoon d'état (vert, orange, rouge)
// changer la couleur selon la colonne