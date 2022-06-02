export default class TopUpCredit {
    creditAmount = 0;
    creditCashValueInCNY = 0;
    quantity = 0;

    constructor(creditAmount) {
        this.creditAmount = creditAmount;
        this.creditCashValueInCNY = creditAmount / 10;
    }

    addToQuantity = (adjustQuantity) => {
        this.quantity += adjustQuantity;
    }

    displayInfo = () => {
        console.log(this.creditAmount, 'Credit =' , this.quantity , 'pcs');
    }

    getQuantity = () => {
        return this.quantity;
    }

    getCreditAmount = () => {
        return this.creditAmount;
    }

    getCreditCashValueInCNY = () => {
        return this.creditCashValueInCNY;
    }

    resetCredit = () => {
        this.creditAmount = 0;
        this.creditCashValueInCNY = 0;
        this.addToQuantity(-this.quantity);
    }
}