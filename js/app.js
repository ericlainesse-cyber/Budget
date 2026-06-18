/* =====================================
   BUDGET GLOBAL APP
===================================== */

let transactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];

let budgetGlobal = Number(
    localStorage.getItem("budgetGlobal")
) || 0;

let chart = null;

/* =====================================
   ELEMENTS
===================================== */

const budgetInput = document.getElementById("budgetInput");
const saveBudgetBtn = document.getElementById("saveBudgetBtn");

const transactionForm =
    document.getElementById("transactionForm");

const searchInput =
    document.getElementById("searchInput");

const transactionsBody =
    document.getElementById("transactionsBody");

const budgetTotal =
    document.getElementById("budgetTotal");

const revenusTotal =
    document.getElementById("revenusTotal");

const depensesTotal =
    document.getElementById("depensesTotal");

const soldeRestant =
    document.getElementById("soldeRestant");

const alertContainer =
    document.getElementById("alertContainer");

/* =====================================
   INITIALISATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    budgetInput.value = budgetGlobal;

    afficherTransactions();
    mettreAJourDashboard();
    verifierAlertes();

});

/* =====================================
   BUDGET
===================================== */

saveBudgetBtn.addEventListener("click", () => {

    budgetGlobal = Number(
        budgetInput.value
    );

    localStorage.setItem(
        "budgetGlobal",
        budgetGlobal
    );

    mettreAJourDashboard();
    verifierAlertes();

});

/* =====================================
   AJOUT TRANSACTION
===================================== */

transactionForm.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        const transaction = {

            id: Date.now(),

            date:
                document.getElementById("date").value,

            description:
                document.getElementById("description").value,

            montant: Number(
                document.getElementById("montant").value
            ),

            type:
                document.getElementById("type").value,

            categorie:
                document.getElementById("categorie").value,

            piece:
                document.getElementById("pieceJointe")
                .files[0]
                    ? document.getElementById(
                        "pieceJointe"
                      ).files[0].name
                    : ""

        };

        transactions.push(transaction);

        sauvegarder();
        afficherTransactions();
        mettreAJourDashboard();
        verifierAlertes();

        transactionForm.reset();

    }
);

/* =====================================
   SAUVEGARDE
===================================== */

function sauvegarder() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

/* =====================================
   CALCULS
===================================== */

function calculerTotaux() {

    const revenus = transactions
        .filter(t => t.type === "revenu")
        .reduce((a,b)=>a+b.montant,0);

    const depenses = transactions
        .filter(t => t.type === "depense")
        .reduce((a,b)=>a+b.montant,0);

    const restant =
        budgetGlobal + revenus - depenses;

    return {
        revenus,
        depenses,
        restant
    };

}

/* =====================================
   DASHBOARD
===================================== */

function mettreAJourDashboard() {

    const totals =
        calculerTotaux();

    budgetTotal.textContent =
        formatMontant(budgetGlobal);

    revenusTotal.textContent =
        formatMontant(totals.revenus);

    depensesTotal.textContent =
        formatMontant(totals.depenses);

    soldeRestant.textContent =
        formatMontant(totals.restant);

    mettreAJourGraphique();

}

/* =====================================
   TABLEAU
===================================== */

