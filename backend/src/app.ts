import express from 'express'
import cors from 'cors'
import { supabase } from './config/supabase'

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL
}))
app.use(express.json())

// connect check
app.get('/connect', async (req, res) => {
  const { error } = await supabase.from('users').select('id').limit(1)
  res.json({ status: error ? 'db error' : 'db connected' })
})

export default app