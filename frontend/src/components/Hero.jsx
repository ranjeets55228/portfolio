import React from 'react'

export default function Hero(){
  return (
    <div className="container hero">
      <div>
        <h1>Ranjeet Singh</h1>
        <p className="tagline">Fullstack Web Developer — React · Node.js · Laravel · Shopify</p>
        <p>8 years building web apps, marketplaces, and Shopify apps. Available for freelance projects.</p>
        <a className="cta" href="#contact">Work with me</a>
      </div>
      <div className="hero-image" aria-hidden>
        {/* optional profile svg or image */}
      </div>
    </div>
  )
}
