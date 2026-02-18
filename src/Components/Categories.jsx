import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Categories.css";
import Cards from "./Categories-Card";

function Categories() {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const [showDifficulty, setShowDifficulty] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // -------- Auto Scroll Logic --------
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let autoScroll;

        function startAutoScroll() {
            stopAutoScroll();
            autoScroll = setInterval(() => {
                container.scrollBy({ left: 0.5 });
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                    container.scrollLeft = 0;
                }
            }, 20);
        }

        function stopAutoScroll() {
            if (autoScroll) {
                clearInterval(autoScroll);
                autoScroll = null;
            }
        }

        startAutoScroll();

        const handleUserScroll = () => {
            stopAutoScroll();
            clearTimeout(container.resumeTimer);
            container.resumeTimer = setTimeout(startAutoScroll, 5000);
        };

        container.addEventListener("wheel", handleUserScroll);
        container.addEventListener("touchstart", handleUserScroll);
        container.addEventListener("scroll", handleUserScroll);

        return () => {
            stopAutoScroll();
            container.removeEventListener("wheel", handleUserScroll);
            container.removeEventListener("touchstart", handleUserScroll);
            container.removeEventListener("scroll", handleUserScroll);
        };
    }, []);

    // -------- When category clicked --------
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setShowDifficulty(true);
    };

    // -------- When difficulty selected --------
    const handleDifficultySelect = (level) => {
        navigate(`/quiz/${selectedCategory}/${level}`);
    };

    return (
        <div className="outerCardContainer bg-black">
            <h2>📈 Trending Quizzes - Start Now!</h2>

            <div className="cardContainer" ref={containerRef}>
                <Cards onStart={handleCategoryClick} />
            </div>

            {/* Difficulty Overlay */}
            {showDifficulty && (
                <div className="difficulty-overlay">
                    <div className="difficulty-box">
                        <h2>Select Difficulty</h2>

                        <button onClick={() => handleDifficultySelect("easy")}>
                            Easy
                        </button>

                        <button onClick={() => handleDifficultySelect("medium")}>
                            Medium
                        </button>

                        <button onClick={() => handleDifficultySelect("hard")}>
                            Hard
                        </button>

                        <button
                            className="cancel-btn"
                            onClick={() => setShowDifficulty(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Categories;
