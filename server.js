require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./src/routes/index')
const middleware = require('./midleware')
const response = require('./src/lib/response')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.disable('etag')
app.use(bodyParser.json())
app.use(middleware)
app.use('/', routes)
app.use(response.success)




app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})