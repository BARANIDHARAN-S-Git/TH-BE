const mongoose = require('mongoose')

const express = require('express')

const router = express.Router()

const modelmanagername = require('../models/managername')

 


    const hiringmanager = new mongoose.Schema({

        Managername: {
    
            type:String,
    
            required: true
    
        }
    
        })

 

module.exports=mongoose.model('managername',hiringmanager)