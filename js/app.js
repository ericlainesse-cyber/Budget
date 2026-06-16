let transactions = [];

const tbody =
document.querySelector(
"#transactions tbody"
);

async function loadData(){

  transactions =
    await getTransactions();

  render();

}

function render(){

  tbody.innerHTML = "";

  const searchValue =
    document
    .getElementById("search")
    .value
    .toLowerCase();

  const filtered =
    transactions.filter(t =>

      JSON.stringify(t)
      .toLowerCase()
      .includes(searchValue)

    );

  filtered.forEach(t => {

    const tr =
      document.createElement("tr");

    tr.innerHTML = `
      <td>${t.date}</td>
      <td>${t.description}</td>
      <td>${t.montant}</td>
      <td>

      <button
      class="action edit"
      onclick="editTransaction('${t.id}')">

      Modifier

      </button>

      <button
      class="action delete"
      onclick="removeTransaction('${t.id}')">

      Supprimer

      </button>

      </td>
    `;

    tbody.appendChild(tr);

  });

  calculateDashboard();

}

function calculateDashboard(){

  let depenses = 0;
  let revenus = 0;

  transactions.forEach(t => {

    if(t.type === "depense")
      depenses += Number(t.montant);

    else
      revenus += Number(t.montant);

  });

  const budget = 10000;

  document.getElementById("budget")
    .innerText = budget + " $";

  document.getElementById("spent")
    .innerText = depenses + " $";

  document.getElementById("remaining")
    .innerText =
      budget - depenses + " $";

}

document
.getElementById("search")
.addEventListener("input",render);

document
.getElementById("themeToggle")
.addEventListener("click",() => {

  document.body
    .classList.toggle("dark");

});

document
.getElementById("transactionForm")
.addEventListener("submit",
async e => {

  e.preventDefault();

  await addTransaction({

    date:
      document.getElementById("date").value,

    type:
      document.getElementById("type").value,

    description:
      document.getElementById("description").value,

    category:
      document.getElementById("category").value,

    montant:
      document.getElementById("amount").value

  });

  e.target.reset();

  loadData();

});

async function removeTransaction(id){

  if(confirm("Supprimer ?")){

    await deleteTransaction(id);

    loadData();

  }

}

loadData();