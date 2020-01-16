
/**
 * La méthode document.getElementById () renvoie l'élément de l'ID spécifié.
 */
var InputTache = document.getElementById("new-task");
var AjouterTache = document.querySelector("button");
var incompleteTache = document.getElementById("incomplete-tasks");
var completeTache = document.getElementById("completed-tasks");

/**
 * Ajouter une tache
 */
function addTasks() {

    var taskValue = document.getElementById("new-task").value;
    // appel la function ajout
    ajout(taskValue);
    // affiche un message dans la console
    console.log('%c Ajout ', 'background: #222; color: #bada55; font-size:30px;');

    // console.log(obj);
    // console.log(jsonObjet);
}

/**
 * Supprimer une tache
 */
function deleteTasks(){
    var request = new XMLHttpRequest();
    request.open('DELETE' , serverUrl + '/api/todolist/:id');
}


function finishTasks(){
    var request = new XMLHttpRequest();
    const todolist = todolists.find( c => c.id === parseInt(req.params.id));
    // si il na pas d'id, erreur 404
    if(!todolist){
        res.status(404).send('manque id');
    } 

    // La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau
    const index = todolists.indexOf(todolist);
    // splite permet de diviser une chaine à partir d'un séparateurs
    todolists.splice(index, 1);
    // return la list du tableau
    console.log("id :  " +  req.params.id + " ========== element supprimer ");
    res.send(todolist)
}

function ajout(taskValue) {
    var request = new XMLHttpRequest();
    // requete serveur methode post
    request.open('POST', serverUrl + '/api/todolists/', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
        if (request.status >= 200 && request.status < 400)  {
            render();
        }
    };

    // si la requete a le status 200 tu affiche
    request.send(JSON.stringify({ name: taskValue }));
}

// Si on appuie sur entrer dans l'input
function addlistAfterKey(event){
    // code 13 de la touche entree
    if (inputlength() > 0 && event.which === 13) {
        // apelle la fonction ajout
        addTasks();
    }
}

function inputlength(){
    return InputTache.value.length;
}

function addToucheEnter(){
    if (inputlength() > 0) {
        createListElement();
    }
}

AjouterTache.addEventListener("click", addTasks);
InputTache.addEventListener("keypress", addlistAfterKey);

// l'input, est apeler a l'événement du clique, et appel function ajout
AjouterTache.addEventListener("click", addTasks);
