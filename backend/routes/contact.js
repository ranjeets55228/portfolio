const express = require('express')
const fs = require('fs')
const path = require('path')
const basicAuth = require('basic-auth')
const { sendMail } = require('../lib/mailer')

const router = express.Router()
const STORE = path.join(__dirname,'..','submissions.json')

function saveLocal(sub){
  let arr = []
  try { arr = JSON.parse(fs.readFileSync(STORE,'utf8')||'[]') } catch (e) { arr = [] }
  arr.unshift(sub)
  fs.writeFileSync(STORE, JSON.stringify(arr.slice(0,1000), null, 2))
}

router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {}
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'name, email and message are required' })
  }

  const submission = {
    id: Date.now(),
    name: String(name).slice(0,200),
    email: String(email).slice(0,200),
    message: String(message).slice(0,2000),
    createdAt: new Date().toISOString()
  }

  // Save locally (useful fallback)
  try { saveLocal(submission) } catch (e) { console.error('saveLocal error', e) }

  // try to send an email if configured
  try {
    const info = await sendMail(submission)
    return res.json({ message: 'ok', emailInfo: info || null })
  } catch (err) {
    console.error('mailer error', err)
    // still return success but inform user the message stored
    return res.status(200).json({ message: 'stored', note: 'Message stored locally. Configure SMTP or SendGrid to receive emails.' })
  }
})

// Admin endpoint to view submissions (protected by basic auth)
router.get('/submissions', (req, res) => {
  const user = basicAuth(req)
  if (!user || user.name !== process.env.ADMIN_USER || user.pass !== process.env.ADMIN_PASS) {
    res.set('WWW-Authenticate', 'Basic realm="admin"')
    return res.status(401).send('Authentication required.')
  }
  const STORE = path.join(__dirname,'..','submissions.json')
  try {
    const data = JSON.parse(fs.readFileSync(STORE,'utf8')||'[]')
    return res.json(data)
  } catch (e) {
    return res.json([])
  }
})

module.exports = router
