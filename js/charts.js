let budgetChart = null;

function updateChart(revenus, depenses){

    const ctx =
        document
        .getElementById("budgetChart")
        .getContext("2d");

    if(budgetChart){
        budgetChart.destroy();
    }

    budgetChart =
        new Chart(ctx,{
            type:"doughnut",
            data:{
                labels:[
                    "Revenus",
                    "Dépenses"
                ],
                datasets:[{
                    data:[
                        revenus,
                        depenses
                    ]
                }]
            }
        });
}