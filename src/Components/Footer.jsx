
function Footer() {
    return (
        <section className="footerSection">
        <div className="upperFooter text-center">
            <h3>Join Our QuickQuiz Community</h3>
            <div className="upperftbtns flex justify-content-center gap-5">
                <button className="upperftsignupbtn">Sign Up Now</button>
                <button className="upperftleanmorebtn">Learn More</button>
            </div>
        </div>
        <div className="lowerFooter">
            <ul className="d-flex justify-content-around m-0 p-0">
                <li>Made With ❤️</li>
                <li>©️ All Rights Recived: QuickQuiz</li>
                <li>Contact Us</li>
            </ul>
        </div>
        </section>
    );
}
export default Footer;