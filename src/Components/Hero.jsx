import heroImg from "../assets/hero.png";
import "../Style/hero.css"
import yellowTick from "../assets/icons8-tick-48-yellow.png"
import RedTick from "../assets/icons8-tick-48-redTick.png"
import greenTick from "../assets/icons8-tick-48-greenTick.png"

function Hero() {
    return (
        <section className="bg-black flex items-center justify-between px-20 heroOuter" id="hero">
            <div className="hero-info">
                <h1 className="">Test your knowledge with smart quizzes across multiple subjects.</h1>
                <div className="sub-hero">
                    <h6 className=""> QuickQuiz help student and learners practice and track knowledge with interactive, timed in detailed performance insights.</h6>
                    <li className="hero-li"><img src={greenTick} alt="Green Tick" className="tick" />Interactive Quizzes </li>
                    <li className="hero-li"><img src={yellowTick} alt="Yellow Tick" className="tick" /> Smart Analytics </li>
                    <li className="hero-li"><img src={RedTick} alt="Red Tick" className="tick" /> Learn Anywhere </li>
                    <div className="hero-cta">
                        <button className="hero-cta-btn">Start Quiz Now</button>
                        <button className="cta-btn">Browse Categories</button>
                    </div>
                </div>
                <ul className="flex gap-3 pt-3">
                    <li>🌟 10,000+ Quizzes played </li>
                    <li>🎓 Used by students & learner</li>
                    <li>📊 Intractive learner</li>
                </ul>
            </div>
            <div className="hero-image">
                <img src={heroImg} alt="Hero Img" style={{width: "900px", height: "700px"}}/>
            </div>
        </section>
    );
}
export default Hero;
