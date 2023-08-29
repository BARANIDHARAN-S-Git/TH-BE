const express= require("express");

const app=express();

const mongoose= require("mongoose");

const {Schema}= mongoose;

const cors = require('cors');

 

app.use(express.json());

app.use(cors());

app.options('*', cors());

 

mongoose.connect("mongodb://0.0.0.0:27017/TH" , {

 

useNewUrlParser:true,

useUnifiedTopology:true

})

 

const con=mongoose.connection

con.on('open',function(){

console.log('connected to database....')

})

 

 

 

 

const alienRouter = require('./routers/crud')

app.use('/skill', alienRouter)

app.listen(9000, () => {

    console.log('Server Started')

} )

 