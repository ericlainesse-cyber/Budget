const API_URL =
"https://script.google.com/macros/s/AKfycbxQBHPDv2Jm8_Hzo92esXMZxubRUlbrctC5P_QeCHG7E26RhmjN-oiGUU4CV1M67k6yRg/exec";

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