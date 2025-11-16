import React from 'react'

const projects = [
  {
    title: 'Project A',
    desc: 'Fullstack marketplace built with Node.js & React.',
    live: 'https://live-demo.example',
    repo: 'https://github.com/yourusername/project-a'
  },
  {
    title: 'Shopify App',
    desc: 'Custom Shopify app for store automation.',
    live: '',
    repo: 'https://github.com/yourusername/shopify-app'
  },
  // add your projects here
]

export default function Projects(){
  return (
    <div className="container projects">
      <h2>Projects</h2>
      <div className="project-list">
        {projects.map((p, i) => (
          <article key={i} className="project-card">
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <p className="project-links">
              {p.live ? <a href={p.live} target="_blank" rel="noreferrer">Live</a> : <span className="muted">No live demo</span>}
              <a href={p.repo} target="_blank" rel="noreferrer">GitHub</a>
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
