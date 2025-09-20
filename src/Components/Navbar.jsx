import '../assets/Navbar.css';
import logo from "../assets/QuickQuiz-Logo.png";
function Nav({ onSignUpClick, onSignInClick, user, handleSignOut }) {
    return (

        <div className='Header bg-black'>
            <img src={logo} alt="QuickQuiq-logo" className='logo' />
            <ul className='nav-list flex'>
                <li><a href="#">Home</a></li>
                <li><a href="#">Categories</a></li>
                <li><a href="#">Challenge</a></li>
                <li><a href="#">About Us</a></li>
            </ul>
            <div className='sign-in-up'>
                {user ? (
                    <>
                        <div className="user-circle bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                            {user.email[0].toUpperCase()}
                        </div>
                        <button className='sign-out' onClick={handleSignOut}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <button className='sign-in' onClick={onSignInClick}>Sign In</button>
                        <button className='sign-up' onClick={onSignUpClick}>Sign Up</button>
                    </>
                )}
            </div>
        </div>

    )
}

export default Nav