import React from 'react'

export default function About(){
  return (
    <div className="container about">
      <h2>About Me</h2>
      <p>
        I have 8 years of web development experience: <strong>Node.js (5+ years)</strong>, <strong>React (2+ years)</strong>, <strong>Laravel & Shopify (2 years)</strong>.
      </p>

      <div className="skills-grid">
        <div>
          <h4>Languages & Frameworks</h4>
          <p>JavaScript (ES6+), Node.js, React, Express, Laravel, PHP</p>
        </div>
        <div>
          <h4>Frontend</h4>
          <p>HTML5, CSS3, Responsive Design, Vite, React Hooks</p>
        </div>
        <div>
          <h4>Tools & DevOps</h4>
          <p>Git, Docker (basic), Vercel, Render, Postman</p>
        </div>
        <div>
          <h4>Databases</h4>
          <p>MySQL, PostgreSQL, MongoDB (basic)</p>
        </div>
      </div>
    </div>
  )
}
