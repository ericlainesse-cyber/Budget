function verifierBudget(
    budget,
    depenses
){

    if(budget <= 0){
        return;
    }

    const taux =
        (depenses / budget) * 100;

    if(taux >= 100){

        alert(
            "⚠️ Budget dépassé"
        );

    }else if(taux >= 90){

        alert(
            "⚠️ 90% du budget atteint"
        );

    }else if(taux >= 80){

        alert(
            "⚠️ 80% du budget atteint"
        );
    }
}