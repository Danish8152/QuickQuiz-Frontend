
const scienceQuestions = {
    Easy: [
        {
            question: "What planet is known as the Red Planet?",
            options: ["Earth", "Venus", "Mars", "Jupiter"],
            answer: "Mars"
        },
        {
            question: "What gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            answer: "Carbon Dioxide"
        },
        {
            question: "Which part of the plant conducts photosynthesis?",
            options: ["Root", "Leaf", "Stem", "Flower"],
            answer: "Leaf"
        },
        {
            question: "How many legs does an insect have?",
            options: ["4", "6", "8", "10"],
            answer: "6"
        },
        {
            question: "Which is the closest star to Earth?",
            options: ["Alpha Centauri", "Polaris", "Sirius", "The Sun"],
            answer: "The Sun"
        }
    ],
    Medium: [
        {
            question: "What is the chemical formula for water?",
            options: ["CO2", "H2O", "O2", "NaCl"],
            answer: "H2O"
        },
        {
            question: "Which organ in the human body filters blood?",
            options: ["Lungs", "Liver", "Kidney", "Heart"],
            answer: "Kidney"
        },
        {
            question: "What is the process by which a solid turns directly into gas?",
            options: ["Evaporation", "Condensation", "Sublimation", "Deposition"],
            answer: "Sublimation"
        },
        {
            question: "What part of the cell contains genetic material?",
            options: ["Cytoplasm", "Nucleus", "Cell membrane", "Mitochondria"],
            answer: "Nucleus"
        },
        {
            question: "Which vitamin is produced in the skin when exposed to sunlight?",
            options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
            answer: "Vitamin D"
        }
    ],
    Hard: [
        {
            question: "Which of these particles has no electrical charge?",
            options: ["Proton", "Electron", "Neutron", "Positron"],
            answer: "Neutron"
        },
        {
            question: "Which law states that energy cannot be created or destroyed?",
            options: ["Newton's First Law", "Law of Conservation of Energy", "Ohm's Law", "Boyle's Law"],
            answer: "Law of Conservation of Energy"
        },
        {
            question: "What is the powerhouse of the cell?",
            options: ["Chloroplast", "Ribosome", "Mitochondria", "Golgi body"],
            answer: "Mitochondria"
        },
        {
            question: "What is the SI unit of force?",
            options: ["Joule", "Watt", "Newton", "Pascal"],
            answer: "Newton"
        },
        {
            question: "Which element has the atomic number 6?",
            options: ["Carbon", "Oxygen", "Nitrogen", "Hydrogen"],
            answer: "Carbon"
        }
    ]
};

// Global variables
let currentQuestions = [];
let currentIndex = 0;
let currentLevel = '';
let score = 0;
let timerInterval;
let timeRemaining = 30;
let questionStartTime;
let totalTimeSpent = 0;
let quizResults = {
    answers: [],
    timePerQuestion: []
};
let scoreChart = null;
let timeChart = null;

// Start the quiz
function startQuiz(level) {
    // Reset variables
    currentQuestions = scienceQuestions[level];
    currentLevel = level;
    currentIndex = 0;
    score = 0;
    quizResults = {
        answers: [],
        timePerQuestion: []
    };
    totalTimeSpent = 0;

    // Update difficulty badge
    const badge = document.getElementById('difficultyBadge');
    badge.innerText = level;
    badge.className = 'badge badge-' + level.toLowerCase();

    // Hide welcome screen, show quiz
    document.getElementById('welcomeScreen').classList.add('d-none');
    document.getElementById('quizContainer').classList.remove('d-none');
    document.getElementById('resultsContainer').classList.add('d-none');

    // Start showing questions
    showQuestion();
    updateProgress();
}

