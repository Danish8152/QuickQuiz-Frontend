import { useEffect, useRef } from "react";
import "../Style/Categories.css";
import Cards from "./Categories-Card";

function Categories() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let autoScroll;

        function startAutoScroll() {
            stopAutoScroll();
            autoScroll = setInterval(() => {
                container.scrollBy({ left: 0.5, behavior: "smooth" });
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

    return (
        <div className="outerCardContainer bg-black">
            <h2>📈 Trending Quizzes - Start Now!</h2>
            <div className="cardContainer" ref={containerRef}>
                <Cards />
            </div>
        </div>
    );
}

export default Categories;
