// Inizializzazione dell'array dal localStorage (se vuoto, array vuoto)
let listaSpesa = JSON.parse(localStorage.getItem("listaSpesa")) || [];

// Elementi del DOM presi dall'HTML
const prodottoInput = document.getElementById("prodottoInput");
const btnAggiungi = document.getElementById("btnAggiungi");
const listaSpesaUl = document.getElementById("listaSpesaUl");

// READ: Mostra la lista a schermo
function mostra() {
    listaSpesaUl.innerHTML = ""; 

    if (listaSpesa.length === 0) {
        listaSpesaUl.innerHTML = "<p class='empty-state'>La tua lista è vuota.</p>";
        return;
    }

    listaSpesa.forEach((prodotto, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${prodotto}</span>
            <div class="actions">
                <button class="btn-edit" onclick="aggiornare(${index})">Modifica</button>
                <button class="btn-delete" onclick="cancella(${index})">Elimina</button>
            </div>
        `;
        listaSpesaUl.appendChild(li);
    });
}

// CREATE: Inserisci un prodotto
function inserisci() {
    const prodotto = prodottoInput.value.trim();

    if (prodotto === "") return;

    listaSpesa.push(prodotto);
    salvaSuFile();
    prodottoInput.value = "";
    mostra();
}

// UPDATE: Modifica un prodotto esistente
function aggiornare(index) {
    const nuovoNome = prompt("Modifica il prodotto:", listaSpesa[index]);
    if (nuovoNome !== null && nuovoNome.trim() !== "") {
        listaSpesa[index] = nuovoNome.trim();
        salvaSuFile();
        mostra();
    }
}

// DELETE: Cancella un prodotto
function cancella(index) {
    listaSpesa.splice(index, 1);
    salvaSuFile();
    mostra();
}

// Funzione ausiliaria per il salvataggio dei dati
function salvaSuFile() {
    localStorage.setItem("listaSpesa", JSON.stringify(listaSpesa));
}

// EVENT LISTENERS (Rendiamo attivi i bottoni e la tastiera)
btnAggiungi.addEventListener("click", inserisci);

prodottoInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        inserisci();
    }
});

// Avvio automatico al caricamento della pagina
mostra();
