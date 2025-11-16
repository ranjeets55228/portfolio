require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const contactRouter = require('./routes/contact')

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
const allowed = process.env.FRONTEND_URL || 'http://localhost:5173'
app.use(cors({ origin: allowed }))
app.use(express.json())

// basic rate limit for the contact route
const limiter = rateLimit({ windowMs: 60 * 1000, max: 10, message: { message: 'Too many requests' } })
app.use('/api/contact', limiter)

app.use('/api/contact', contactRouter)

app.get('/', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
