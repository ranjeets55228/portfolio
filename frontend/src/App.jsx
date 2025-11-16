import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default function App(){
  return (
    <>
      <header className="site-header">
        <nav className="nav">
          <a href="#hero" className="logo">Ranjeet Singh</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main>
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>
      <footer className="site-footer">
        © {new Date().getFullYear()} Ranjeet Singh — Available for freelance work
      </footer>
    </>
  )
}
