import '../Style/Navbar.css';
import logo from "../assets/QuickQuiz-Logo.png";
function Nav({ onSignUpClick, onSignInClick, user, handleSignOut, showProfileSilder }) {
    return (

        <div className='Header bg-black'>
            <img src={logo} alt="QuickQuiq-logo" className='logo' />
            <ul className='nav-list'>
                <li><a href="#hero">Home</a></li>
                <li><a href="#">Categories</a></li>
                <li><a href="#">Challenge</a></li>
                <li><a href="#">About Us</a></li>
            </ul>
            <div className='sign-in-up'>
                {user ? (
                    <div className='d-flex items-center justify-content-center gap-2 profile'>
                        <div className="user-circle bg-blue-800 text-white w-9 h-9 rounded-full flex items-center justify-center" onClick={showProfileSilder}>
                            {user.email[0].toUpperCase()}
                        </div>
                        <button className='sign-out sign-up' onClick={handleSignOut}>Sign Out</button>
                    </div>
                ) : (
                    <>
                        <button className='sign-in' onClick={onSignInClick}>Login</button>
                        <button className='sign-up' onClick={onSignUpClick}>Sign Up</button>
                    </>
                )}
            </div>
        </div>

    )
}

export default Nav