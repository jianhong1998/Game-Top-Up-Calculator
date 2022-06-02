import TopUpCredit from "./module/TopUpCredit.js";
import Prompt from "prompt";

var settedTopUpCreditArray = [
    new TopUpCredit(10),
    new TopUpCredit(60),
    new TopUpCredit(450),
    new TopUpCredit(680),
    new TopUpCredit(1180),
    new TopUpCredit(1980),
    new TopUpCredit(3480),
    new TopUpCredit(6480)
];

Prompt.start();

let targetTopUpCredit = 0;

await Prompt.get(['targetTopUpCredit']).then((result) => targetTopUpCredit = parseInt(result.targetTopUpCredit));

const getLargestAvailableSettedTopUpCredit = (targetTopUpCreditBalance) => {
    if (targetTopUpCreditBalance > 0) {
        let largestAvailableSettedTopUpCreditArrayIndex = 0;

        for (let i = 0 ; i < settedTopUpCreditArray.length ; i++) {
            if (
                settedTopUpCreditArray[i].getCreditAmount() < targetTopUpCreditBalance &&
                settedTopUpCreditArray[i].getCreditAmount() > settedTopUpCreditArray[largestAvailableSettedTopUpCreditArrayIndex].getCreditAmount()
                ) {
                largestAvailableSettedTopUpCreditArrayIndex = i;
            }
        }

        return settedTopUpCreditArray[largestAvailableSettedTopUpCreditArrayIndex];
    }
}

const topUpCalculator = (targetTopUpCredit) => {
    if (targetTopUpCredit <= 0) {
        return;
    }

    while (targetTopUpCredit > 0) {
        const topUpCredit = getLargestAvailableSettedTopUpCredit(targetTopUpCredit);

        if (topUpCredit.getCreditAmount() > 0) {
            topUpCredit.addToQuantity(parseInt(targetTopUpCredit / topUpCredit.getCreditAmount()));
        }

        targetTopUpCredit -= topUpCredit.getCreditAmount() * topUpCredit.getQuantity();
    }
}

const displaySettedTopUpCreditArray = () => {
    for (const array of settedTopUpCreditArray) {
        console.log(array.displayInfo());
    }
}

const calculateTotalTopUpCredit = () => {
    let totalCredit = 0;
    
    for (let array of settedTopUpCreditArray) {
        totalCredit += array.getCreditAmount() * array.getQuantity();
    }

    return totalCredit;
}

topUpCalculator(targetTopUpCredit);
displaySettedTopUpCreditArray();
console.log('Check:\nTotal top up credit:' , calculateTotalTopUpCredit() , '\nExpected top up credit:' , targetTopUpCredit);