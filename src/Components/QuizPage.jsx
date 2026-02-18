import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function QuizPage() {
    const { category, level } = useParams();
    const navigate = useNavigate();

    // Sample quiz data (expand later)
    const quizData = {
        tech: {
            easy: [
                {
                    question: "What does CPU stand for?",
                    options: ["Central Processing Unit", "Computer Power Unit", "Control Panel Unit", "Core Program Unit"],
                    answer: "Central Processing Unit"
                },
                {
                    question: "Which company created React?",
                    options: ["Google", "Microsoft", "Facebook", "Amazon"],
                    answer: "Facebook"
                }
            ]
        }
    };

    const questions = quizData[category]?.[level] || [];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    if (questions.length === 0) {
        return (
            <div style={{ padding: "40px", color: "white", background: "black", minHeight: "100vh" }}>
                <h2>No questions available for {category} - {level}</h2>
                <button onClick={() => navigate("/")}>Go Back</button>
            </div>
        );
    }

    const handleAnswer = (option) => {
        if (option === questions[currentQuestion].answer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResult(true);
        }
    };

    return (
        <div style={{ padding: "40px", color: "white", background: "black", minHeight: "100vh" }}>
            
            <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>
                ⬅ Back to Categories
            </button>

            <h1>Quiz</h1>
            <h3>Category: {category}</h3>
            <h4>Difficulty: {level}</h4>

            {!showResult ? (
                <div>
                    <h2>{questions[currentQuestion].question}</h2>

                    {questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            style={{
                                display: "block",
                                margin: "10px 0",
                                padding: "10px 20px"
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            ) : (
                <div>
                    <h2>Your Score: {score} / {questions.length}</h2>
                    <button onClick={() => navigate("/")}>
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
}

export default QuizPage;
