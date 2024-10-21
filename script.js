/*
CRUD 
C - Create (POST): Creare nuovi dati
R - Read (GET): Leggere o ottenere dati
U - Update (PUT / PATCH): Modificare dati esistenti
D - Delete (DELETE): Eliminare dati

In questo esempio, ci concentriamo su:
- Read (GET): ottenere i post esistenti
- Create (POST): aggiungere un nuovo post
*/

// URL base per le API di JSONPlaceholder
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

/*
GET (Read)
La funzione getPosts() utilizza fetch per fare una richiesta GET 
all'URL di JSONPlaceholder: https://jsonplaceholder.typicode.com/posts.

1. Viene fatta una richiesta al server per ottenere i post.
2. La risposta (response) viene convertita in formato JSON (array di oggetti).
3. Ogni post viene poi aggiunto al DOM, visualizzando il titolo e il corpo.
*/
function getPosts() {
  // Facciamo una richiesta GET all'API
  fetch(apiUrl)
    .then((response) => response.json()) // Convertiamo la risposta in formato JSON
    .then((data) => {
      // Selezioniamo l'elemento dove verranno mostrati i post
      const postsDiv = document.getElementById("posts");
      postsDiv.innerHTML = ""; // Pulire il contenuto prima di aggiungere nuovi post

      // Per ogni post ricevuto (che è un oggetto), creiamo un elemento HTML
      data.forEach((post) => {
        const postElement = document.createElement("div"); // Creiamo un <div>
        postElement.innerHTML = `
          <h3>${post.title}</h3> <!-- Titolo del post -->
          <p>${post.body}</p>    <!-- Corpo del post -->
          <hr>                    <!-- Linea di separazione -->
        `;
        // Aggiungiamo il <div> creato alla pagina
        postsDiv.appendChild(postElement);
      });
    })
    .catch((error) => console.error("Errore:", error)); // Gestiamo eventuali errori
}

/*
POST (Create)
La funzione createPost() invia una richiesta POST 
all'URL di JSONPlaceholder: https://jsonplaceholder.typicode.com/posts.

1. Quando l’utente compila il form e invia i dati, viene inviata una richiesta POST con il titolo e il corpo del post.
2. I dati vengono convertiti in formato JSON e inviati al server.
3. Una volta che il server conferma la creazione del post, il nuovo post viene aggiunto alla lista visibile sulla pagina.
*/
function createPost(title, body) {
  // Creiamo un oggetto che rappresenta il nuovo post
  const newPost = {
    title: title, // Titolo del post (dall'input utente)
    body: body, // Corpo del post (dall'input utente)
    userId: 1, // userId richiesto da jsonplaceholder (esempio fisso)
  };

  // Facciamo una richiesta POST per inviare i dati
  fetch(apiUrl, {
    method: "POST", // Indichiamo che si tratta di una richiesta POST
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Specifica che i dati sono in formato JSON
    },
    body: JSON.stringify(newPost), // Convertiamo il nuovo post in formato JSON
  })
    .then((response) => response.json()) // Convertiamo la risposta in formato JSON
    .then((data) => {
      // Stampiamo in console il post creato
      console.log("Post creato:", data);
      // Aggiungiamo il nuovo post direttamente alla pagina senza ricaricare
      const postsDiv = document.getElementById("posts");
      const postElement = document.createElement("div");
      postElement.innerHTML = `
        <!-- Titolo del nuovo post -->
        <h3>${data.title}</h3> 
        <!-- Corpo del nuovo post -->
        <p>${data.body}</p> 
        <!-- Linea di separazione -->  
        <hr>                   
      `;
      postsDiv.appendChild(postElement); // Aggiungiamo il post alla lista
    })
    .catch((error) => console.error("Errore:", error)); // Gestiamo eventuali errori
}

// Gestione dell'invio del form
// Quando l'utente invia il form, blocchiamo l'invio predefinito e usiamo i dati
const postForm = document.getElementById("postForm");
postForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Blocca il comportamento predefinito del form (non ricaricare la pagina)
  const title = document.getElementById("title").value; // Ottieni il valore del titolo
  const body = document.getElementById("body").value; // Ottieni il valore del corpo
  createPost(title, body); // Creiamo un nuovo post con i dati inseriti dall'utente
  postForm.reset(); // Resettiamo il form dopo l'invio
});

// Carichiamo i post esistenti all'avvio della pagina
getPosts();
