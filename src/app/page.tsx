import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Activities from '@/components/Activities';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Activities />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
