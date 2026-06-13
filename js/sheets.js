const API_URL =
"https://script.google.com/macros/s/AKfycbykgZj_ha0F4nCIlUxBM_D0URURdobOVCxET5oPHrYo5sHxaK9AtWtN6iBqBQq_Qjkk/exec";

async function saveTransactionCloud(
    transaction
){

    try{

        await fetch(
            API_URL,
            {
                method:"POST",
                body:JSON.stringify(
                    transaction
                )
            }
        );

    }catch(error){

        console.error(error);
    }
}