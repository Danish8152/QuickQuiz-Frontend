import '../assets/Categories-Cards.css'
function Cards() {

    const cardCompo = [
        {
            CardID: 1,
            title: "hello",
            description: "hjdfhkdjfhksjd",
            Image: ""
        },
        {
            CardID: 2,
            title: "hell",
            description: "hjdfhkdjfhksjd",
            Image: ""
        },
        {
            CardID: 3,
            title: "hel",
            description: "hjdfhkdjfhksjd",
            Image: ""
        },
        {
            CardID: 4,
            title: "he",
            description: "hjdfhkdjfhksjd",
            Image: ""
        }
    ];

    return (
        <>
            {cardCompo.map((card, CardID) => (
                <div key={CardID} className="OuterCard">
                    
                </div>

            ))}
        </>
    )
}

export default Cards