
async function getTransactions(){const r=await fetch(API_URL);return r.json();}
async function saveTransaction(data){return fetch(API_URL,{method:'POST',body:JSON.stringify(data)});}
async function deleteTransaction(id){return fetch(API_URL,{method:'POST',body:JSON.stringify({action:'delete',id})});}
