import './index.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Categories from './Components/Categories'
import Challenge from './Components/Challenges'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import { useState } from 'react'
import { useEffect } from 'react'
import ProfileSidebar from './Components/ProfileSlider'

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
    <div className='bg-black'>
      <Navbar onSignUpClick={()=>setShowSignUp(true)} onSignInClick={()=>setShowSignIn(true)} user={user} handleSignOut={handleSignOut} showProfileSilder={()=> setProfileSlider(true)}/>
      <Hero/>
      <Categories/>
      <Challenge/>
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
      {showSignIn && <SignIn onClose={()=> setShowSignIn(false)}/>}
      {profileSlider && <ProfileSidebar user={user} onClose={()=> setProfileSlider(false)}/>}
      
    </div>
  )
}

export default App
