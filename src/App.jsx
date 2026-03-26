import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Demo from './sections/Demo'
import About from './sections/About'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white noise">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Demo />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
