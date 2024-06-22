document.addEventListener('DOMContentLoaded', () => {
    const calcbutton = document.getElementById('calc-button')
    const refreshbutton = document.getElementById('refresh-button')
    const updatesentence = document.getElementById('answerFeedback')
    const mathSelections = document.querySelectorAll('.mathSelections')
    const operatorSelections = document.getElementById('math_Operator')
    const mathCAND_Ubound = document.getElementById('mathCAND_Ubound')
    const mathCAND_Lbound = document.getElementById('mathCAND_Lbound')
    const mathPLIER_Ubound = document.getElementById('mathPLIER_Ubound')
    const mathPLIER_Lbound = document.getElementById('mathPLIER_Lbound')
    const MATHcand = document.getElementById('MATHcand')
    const MATHplier = document.getElementById('MATHplier')
    const userAnswer = document.getElementById('userAnswer')
    const storage = {};

    // functions
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function refresh () {
        MATHcand.value = getRandom(parseInt(mathCAND_Lbound.value, 10),parseInt(mathCAND_Ubound.value, 10))
        MATHcand.textContent = MATHcand.value
        
        MATHplier.value = getRandom(parseInt(mathPLIER_Lbound.value, 10),parseInt(mathPLIER_Ubound.value, 10));
        MATHplier.textContent = MATHplier.value

    }


    // selection entry recording
    mathSelections.forEach(mathSelections => {
        mathSelections.addEventListener('input', (event) => {
            const mathSelectionsID = event.target.id; //get specific math selection ID
            const mathSelectionsValue = event.target.value; //get the value of the specifc math selectoin
            storage[mathSelectionsID] = mathSelectionsValue; // store the value in the storage object
            console.log(storage);
        })
    })

    operatorSelections.addEventListener('input', (event) => {
        const operatorSelectionValue = event.target.value
        const operatorSelectionOutput = document.getElementById('MATHoperator')
        operatorSelectionOutput.textContent = `${operatorSelectionValue}`
    })

    userAnswer.addEventListener('input', (event) => {
        userAnswer.value = event.target.value
        console.log(userAnswer.value)
    })

    // data retrieval

    // calculation
    calcbutton.addEventListener('click', function() {
        let result
        const MATHcandValue = parseFloat(MATHcand.textContent);
        const MATHplierValue = parseFloat(MATHplier.textContent);
        const userAnswerValue = parseFloat(userAnswer.value)


        switch (operatorSelections.value) {
            case '+':
                result = MATHcandValue + MATHplierValue
                break;
            case '-':
                result = MATHcandValue - MATHplierValue
                break;
            case 'x':
                result = MATHcandValue * MATHplierValue
                break;
            case '&divide':
                if (MATHplier !== 0) {
                    result = MATHcandValue / MATHplierValue;
                } else {
                    result = 'Divided by zero!'
                }
                break;
        }

        if (result === userAnswerValue){
            updatesentence.textContent = `Correct! ${MATHcand.value} ${operatorSelections.value} ${MATHplier.value} = ${result}`;
        } else {
            updatesentence.textContent = `Wrong. ${MATHcand.value} ${operatorSelections.value} ${MATHplier.value} = ${result}, you entered ${userAnswer.value}`;
        }
        refresh()
    });

    // Refresh
    refreshbutton.addEventListener('click', refresh);

});