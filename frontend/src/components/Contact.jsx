import React, { useState } from 'react'
import { CONTACT_API } from '../api'

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [status, setStatus] = useState(null)

  function update(e){
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function submit(e){
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setForm({ name:'', email:'', message:'' })
      } else {
        setStatus(data?.message || 'error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="container contact">
      <h2>Contact</h2>
      <p>Want to work together? Send a message and I'll reply within 1-2 business days.</p>

      <form onSubmit={submit} className="contact-form" aria-label="Contact form">
        <label>
          Name
          <input name="name" value={form.name} onChange={update} required />
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={update} required />
        </label>

        <label>
          Message
          <textarea name="message" value={form.message} onChange={update} required rows="6"></textarea>
        </label>

        <button type="submit" disabled={status==='sending'}>{status==='sending' ? 'Sending...' : 'Send Message'}</button>

        {status === 'success' && <p className="success">Message sent — thank you!</p>}
        {status && status !== 'sending' && status !== 'success' && status !== null && <p className="error">Error: {String(status)}</p>}
      </form>
    </div>
  )
}
