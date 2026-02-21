import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Style/QuizPage.css"

function QuizPage() {
    const { category, level } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(1000);
    const [userAnswers, setUserAnswers] = useState([]);


    const categoryMap = {
        tech: 18,
        science: 17,
        sports: 21,
        entertainment: 11,
        logic: 9
    };

    // Fetch Questions from API
    useEffect(() => {
        const categoryId = categoryMap[category];

        fetch(`https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=${level}&type=multiple`)
            .then(res => res.json())
            .then(data => {
                const formatted = data.results.map(q => {
                    const options = [...q.incorrect_answers, q.correct_answer]
                        .sort(() => Math.random() - 0.5);

                    return {
                        question: q.question,
                        options,
                        answer: q.correct_answer
                    };
                });

                setQuestions(formatted);
                setLoading(false);
            });
    }, [category, level]);



    // Timer Logic
    useEffect(() => {
        if (showResult) return;

        if (timeLeft === 0) {
            setUserAnswers(prev => [
                ...prev,
                {
                    question: questions[currentQuestion].question,
                    selected: "Not Answered",
                    correct: questions[currentQuestion].answer
                }
            ]);
            handleNext();
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleAnswer = (option) => {
        const isCorrect = option === questions[currentQuestion].answer;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        setUserAnswers(prev => [
            ...prev,
            {
                question: questions[currentQuestion].question,
                selected: option,
                correct: questions[currentQuestion].answer
            }
        ]);

        handleNext();
    };

    const handleNext = () => {
        const next = currentQuestion + 1;

        if (next < questions.length) {
            setCurrentQuestion(next);
            setTimeLeft(10);
        } else {
            setShowResult(true);
        }
    };

    if (loading) {
        return (
            <div className="quiz-container">
                <h2>Loading Questions...</h2>
            </div>
        );
    }

    return (
        <div className="quiz-container">

            {!showResult ? (
                <div className="quiz-box">

                    <div className="quiz-header">
                        <h3>{category.toUpperCase()} - {level.toUpperCase()}</h3>
                        <div className="timer">{timeLeft}s</div>
                    </div>

                    <h2
                        dangerouslySetInnerHTML={{
                            __html: questions[currentQuestion].question
                        }}
                    />

                    <div className="options">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                dangerouslySetInnerHTML={{ __html: option }}
                            />
                        ))}
                    </div>

                </div>
            ) : (
                <div className="result-box">
                    <h2>Quiz Completed</h2>

                    <h3>
                        Score: {score} / {questions.length}
                    </h3>

                    {(() => {
                        const percentage = Math.round((score / questions.length) * 100);

                        return (
                            <>
                                <h4>{percentage}%</h4>

                                <div className="result-bar">
                                    <div
                                        className="result-fill"
                                        style={{
                                            background: `linear-gradient(
                                to right,
                                #28a745 ${percentage}%,
                                #dc3545 ${percentage}%
                            )`
                                        }}
                                    />
                                </div>

                                {/* REVIEW SECTION MUST BE OUTSIDE THE BAR */}
                                <div className="review-section">
                                    <h3>Answer Review</h3>

                                    {userAnswers.map((item, index) => (
                                        <div key={index} className="review-item">
                                            <h4
                                                dangerouslySetInnerHTML={{ __html: item.question }}
                                            />

                                            <p>
                                                Your Answer:
                                                <span
                                                    className={
                                                        item.selected === item.correct
                                                            ? "correct"
                                                            : "wrong"
                                                    }
                                                    dangerouslySetInnerHTML={{ __html: item.selected }}
                                                />
                                            </p>

                                            {item.selected !== item.correct && (
                                                <p>
                                                    Correct Answer:
                                                    <span
                                                        className="correct"
                                                        dangerouslySetInnerHTML={{ __html: item.correct }}
                                                    />
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        );
                    })()}

                    <button onClick={() => window.location.reload()} className="quizReloadebtn">
                        Play Again
                    </button>
                </div>
            )}

            <button className="back-btn" onClick={() => navigate("/")}>
                ⬅ Back
            </button>
        </div>
    );
}

export default QuizPage;
