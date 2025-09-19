import './index.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Categories from './Components/Categories'
import Challenge from './Components/Challenges'

function App() {
  return (
    <div className='bg-black'>
      <Navbar/>
      <Hero/>
      <Categories/>
      <Challenge/>
    </div>
  )
}

export default App
