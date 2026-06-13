let budget =
Number(
localStorage.getItem("budget")
) || 0;

let transactions =
JSON.parse(
localStorage.getItem(
"transactions"
)
) || [];

const budgetInput =
document.getElementById(
"budgetInput"
);

document
.getElementById(
"saveBudgetBtn"
)
.addEventListener(
"click",
saveBudget
);

document
.getElementById(
"addTransactionBtn"
)
.addEventListener(
"click",
addTransaction
);

function saveBudget(){

    budget =
    Number(
        budgetInput.value
    );

    localStorage.setItem(
        "budget",
        budget
    );

    render();
}

async function addTransaction(){

    const transaction = {

        date:
        new Date()
        .toLocaleDateString(),

        type:
        document
        .getElementById("type")
        .value,

        description:
        document
        .getElementById(
            "description"
        )
        .value,

        categorie:
        document
        .getElementById(
            "categorie"
        )
        .value,

        montant:
        Number(
            document
            .getElementById(
                "montant"
            )
            .value
        )
    };

    transactions.push(
        transaction
    );

    localStorage.setItem(
        "transactions",
        JSON.stringify(
            transactions
        )
    );

    await saveTransactionCloud(
        transaction
    );

    render();
}

function render(){

    let revenus = 0;
    let depenses = 0;

    transactions.forEach(t=>{

        if(
            t.type ===
            "revenu"
        ){

            revenus +=
            t.montant;

        }else{

            depenses +=
            t.montant;
        }
    });

    document
    .getElementById(
        "budgetTotal"
    )
    .innerText =
    budget + " $";

    document
    .getElementById(
        "revenusTotal"
    )
    .innerText =
    revenus + " $";

    document
    .getElementById(
        "depensesTotal"
    )
    .innerText =
    depenses + " $";

    document
    .getElementById(
        "restantTotal"
    )
    .innerText =
    (budget - depenses)
    + " $";

    const tbody =
    document
    .getElementById(
        "transactionsTable"
    );

    tbody.innerHTML = "";

    transactions.forEach(t=>{

        tbody.innerHTML += `
        <tr>
            <td>${t.date}</td>
            <td>${t.type}</td>
            <td>${t.description}</td>
            <td>${t.categorie}</td>
            <td>${t.montant}$</td>
        </tr>`;
    });

    updateChart(
        revenus,
        depenses
    );

    verifierBudget(
        budget,
        depenses
    );
}

render();