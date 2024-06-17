document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('update-button')
    const updatesentence = document.getElementById('updateable-sentence')
    const inputSentence = document.getElementById('inputSentence')
    const mathSelections = document.querySelectorAll('.mathSelections')
    const operatorSelections = document.getElementById('math_Operator')
    const storage = {};

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

    // data retrieval

    // calculation
    button.addEventListener('click', () => {
        const inputValue = inputSentence.value;
        updatesentence.textContent = `${inputValue}`
    });

   
});