
let rows=[];
const txBody=document.getElementById('transactions');
document.getElementById('themeToggle').onclick=()=>document.body.classList.toggle('dark');

document.getElementById('txForm').onsubmit=async e=>{
e.preventDefault();
const data={
action:'save',
date:date.value,type:type.value,description:description.value,
category:category.value,amount:amount.value
};
await saveTransaction(data);
load();
};

async function load(){
try{rows=await getTransactions();render();}catch(e){console.error(e);}
}
function render(){
txBody.innerHTML='';
(rows||[]).forEach(r=>{
txBody.innerHTML+=`<tr><td>${r.date||''}</td><td>${r.type||''}</td><td>${r.description||''}</td><td>${r.amount||''}</td><td><button onclick="deleteTransaction('${r.id}')">Supprimer</button></td></tr>`;
});
}
load();
if('serviceWorker' in navigator){navigator.serviceWorker.register('service-worker.js');}
