import '../Style/Navbar.css';
import logo from "../assets/QuickQuiz-Logo.png";
import { useState } from 'react';

function Nav({ onSignUpClick, onSignInClick, user, handleSignOut, showProfileSilder }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className='Header bg-black'>
            <img src={logo} alt="QuickQuiq-logo" className='logo' />

            {/* Hamburger */}
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            <ul className={`nav-list ${menuOpen ? "active" : ""}`}>
                <li><a href="#hero">Home</a></li>
                <li><a href="#categories">Categories</a></li>
                <li><a href="#challenge">Challenge</a></li>
                <li><a href="#about">About Us</a></li>
            </ul>

            <div className={`sign-in-up ${menuOpen ? "active" : ""}`}>
                {user ? (
                    <div className='profile'>
                        <div
                            className="user-circle"
                            onClick={showProfileSilder}
                        >
                            {user.email[0].toUpperCase()}
                        </div>
                        <button className='sign-out sign-up' onClick={handleSignOut}>
                            Sign Out
                        </button>
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