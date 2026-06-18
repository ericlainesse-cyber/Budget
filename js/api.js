const API_URL =
"https://script.google.com/macros/s/AKfycbxHWIUB0TuiswGes2exD3qIioEzUhebGEcVBZPE0F8mbsPA6ywYnFzD8d2GquWGlla2qA/exec";

async function getTransactions() {

  const response =
    await fetch(
      `${API_URL}?action=list`
    );

  return response.json();

}

async function addTransactionAPI(data) {

  const response =
    await fetch(API_URL, {

      method: "POST",

      body: JSON.stringify({

        action: "add",

        ...data

      })

    });

  return response.json();

}

async function updateTransactionAPI(data) {

  const response =
    await fetch(API_URL, {

      method: "POST",

      body: JSON.stringify({

        action: "update",

        ...data

      })

    });

  return response.json();

}

async function deleteTransactionAPI(id) {

  const response =
    await fetch(API_URL, {

      method: "POST",

      body: JSON.stringify({

        action: "delete",

        id

      })

    });

  return response.json();

}