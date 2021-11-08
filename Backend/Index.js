const connectMongo=require('./Db')
const express = require('express')
var cors=require('cors')
connectMongo();

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())   //If we want to use req.body then we have to use this middleware

app.get('/', (req, res) => {
  res.send('Hello Panda!')
})
// Available Routes
app.use('/api/Auth', require('./Routes/Auth'))
app.use('/api/note', require('./Routes/Note'))

app.listen(port, () => {
  console.log(`NotePanda app listening at http://localhost:${port}`)
})