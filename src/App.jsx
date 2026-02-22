import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Categories from './Components/Categories'
import Challenge from './Components/Challenges'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import ProfileSidebar from './Components/ProfileSlider'
import Footer from './Components/Footer'
import QuizPage from './Components/QuizPage'
import ProtectedRoute from './Components/ProtectedRoute'

import { useState, useEffect } from 'react'

function App() {
  const [showSignUp, setShowSignUp] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [user, setUser] = useState(null)
  const [profileSlider, setProfileSlider] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <BrowserRouter>
      <div className='bg-black'>
        <Navbar
          onSignUpClick={() => setShowSignUp(true)}
          onSignInClick={() => setShowSignIn(true)}
          user={user}
          handleSignOut={handleSignOut}
          showProfileSilder={() => setProfileSlider(true)}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Categories />
                <Challenge />
              </>
            }
          />

          <Route
            path="/quiz/:category/:level"
            element={
              <ProtectedRoute openLogin={() => setShowSignIn(true)}>
                <QuizPage />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

        {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
        {showSignIn && <SignIn onClose={() => setShowSignIn(false)} />}
        {profileSlider && <ProfileSidebar user={user} onClose={() => setProfileSlider(false)} />}
      </div>
    </BrowserRouter>
  )
}

export default App
