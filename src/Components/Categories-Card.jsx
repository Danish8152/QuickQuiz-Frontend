import '../Style/Categories-Cards.css'
import catCaltural from "../assets/CatCaltural.jpeg"
import CatEnt from "../assets/CatEnt.jpeg"
import catScience from "../assets/CatScience.png"
import catTech from "../assets/CatTech.jpeg"
import catSport from "../assets/CatSport.jpeg"
import catLogic from "../assets/CatLogic.jpeg"
function Cards({ onStart }) {

    const cardCompo = [
        {
            CardID: 1,
            category: "Catural",
            slug: "cultural",
            description: "Start your quiz journy and Challange your mind now..",
            Image: catCaltural
        },
        {
            CardID: 2,
            category: "Tech & Inovation",
            slug: "tech",
            description: "Start your quiz journy and Challange your mind now..",
            Image: catTech
        },
        {
            CardID: 3,
            category: "Science & Space",
            slug: "science",
            description: "Start your quiz journy and Challange your mind now..",
            Image: catScience
        },
        {
            CardID: 4,
            category: "Logical & Puzzal",
            slug: "logic",
            description: "Start your quiz journy and Challange your mind now..",
            Image: catLogic
        },
        {
            CardID: 5,
            category: "Ententenment & Pop",
            slug: "entertainment",
            description: "Start your quiz journy and Challange your mind now..",
            Image: CatEnt
        },
        {
            CardID: 6,
            category: "Sports & Fitness",
            slug: "sports",
            description: "Start your quiz journy and Challange your mind now..",
            Image: catSport
        }
    ];

    return (
        <>
            {cardCompo.map((card) => (
                <div key={card.CardID} className="OuterCard" style={{ backgroundImage: `url(${card.Image})` }}>
                    <p>{card.description}</p>
                    <h2>{card.category}</h2>
                    <button
                        className='start-quiz-btn'
                        onClick={() => onStart(card.slug)}
                    >
                        Start Quiz Now
                    </button>
                </div>
            ))}
        </>
    )
}

export default Cards