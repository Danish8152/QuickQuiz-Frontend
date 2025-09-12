import '../assets/Navbar.css';
import logo from "../assets/QuickQuiz-Logo.png";
function Nav() {
    return (
        <>
            <div>
                <img src={logo} alt="QuickQuiq-logo" className='logo'/>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Categories</a></li>
                    <li><a href="#">Challenge</a></li>
                    <li><a href="#">About Us</a></li>
                </ul>
                <div className='Sign-in-up'>

                </div>
            </div>
        </>
    )
}

export default Nav