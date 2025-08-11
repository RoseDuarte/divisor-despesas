const form = document.getElementById('expense-form');
const totalInput = document.getElementById('total');
const peopleInput = document.getElementById('people');
const resultDiv = document.getElementById('result');
const perPersonText = document.getElementById('per-person');
const feedbackText = document.getElementById('feedback');
const resetBtn = document.getElementById('reset-btn');

const totalError = document.getElementById('total-erro');
const peopleError = document.getElementById('people-erro');

totalInput.addEventListener('input', () => {
    totalError.textContent = '';
    totalInput.classList.remove('input-error')
})

peopleInput.addEventListener('input', () => {
    peopleError.textContent = '';
    peopleInput.classList.remove('input-error');
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    totalError.textContent = '';
    peopleError.textContent = '';
    totalInput.classList.remove('input-error')
    peopleInput.classList.remove('input-error');

    const total = parseFloat(totalInput.value);
    const people = parseInt(peopleInput.value);
    let isValid = true;

    if(isNaN(total) || total <= 0) {
        totalError.textContent = 'Informe um valor maior que zero.';
        totalInput.classList.add('input-error');
        isValid = false;
    }

    if(isNaN(people) || people <= 0) {
        peopleError.textContent = 'Informe um número de pessoa válido.'
        peopleInput.classList.add('input-error');
        isValid = false;
    }

    if(!isValid) {
        resultDiv.classList.add('hidden');
        return;
    }

    const perPerson = total / people;
    perPersonText.innerHTML = `💸 Cada pessoa paga: <strong>R$ ${perPerson.toFixed(2)}</strong>`;
    feedbackText.textContent = getFeedback(perPerson);

    resultDiv.classList.add('hidden');
    resultDiv.classList.remove('animate-fade');
    void resultDiv.offsetWidth;
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('animate-fade')
});

function getFeedback(value) {
    if(value < 20) {
        return "😄 Bem leve! Pode pagar tranquilo.";
    } else if(value <= 50) {
        return "😌 Justo, mas sente no crédito.";
    } else {
        return "😬 Pesado! Já pensou em dividir mais?";
    }
}

resetBtn.addEventListener('click', () => {
    totalInput.value = '';
    peopleInput.value = '';

    totalError.textContent = '';
    peopleError.textContent = '';

    totalInput.classList.remove('input-error')
    peopleInput.classList.remove('input-error')

    resultDiv.classList.add('hidden');

    perPersonText.innerHTML = '';
    feedbackText.textContent = '';
})