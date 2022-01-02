const connecttoMongo = require('./db');
var cors = require('cors')
const express = require('express')
const app = express()

connecttoMongo();
app.use(cors())
app.use(express.json())



const port =  5000

// Avaliable Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNoebook Backend listening at http://localhost:${port}`)
})