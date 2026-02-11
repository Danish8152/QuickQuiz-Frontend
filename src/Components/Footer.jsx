import "../Style/Footer.css"
import logo from "../assets/QuickQuiz-Logo.png"
import facebook from "../assets/icons8-facebook-logo-48.png"
import insta from "../assets/icons8-instagram-logo-48.png"
import tweeter from "../assets/icons8-twitter-48.png"
import youtube from "../assets/icons8-youtube-logo-48.png"
function Footer() {
    return (
        <section className="footerSection pt-3">
            <div className="upperFooter text-center d-flex flex-row">
                <div className="footer-logo w-45"><img src={logo} alt="Web logo"/></div>
                <div className="footer-containt text-left ms-5 ps-5">
                    <h4>Quick Links</h4>
                    <a href="#" className="text-decoration-none">Challenge</a> | <a href="#">Contact Us</a> | <a href="#">FAQs</a> | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
                    <hr className="footer-line mt-4"/>
                    <div className="social-media">
                        <img src={facebook} alt="Fackebook Logo" />
                        <img src={insta} alt="Instagram Logo" />
                        <img src={tweeter} alt="Twiter Logo" style={{width: "25px" , height: "25px", marginTop: "13px"}}/>
                        <img src={youtube} alt="Youtube Logo" />
                    </div>
                </div>
            </div>
            <div className="lowerFooter pt-3 pb-3">
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