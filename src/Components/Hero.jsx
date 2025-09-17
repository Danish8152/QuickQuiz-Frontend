import heroImg from "../assets/hero.png";
import "../assets/hero.css"

function Hero() {
    return (
        <section className="bg-black flex items-center justify-between px-20 heroOuter">
            <div className="hero-info">
                <h1 className="">Challenge your mind, track your progress, and level up your knowledge.</h1>
                <div className="sub-hero"><h6 className="">Why Choose Us?</h6>
                    <p>Interactive Learning – Engaging quizzes designed to make learning fun and effective.</p>
                    <p>Track Your Progress – Smart analytics to monitor your growth and improve over time.</p>
                    <p>Learn Anytime, Anywhere – Access quizzes across multiple subjects from any device.</p>
                    <div className="hero-cta"><button className="hero-cta-btn">Start Quiz Now</button></div>
                </div>
            </div>
            <div className="hero-image">
                <img src={heroImg} alt="Hero Img" />
            </div>
        </section>
    );
}
export default Hero;
