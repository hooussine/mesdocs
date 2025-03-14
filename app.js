console.log("✅ app.js charger!");
/*document.addEventListener("DOMContentLoaded", loadDocuments);

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

    let file = fileInput.files[0];
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
*/
function openDocument(fileURL) {
    console.log(" file URL argument de openDocument  111111111 " + fileURL);
    window.open(fileURL, "_blank");
}
/*
console.log("✅ La fonction openDocument est bien définie !");
if ('serviceWorker' in navigator) { 
    navigator.serviceWorker.register('mesdocs/sw.js', { scope: '/mesdocs/' })
    .then(reg => console.log("✅ Service Worker enregistré avec le scope :", reg.scope))
    .catch(err => console.error("❌ Erreur d'enregistrement du SW :", err));
}

*/
// Enregistrer le service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log("Service Worker enregistré"))
        .catch(err => console.error("Erreur Service Worker:", err));
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🌍 DOM chargé !");
    await afficherListeFichiers(); // Charge la liste des fichiers en cache
});

async function afficherListeFichiers() {
    const cache = await caches.open("mes-docs-admin-cache-v1");
    const keys = await cache.keys();

    // Création de la liste des fichiers
    let fileList = document.getElementById("cachedFilesList");
    if (!fileList) {
        fileList = document.createElement("ul");
        fileList.id = "cachedFilesList";
        document.body.appendChild(fileList);
    }
    fileList.innerHTML = ""; // Nettoie la liste avant de la remplir

    keys.forEach((request) => {
        if (request.url.endsWith(".pdf")) {
            const listItem = document.createElement("li");
            const fileLink = document.createElement("a");
            console.log("url        " +request.url)
            fileLink.href = "#";
            fileLink.textContent = `📄 ${request.url.split("/").pop()}`;
            fileLink.dataset.url = request.url;

            fileLink.addEventListener("click", async (e) => {
                e.preventDefault();

               // await afficherPDF(e.target.dataset.url, pdfViewer, cache);
                openDocument(request.url);
            });

            listItem.appendChild(fileLink);
            fileList.appendChild(listItem);
        }
    });

    if (keys.length > 0) {
        console.log("📂 Liste des fichiers affichée !");
    } else {
        console.log("⚠️ Aucun fichier PDF en cache.");
    }
}

//