function afficherTransactions(
    filtre = ""
) {

    transactionsBody.innerHTML = "";

    const liste = transactions.filter(t =>
        t.description
            .toLowerCase()
            .includes(
                filtre.toLowerCase()
            )
    );

    liste
    .sort((a,b)=>b.id-a.id)
    .forEach(transaction => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${transaction.date}</td>

            <td>${transaction.description}</td>

            <td>
                <span class="badge ${
                    transaction.type === "revenu"
                    ? "badge-revenu"
                    : "badge-depense"
                }">

                ${
                    transaction.type
                }

                </span>
            </td>

            <td>${transaction.categorie}</td>

            <td>
                ${formatMontant(
                    transaction.montant
                )}
            </td>

            <td>
                ${transaction.piece || "-"}
            </td>

            <td>

                <button
                    class="btn-warning"
                    onclick="ouvrirEdition(${transaction.id})">

                    Modifier

                </button>

                <button
                    class="btn-danger"
                    onclick="supprimerTransaction(${transaction.id})">

                    Supprimer

                </button>

            </td>
        `;

        transactionsBody.appendChild(row);

    });

}

/* =====================================
   RECHERCHE
===================================== */

searchInput.addEventListener(
    "input",
    (e) => {

        afficherTransactions(
            e.target.value
        );

    }
);

/* =====================================
   SUPPRESSION
===================================== */

function supprimerTransaction(id) {

    if (
        !confirm(
            "Supprimer cette transaction ?"
        )
    ) return;

    transactions =
        transactions.filter(
            t => t.id !== id
        );

    sauvegarder();

    afficherTransactions();
    mettreAJourDashboard();
    verifierAlertes();

}

/* =====================================
   MODIFICATION
===================================== */

const editModal =
    document.getElementById("editModal");

const editForm =
    document.getElementById("editForm");

window.ouvrirEdition =
function(id) {

    const transaction =
        transactions.find(
            t => t.id === id
        );

    document.getElementById(
        "editId"
    ).value = transaction.id;

    document.getElementById(
        "editDate"
    ).value = transaction.date;

    document.getElementById(
        "editDescription"
    ).value = transaction.description;

    document.getElementById(
        "editMontant"
    ).value = transaction.montant;

    document.getElementById(
        "editType"
    ).value = transaction.type;

    document.getElementById(
        "editCategorie"
    ).value = transaction.categorie;

    editModal.classList.remove(
        "hidden"
    );

};

document
.getElementById("closeModal")
.addEventListener("click", () => {

    editModal.classList.add(
        "hidden"
    );

});

editForm.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        const id = Number(
            document.getElementById(
                "editId"
            ).value
        );

        const transaction =
            transactions.find(
                t => t.id === id
            );

        transaction.date =
            document.getElementById(
                "editDate"
            ).value;

        transaction.description =
            document.getElementById(
                "editDescription"
            ).value;

        transaction.montant =
            Number(
                document.getElementById(
                    "editMontant"
                ).value
            );

        transaction.type =
            document.getElementById(
                "editType"
            ).value;

        transaction.categorie =
            document.getElementById(
                "editCategorie"
            ).value;

        sauvegarder();

        afficherTransactions();
        mettreAJourDashboard();
        verifierAlertes();

        editModal.classList.add(
            "hidden"
        );

    }
);

/* =====================================
   ALERTES
===================================== */

function verifierAlertes() {

    alertContainer.innerHTML = "";

    const depenses =
        calculerTotaux().depenses;

    if (budgetGlobal <= 0) return;

    const ratio =
        depenses / budgetGlobal;

    if (ratio >= 1) {

        ajouterAlerte(
            "Budget dépassé.",
            "danger"
        );

    }
    else if (ratio >= 0.8) {

        ajouterAlerte(
            "80% du budget utilisé.",
            "warning"
        );

    }

}

function ajouterAlerte(
    texte,
    type
) {

    const div =
        document.createElement("div");

    div.className =
        `alert alert-${type}`;

    div.textContent = texte;

    alertContainer.appendChild(div);

}

/* =====================================
   EXPORT CSV
===================================== */

document
.getElementById("exportBtn")
.addEventListener("click", () => {

    let csv =
        "Date,Description,Type,Categorie,Montant\n";

    transactions.forEach(t => {

        csv +=
            `${t.date},${t.description},${t.type},${t.categorie},${t.montant}\n`;

    });

    const blob =
        new Blob(
            [csv],
            {
                type: "text/csv"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;
    a.download =
        "transactions.csv";

    a.click();

});

/* =====================================
   CHART.JS
===================================== */

function mettreAJourGraphique() {

    const ctx =
        document
        .getElementById("budgetChart")
        .getContext("2d");

    const totals =
        calculerTotaux();

    if (chart) {

        chart.destroy();

    }

    chart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [
                "Dépenses",
                "Disponible"
            ],

            datasets: [

                {

                    data: [

                        totals.depenses,

                        Math.max(
                            totals.restant,
                            0
                        )

                    ]

                }

            ]

        }

    });

}

/* =====================================
   FORMAT MONÉTAIRE
===================================== */

function formatMontant(
    montant
) {

    return montant.toLocaleString(
        "fr-CA",
        {
            style: "currency",
            currency: "CAD"
        }
    );

}

/* ======================
   SERVICE WORKER
====================== */

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
            .register(
                "./service-worker.js"
            )

            .then(() => {

                console.log(
                    "Service Worker actif"
                );

            })

            .catch(error => {

                console.error(
                    error
                );

            });

        }
    );

}

/* ======================
   INSTALLATION PWA
====================== */

let deferredPrompt;

window.addEventListener(
    "beforeinstallprompt",
    (e) => {

        e.preventDefault();

        deferredPrompt = e;

        const btn =
            document.getElementById(
                "installBtn"
            );

        btn.classList.remove(
            "hidden"
        );

    }
);

document
.getElementById("installBtn")
.addEventListener(
    "click",
    async () => {

        if (!deferredPrompt)
            return;

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        deferredPrompt = null;

        document
        .getElementById(
            "installBtn"
        )
        .classList.add(
            "hidden"
        );

    }
);