import '../assets/Navbar.css';
import logo from "../assets/QuickQuiz-Logo.png";
function Nav() {
    return (
        <>
            <div className='Header flex'>
                <img src={logo} alt="QuickQuiq-logo" className='logo'/>
                <ul className='nav-list flex'>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Categories</a></li>
                    <li><a href="#">Challenge</a></li>
                    <li><a href="#">About Us</a></li>
                </ul>
                <div className='sign-in-up'>
                    <button className='sign-in'>Sign In</button>
                    <button className='sign-up'>Sign Up</button>
                </div>
            </div>
        </>
    )
}

export default Nav