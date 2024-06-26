document.addEventListener('DOMContentLoaded', () => {
    const calcbutton = document.getElementById('calc-button')
    const refreshbutton = document.getElementById('refresh-button')
    const updatesentence = document.getElementById('answerFeedback')
    const mathSelections = document.querySelectorAll('.mathSelections')
    const operatorSelections = document.getElementById('math_Operator')
    const operatorOutout = document.getElementById('MATHoperator')
    const mathCAND_Ubound = document.getElementById('mathCAND_Ubound')
    const mathCAND_Lbound = document.getElementById('mathCAND_Lbound')
    const mathPLIER_Ubound = document.getElementById('mathPLIER_Ubound')
    const mathPLIER_Lbound = document.getElementById('mathPLIER_Lbound')
    const MATHcand = document.getElementById('MATHcand')
    const MATHplier = document.getElementById('MATHplier')
    const userAnswer = document.getElementById('userAnswer')
    const storage = {};

    // functions
function loadfromlocalstorage () {
    if(localStorage.getItem('mathCAND_Lbound')) {
        mathCAND_Lbound.value = localStorage.getItem('mathCAND_Lbound')
    }
    if(localStorage.getItem('mathCAND_Ubound')) {
        mathCAND_Ubound.value = localStorage.getItem('mathCAND_Ubound')
    }
    if(localStorage.getItem('mathPLIER_Lbound')) {
        mathPLIER_Lbound.value = localStorage.getItem('mathPLIER_Lbound')
    }
    if(localStorage.getItem('mathPLIER_Ubound')) {
        mathPLIER_Ubound.value = localStorage.getItem('mathPLIER_Ubound')
    }
    if(localStorage.getItem('mathOperator')) {
        operatorSelections.value = localStorage.getItem('mathOperator')
        operatorOutout.textContent = localStorage.getItem('mathOperator')
    }
}

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function refresh () {
        MATHcand.value = getRandom(parseInt(mathCAND_Lbound.value, 10),parseInt(mathCAND_Ubound.value, 10))
        MATHcand.textContent = MATHcand.value
        
        MATHplier.value = getRandom(parseInt(mathPLIER_Lbound.value, 10),parseInt(mathPLIER_Ubound.value, 10));
        MATHplier.textContent = MATHplier.value

    }

    function saveuserinputs () {
        localStorage.setItem('mathCAND_Lbound', mathCAND_Lbound.value)
        localStorage.setItem('mathCAND_Ubound', mathCAND_Ubound.value)
        localStorage.setItem('mathPLIER_Lbound', mathPLIER_Lbound.value)
        localStorage.setItem('mathPLIER_Ubound', mathPLIER_Ubound.value)
        localStorage.setItem('mathOperator', operatorSelections.value)
    }

    function resetuseranswer () {
        userAnswer.value = '';
    }

    function userAnswerExecute () {
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
            case '^':
                    result = MATHcandValue ** MATHplierValue
                
                break;
        }

        if (result === userAnswerValue){
            updatesentence.textContent = `Correct! ${MATHcand.value} ${operatorSelections.value} ${MATHplier.value} = ${result}`;
        } else {
            updatesentence.textContent = `Wrong. ${MATHcand.value} ${operatorSelections.value} ${MATHplier.value} = ${result}, you entered ${userAnswer.value}`;
        }
        refresh()
        resetuseranswer()
    }


    // selection entry recording
    mathSelections.forEach(mathSelections => {
        mathSelections.addEventListener('input', (event) => {
            const mathSelectionsID = event.target.id; //get specific math selection ID
            const mathSelectionsValue = event.target.value; //get the value of the specifc math selectoin
            storage[mathSelectionsID] = mathSelectionsValue; // store the value in the storage object
        })
    })

    operatorSelections.addEventListener('input', (event) => {
        operatorSelections.value = event.target.value
        localStorage.setItem('mathOperator', operatorSelections.value)
        const operatorSelectionOutput = document.getElementById('MATHoperator')
        operatorSelectionOutput.textContent = `${localStorage.getItem('mathOperator')}`
    })

    userAnswer.addEventListener('input', (event) => {
        userAnswer.value = event.target.value
    })

    // data retrieval

    // calculation
    calcbutton.addEventListener('click', function() {
      userAnswerExecute()
    });

    userAnswer.addEventListener('keydown',(event) => {
        if (event.key === 'Enter') {
            userAnswerExecute()
        }
    })

    // Refresh
    refreshbutton.addEventListener('click', function() {
        refresh() 
        saveuserinputs()
    })

    loadfromlocalstorage()
    refresh()

});