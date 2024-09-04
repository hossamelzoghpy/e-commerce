
import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/db'
import mountRoutes from './routes'
import { Server } from 'http'
const app: express.Application = express()
app.use(express.json())
dotenv.config()
dbConnection()
mountRoutes(app)
let server:Server
server=app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})
process.on('unhandledRejection',(error:Error)=>{
  console.error(`unhandlesRejection Error: ${error.name} | ${error.message}`)
  server.close(()=>{
    console.error('Application is shutting down...')
    process.exit(1)
  })

})