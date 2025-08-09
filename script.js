// Import the array of question objects from the external file
import { questions } from './questions.js';

// Get references to our HTML elements
const quizContainer = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answerOptionsEl = document.getElementById('answer-options');
const submitBtn = document.getElementById('submit-btn');

let currentQuiz = 0;
let score = 0;

// --- Main function to load a question and its answers ---
function loadQuiz() {
    deselectAnswers(); // Clear previous selections
    
    const currentQuizData = questions[currentQuiz];
    
    questionEl.innerText = currentQuizData.question;
    answerOptionsEl.innerHTML = ''; // Clear previous options

    // Dynamically create the list items for the answer options
    for (const key in currentQuizData.options) {
        const optionItem = document.createElement('li');
        optionItem.innerHTML = `
            <input type="radio" name="answer" id="${key}" class="answer">
            <label for="${key}">${currentQuizData.options[key]}</label>
        `;
        answerOptionsEl.appendChild(optionItem);
    }
}

// --- Helper function to get the selected answer ---
function getSelected() {
    let answer;
    const answerEls = document.querySelectorAll('.answer');
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

// --- Helper function to clear checked radio buttons ---
function deselectAnswers() {
    const answerEls = document.querySelectorAll('.answer');
    answerEls.forEach(answerEl => answerEl.checked = false);
}

// --- Event Listener for the submit button ---
submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    
    if (answer) {
        // Check if the answer is correct
        if (answer === questions[currentQuiz].correct) {
            score++;
        }
        
        // Move to the next question
        currentQuiz++;
        
        if (currentQuiz < questions.length) {
            loadQuiz();
        } else {
            // End of the quiz - show results
            quizContainer.innerHTML = `
                <h2>You answered ${score}/${questions.length} questions correctly!</h2>
                <button onclick="location.reload()">Reload Quiz</button>
            `;
            // Style the new button to match the old one
            const reloadBtn = quizContainer.querySelector('button');
            reloadBtn.id = 'submit-btn';
        }
    } else {
        // Optional: Alert user if no answer is selected
        alert("Please select an answer before proceeding.");
    }
});

// --- Initial Load ---
loadQuiz();
