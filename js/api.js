async function getTransactions() {

  const response =
    await fetch(API_URL);

  return await response.json();

}

async function addTransaction(data) {

  return await fetch(API_URL,{

    method:"POST",

    body: JSON.stringify({

      action:"add",
      ...data

    })

  });

}

async function updateTransaction(data){

  return await fetch(API_URL,{

    method:"POST",

    body: JSON.stringify({

      action:"update",
      ...data

    })

  });

}

async function deleteTransaction(id){

  return await fetch(API_URL,{

    method:"POST",

    body: JSON.stringify({

      action:"delete",
      id

    })

  });

}