const mongoose = require('mongoose');

 

const express = require('express')

 

const router = express.Router()

 

//const awsQuestions = require('../models/aws')

 

 

 

const questionSchema1 = new mongoose.Schema({

 

  question: { type: String, required: true },

 

  questionType: { type: String, required: true },

 

  options: { type: Array, required: true },

  skills:{type:String,required:true}

 

});

 

 

 

const javaquestion = mongoose.model('javaquestion', questionSchema1);

 

 

 

module.exports = javaquestion