import express = require('express')
const app = express()

app.get("/",(request,response) => {
    response.status(200).json({
        msg: "Response"
    })
})

app.listen(3001,() => {console.log(`server is listening to port 3001`)})