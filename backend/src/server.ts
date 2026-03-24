import 'dotenv/config'
import { validateEnv } from './config/env'
import app from './app'
import { env } from './config/env'

validateEnv() //check valid before start

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`)
})