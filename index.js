require('dotenv').config()
const express = require('express') 
const seq = require('./db.js')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const path = require('path')


const PORT = 5000;

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


const start = async () => {
    try{
        await seq.authenticate()
        await seq.sync();
        app.listen(PORT, () => console.log("Server was started"));
    }
    catch(e)
    {
        console.log(e)
    }
}


start()