// Show the current question
function showQuestion() {
    const current = currentQuestions[currentIndex];
    document.getElementById('questionNumber').innerText = `Question ${currentIndex + 1} of ${currentQuestions.length}`;
    document.getElementById('questionText').innerText = current.question;

    // Reset timer
    timeRemaining = 30;
    document.getElementById('timer').innerText = timeRemaining;
    document.getElementById('timer').style.color = ''; // Reset color
    clearInterval(timerInterval);
    startTimer();
    questionStartTime = Date.now();

    // Add options
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    current.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-secondary';
        btn.innerText = option;
        btn.onclick = () => selectAnswer(option);
        optionsContainer.appendChild(btn);
    });

    // Hide next button, show skip button
    document.getElementById('nextBtn').classList.add('d-none');
    document.getElementById('skipBtn').classList.remove('d-none');
}

// Select an answer
function selectAnswer(selectedOption) {
    clearInterval(timerInterval);
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    totalTimeSpent += timeSpent;
    quizResults.timePerQuestion.push(timeSpent);

    const correctAnswer = currentQuestions[currentIndex].answer;
    const isCorrect = selectedOption === correctAnswer;

    // Disable all buttons but don't show the correct answer
    const buttons = document.querySelectorAll('#options button');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === selectedOption) {
            btn.classList.remove('btn-outline-secondary');
            // Just highlight the selected answer without indicating if it's correct
            btn.classList.add('btn-primary');
        }
    });

    if (isCorrect) {
        score++;
    }

    // Record the answer
    quizResults.answers.push({
        question: currentQuestions[currentIndex].question,
        userAnswer: selectedOption,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
        isSkipped: false
    });

    // Show next button, hide skip button
    document.getElementById('nextBtn').classList.remove('d-none');
    document.getElementById('skipBtn').classList.add('d-none');
    document.getElementById('nextBtn').onclick = moveToNextQuestion;
}

// Skip the current question
document.getElementById('skipBtn').addEventListener('click', function () {
    clearInterval(timerInterval);
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    totalTimeSpent += timeSpent;
    quizResults.timePerQuestion.push(timeSpent);

    const correctAnswer = currentQuestions[currentIndex].answer;

    // Record the skipped answer
    quizResults.answers.push({
        question: currentQuestions[currentIndex].question,
        userAnswer: null,
        correctAnswer: correctAnswer,
        isCorrect: false,
        isSkipped: true
    });

    moveToNextQuestion();
});

