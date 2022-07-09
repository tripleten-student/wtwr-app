const express = require('express')
require('dotenv').config()

const PORT = process.env.PORT || 5500

const app = express()

app.listen(PORT, ()=>{
  console.log(`Server is running on ${PORT}`)
})