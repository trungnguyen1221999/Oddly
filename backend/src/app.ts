import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL
}))
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

export default app