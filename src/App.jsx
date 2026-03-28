import Navbar       from './components/Navbar/Navbar'
import Hero         from './components/Hero/Hero'
import Features     from './components/Features/Features'
import Languages    from './components/Languages/Languages'
import Pricing      from './components/Pricing/Pricing'
import Testimonials from './components/Testimonials/Testimonials'
import Footer       from './components/Footer/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Languages />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
