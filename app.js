console.log("✅ app.js charger!");
document.addEventListener("DOMContentLoaded", loadDocuments);
let file=""
let documents = JSON.parse(localStorage.getItem("documents")) || [];
console.log("document creer par let documents   "+JSON.stringify(documents));
function loadDocuments() {
    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    documents.forEach((doc, index) => {
        let li = document.createElement("li");
        console.log(" dans loadDocuments()   '${doc.file}'     "+ doc.file)
        li.innerHTML = `
            <span onclick="openDocument('${doc.file}')">${doc.name}</span>
            <button onclick="deleteDocument(${index})">🗑</button>
        `;
        menu.appendChild(li);
    });
}

function addDocument() {
    let name = document.getElementById("docName").value.trim();
    let fileInput = document.getElementById("docFile");
    console.log(" file input  dans addDocument()   "+JSON.stringify(fileInput));
    if (name === "" || fileInput.files.length === 0) {
        alert("Veuillez entrer un nom et choisir un fichier.");
        return;
    }

     file = fileInput.files[0];
    console.log(" dans addDocument() file = fileInput.files[0]   "+JSON.stringify(file));
    let fileURL = "docs/" + file.name; // Stocke un vrai chemi

    documents.push({ name, file: fileURL });
    localStorage.setItem("documents", JSON.stringify(documents));

    document.getElementById("docName").value = "";
    document.getElementById("docFile").value = "";

    loadDocuments();
}

function deleteDocument(index) {
    documents.splice(index, 1);
    localStorage.setItem("documents", JSON.stringify(documents));
    loadDocuments();
}

function openDocument(fileURL) {
    console.log(" file URL argument de openDocument  111111111 " + fileURL);
    window.open(fileURL, "_parent");
}
console.log("✅ La fonction openDocument est bien définie !");
// Enregistrer le service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log("Service Worker enregistré"))
        .catch(err => console.error("Erreur Service Worker:", err));
}