// Move to the next question or end the quiz
function moveToNextQuestion() {
    currentIndex++;
    updateProgress();

    if (currentIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Update the progress bar
function updateProgress() {
    const progressPercentage = (currentIndex / currentQuestions.length) * 100;
    document.getElementById('quizProgress').style.width = `${progressPercentage}%`;
}

// Start the timer
function startTimer() {
    timerInterval = setInterval(function () {
        timeRemaining--;
        document.getElementById('timer').innerText = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            // Auto-skip when time runs out
            document.getElementById('skipBtn').click();
        } else if (timeRemaining <= 5) {
            document.getElementById('timer').style.color = '#dc3545';
        }
    }, 1000);
}

// Show the results page
function showResults() {
    // Hide quiz, show results
    document.getElementById('quizContainer').classList.add('d-none');
    document.getElementById('resultsContainer').classList.remove('d-none');

    // Calculate actual score based on results
    const correctAnswers = quizResults.answers.filter(a => a.isCorrect).length;
    const totalQuestions = quizResults.answers.length;

    // Update result summary
    document.getElementById('resultScore').innerText = `${correctAnswers}/${totalQuestions}`;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    document.getElementById('resultPercentage').innerText = `${percentage}%`;

    // Format time taken
    const minutes = Math.floor(totalTimeSpent / 60);
    const seconds = totalTimeSpent % 60;
    document.getElementById('resultTime').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Generate question review
    generateQuestionReview();

    // Create charts - removed setTimeout to fix charts not rendering
    createScoreChart();
    createTimeChart();

    // Add event listeners for buttons
    document.getElementById('retryBtn').onclick = () => startQuiz(currentLevel);
    document.getElementById('newQuizBtn').onclick = () => {
        document.getElementById('welcomeScreen').classList.remove('d-none');
        document.getElementById('resultsContainer').classList.add('d-none');
    };

    // Save results to localStorage
    localStorage.setItem("quizResults", JSON.stringify(quizResults));
    localStorage.setItem("totalTimeSpent", totalTimeSpent);

}

// Generate the question review section
function generateQuestionReview() {
    const container = document.getElementById('questionReview');
    container.innerHTML = '';

    quizResults.answers.forEach((result, index) => {
        const questionDiv = document.createElement('div');
        let statusClass = result.isSkipped ? 'skipped' : (result.isCorrect ? 'correct' : 'incorrect');
        questionDiv.className = `question-review ${statusClass}`;

        let statusIcon = result.isSkipped ?
            '<i class="bi bi-skip-forward text-warning"></i>' :
            (result.isCorrect ? '<i class="bi bi-check-circle text-success"></i>' : '<i class="bi bi-x-circle text-danger"></i>');

        let userAnswerText = result.isSkipped ?
            '<span class="text-warning">Skipped</span>' :
            `<span class="${result.isCorrect ? 'text-success' : 'text-danger'}">${result.userAnswer}</span>`;

        questionDiv.innerHTML = `
                    <div class="d-flex justify-content-between">
                        <h5 class="mb-2">Question ${index + 1}</h5>
                        <div>${statusIcon}</div>
                    </div>
                    <p>${result.question}</p>
                    <div class="d-flex justify-content-between">
                        <div>Your answer: ${userAnswerText}</div>
                        <div>Correct answer: <span class="text-success">${result.correctAnswer}</span></div>
                    </div>
                    <div class="text-muted mt-2">Time spent: ${quizResults.timePerQuestion[index]} seconds</div>
                `;

        container.appendChild(questionDiv);
    });
}

// Create the score distribution chart
function createScoreChart() {
    const ctx = document.getElementById('scoreChart').getContext('2d');

    // Calculate actual values from quiz results
    const correct = quizResults.answers.filter(a => a.isCorrect).length;
    const skipped = quizResults.answers.filter(a => a.isSkipped).length;
    const incorrect = quizResults.answers.filter(a => !a.isCorrect && !a.isSkipped).length;

    // If there are no questions answered yet, don't render chart
    if (quizResults.answers.length === 0) return;

    // Destroy previous chart if it exists
    if (scoreChart) {
        scoreChart.destroy();
    }

    // Create new chart
    scoreChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect', 'Skipped'],
            datasets: [{
                data: [correct, incorrect, skipped],
                backgroundColor: ['#28a745', '#dc3545', '#fd7e14'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: true,
                    text: 'Score Distribution',
                    color: 'white',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const percentage = Math.round((value / quizResults.answers.length) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Create the time spent per question chart
function createTimeChart() {
    const ctx = document.getElementById('timeChart').getContext('2d');

    // If there are no questions answered yet, don't render chart
    if (quizResults.timePerQuestion.length === 0) return;

    // Generate dynamic labels based on actual questions answered
    const labels = quizResults.answers.map((_, i) => `Q${i + 1}`);

    // Destroy previous chart if it exists
    if (timeChart) {
        timeChart.destroy();
    }

    // Get dynamic colors based on actual answer results
    const barColors = quizResults.answers.map(answer =>
        answer.isSkipped ? '#fd7e14' : (answer.isCorrect ? '#28a745' : '#dc3545')
    );

    // Create new chart
    timeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Time (seconds)',
                data: quizResults.timePerQuestion,
                backgroundColor: barColors,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Time Spent per Question',
                    color: 'white',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const value = context.raw || 0;
                            return `${value} seconds`;
                        },
                        title: function (context) {
                            const index = context[0].dataIndex;
                            const questionData = quizResults.answers[index];
                            let status = questionData.isSkipped ? 'Skipped' : (questionData.isCorrect ? 'Correct' : 'Incorrect');
                            return `Question ${index + 1} (${status})`;
                        }
                    }
                }
            }
        }
    });
}