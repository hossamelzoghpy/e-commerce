import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/db'
import categoriesRoute from './routes/categoriesRoute'
import subCategoriesRoute from './routes/subCategories'
const app: express.Application = express()
app.use(express.json())
dotenv.config()
dbConnection()
app.use('/api/v1/categories',categoriesRoute)
app.use('/api/v1/subcategories',subCategoriesRoute)
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})