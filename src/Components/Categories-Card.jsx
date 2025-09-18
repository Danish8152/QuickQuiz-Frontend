import '../assets/Categories-Cards.css'
import catCaltural from "../assets/CatCaltural.jpeg"
import CatEnt from "../assets/CatEnt.jpeg"
import catScience from "../assets/CatScience.png"
import catTech from "../assets/CatTech.jpeg"
import catSport from "../assets/CatSport.jpeg"
import catLogic from "../assets/CatLogic.jpeg"
function Cards() {

    const cardCompo = [
        {
            CardID: 1,
            title: "Categoty : Catural",
            description: "Start your quiz journy and Challange your mind now..",
            Image: catCaltural
        },
        {
            CardID: 2,
            title: "Categoty : Tech & Inovation",
            description: "Start your quiz journy and Challange your mind now..",
            Image: catTech
        },
        {
            CardID: 3,
            title: "Categoty : Science & Space",
            description: "Start your quiz journy and Challange your mind now..",
            Image: catScience
        },
        {
            CardID: 4,
            title: "Categoty : Logical & Puzzal",
            description: "Start your quiz journy and Challange your mind now..",
            Image: catLogic
        },
        {
            CardID: 5,
            title: "Categoty : Ententenment & Pop",
            description: "Start your quiz journy and Challange your mind now..",
            Image: CatEnt
        },
        {
            CardID: 6,
            title: "Categoty : Sports & Fitness",
            description: "Start your quiz journy and Challange your mind now..",
            Image: catSport
        }
    ];

    return (
        <>
            {cardCompo.map((card, CardID) => (
                <div key={CardID} className="OuterCard" style={{ backgroundImage: `url(${card.Image})`}}>
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
                    <button className='start-quiz-btn'>Start Quiz Now</button>
                </div>
            ))}
        </>
    )
}

export default Cards