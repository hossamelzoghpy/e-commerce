import express from "express";
//const express = require('express')
const app: express.Application = express()
const port = 3000

app.get('/', (req:express.Request, res:express.Response) => {
  res.send('Hello Everybody!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})